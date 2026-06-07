import { hp } from "@/src/core/utils";
import MessageInputText from "@/src/features/(m.i.a)/components/MessageInputText";
import MessageUserBox from "@/src/features/(m.i.a)/components/MessageUserBox";
import {
  addFood,
  generateMealPlan,
  searchFood,
} from "@/src/services/feeding/feeding.service";
import {
  GenerateMealPlanRequest,
  GenerateMealPlanResponse,
  MealPlanDayMenu,
  MealType,
} from "@/src/services/feeding/feeding.dtos";
import {
  MiaAction,
  MiaAddFoodPayload,
  MiaChatMessage,
  MiaCreateRoutinePayload,
  MiaGenerateMealPlanPayload,
} from "@/src/services/mia/mia.dtos";
import {
  getMiaResponseActions,
  getMiaResponseMetadata,
  getMiaResponseText,
  sendPromptToMia,
} from "@/src/services/mia/mia.service";
import {
  getStoredMiaMessages,
  saveMiaMessages,
} from "@/src/services/mia/mia.chat.storage";
import {
  saveMiaGeneratedMealPlan,
  saveMiaGeneratedRoutineOptions,
} from "@/src/services/mia/mia.generated.storage";
import { generateRoutineOptions } from "@/src/services/routines";
import {
  GenerateRoutineRequest,
  GenerateRoutineResponse,
  RoutineEquipment,
} from "@/src/services/routines/routine.dtos";
import { getAccessToken } from "@/src/services/session/token.storage";
import { COLOR } from "@/src/theme";
import React from "react";
import { Alert, FlatList, View } from "react-native";
import MessageResponseBox from "../../components/MessageResponseBox";

const createMessageId = () => `${Date.now()}-${Math.random()}`;
const loadingMessage: MiaChatMessage = {
  id: "mia-loading",
  type: "bot",
  text: "M.I.A. esta escribiendo...",
};
const MIA_CHAT_DEBUG = true;
const VALID_MEAL_TYPES: MealType[] = ["DESAYUNO", "ALMUERZO", "CENA", "SNACK"];
const VALID_ROUTINE_EQUIPMENT: RoutineEquipment[] = [
  "BARRA",
  "MANCUERNAS",
  "MAQUINA",
  "POLEA",
  "PESO_CORPORAL",
  "BANDA_ELASTICA",
  "KETTLEBELL",
];
const MEAL_PLAN_DAYS: Array<keyof GenerateMealPlanResponse["menu"]> = [
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
  "domingo",
];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const addBotMessage = (
  setMessages: React.Dispatch<React.SetStateAction<MiaChatMessage[]>>,
  text: string,
  actions?: MiaAction[],
) => {
  setMessages((currentMessages) => [
    {
      actions,
      id: createMessageId(),
      type: "bot",
      text,
    },
    ...currentMessages,
  ]);
};

const getMealType = (value: unknown): MealType | undefined => {
  if (typeof value !== "string") {
    return undefined;
  }

  const normalizedValue = value.toUpperCase() as MealType;

  return VALID_MEAL_TYPES.includes(normalizedValue)
    ? normalizedValue
    : undefined;
};

const getMealPlanGoal = (
  value: unknown,
): GenerateMealPlanRequest["goal"] => {
  if (typeof value !== "string") {
    return "Mantener peso";
  }

  const normalizedValue = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (
    normalizedValue.includes("ganar") ||
    normalizedValue.includes("musculo") ||
    normalizedValue.includes("subir")
  ) {
    return "Ganar musculo";
  }

  if (
    normalizedValue.includes("bajar") ||
    normalizedValue.includes("perder")
  ) {
    return "Bajar de peso";
  }

  return "Mantener peso";
};

const getStringList = (value: unknown) =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];

const normalizeRoutineEquipment = (equipment: string): RoutineEquipment | null => {
  const normalizedEquipment = equipment
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/\s+/g, "_");

  const aliases: Record<string, RoutineEquipment> = {
    BANDA: "BANDA_ELASTICA",
    BANDAS: "BANDA_ELASTICA",
    BANDA_ELASTICA: "BANDA_ELASTICA",
    CINTA: "PESO_CORPORAL",
    CUERDA: "PESO_CORPORAL",
    KETTLEBELL: "KETTLEBELL",
    MAQUINA: "MAQUINA",
    MAQUINAS: "MAQUINA",
    NINGUNO: "PESO_CORPORAL",
    PESO_CORPORAL: "PESO_CORPORAL",
    POLEA: "POLEA",
  };

  const aliasedEquipment = aliases[normalizedEquipment];

  if (aliasedEquipment) {
    return aliasedEquipment;
  }

  return VALID_ROUTINE_EQUIPMENT.includes(
    normalizedEquipment as RoutineEquipment,
  )
    ? (normalizedEquipment as RoutineEquipment)
    : null;
};

const getRoutineEquipmentList = (value: unknown): RoutineEquipment[] => {
  const equipmentList = getStringList(value)
    .map(normalizeRoutineEquipment)
    .filter((equipment): equipment is RoutineEquipment => Boolean(equipment));

  return equipmentList.length ? [...new Set(equipmentList)] : ["PESO_CORPORAL"];
};

const isMealPlanResponse = (
  value: unknown,
): value is GenerateMealPlanResponse => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.objetivo === "string" &&
    typeof value.recomendaciones_nutricionales === "string" &&
    isRecord(value.menu)
  );
};

const isRoutineResponse = (
  value: unknown,
): value is GenerateRoutineResponse => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.sessionId === "string" &&
    Array.isArray(value.routines)
  );
};

const formatDayMenu = (day: keyof GenerateMealPlanResponse["menu"], menu: MealPlanDayMenu) => {
  const dayLabel = day.charAt(0).toUpperCase() + day.slice(1);
  const snacks = menu.snacks?.length ? menu.snacks.join(", ") : "Sin snacks";

  return `${dayLabel}\nDesayuno: ${menu.desayuno}\nAlmuerzo: ${menu.almuerzo}\nCena: ${menu.cena}\nSnacks: ${snacks}`;
};

const formatMealPlanForChat = (mealPlan: GenerateMealPlanResponse) => {
  const weekPreview = MEAL_PLAN_DAYS.map((day) =>
    formatDayMenu(day, mealPlan.menu[day]),
  ).join("\n\n");

  return `Plan de comidas generado: ${mealPlan.objetivo}\n\n${weekPreview}\n\n${mealPlan.recomendaciones_nutricionales}`;
};

const formatRoutineOptionsForChat = (response: GenerateRoutineResponse) => {
  const routineNames = response.routines
    .slice(0, 3)
    .map((routine, index) => `${index + 1}. ${routine.name}`)
    .join("\n");

  return `${response.message || "Rutinas generadas."}\n\n${routineNames}`;
};

const confirmAction = (title: string, message: string) =>
  new Promise<boolean>((resolve) => {
    Alert.alert(title, message, [
      {
        onPress: () => resolve(false),
        style: "cancel",
        text: "Cancelar",
      },
      {
        onPress: () => resolve(true),
        text: "Confirmar",
      },
    ]);
  });

export default function MiaChatScreen() {
  const hasLoadedStoredMessages = React.useRef(false);
  const [messages, setMessages] = React.useState<MiaChatMessage[]>([]);
  const [isActionRunning, setIsActionRunning] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  const visibleMessages = React.useMemo(
    () => (isSending ? [loadingMessage, ...messages] : messages),
    [isSending, messages],
  );

  React.useEffect(() => {
    let isMounted = true;

    const loadStoredMessages = async () => {
      const storedMessages = await getStoredMiaMessages();

      if (!isMounted) {
        return;
      }

      setMessages(storedMessages);
      hasLoadedStoredMessages.current = true;

      if (MIA_CHAT_DEBUG) {
        console.log("[MIA screen] restored messages:", storedMessages);
      }
    };

    void loadStoredMessages();

    return () => {
      isMounted = false;
    };
  }, []);

  React.useEffect(() => {
    if (!hasLoadedStoredMessages.current) {
      return;
    }

    void saveMiaMessages(messages);
  }, [messages]);

  React.useEffect(() => {
    if (!MIA_CHAT_DEBUG) return;

    console.log("[MIA screen] messages count:", messages.length);
    console.log("[MIA screen] is sending:", isSending);
    console.log("[MIA screen] visible messages:", visibleMessages);
  }, [isSending, messages, visibleMessages]);

  const handleAddFoodAction = async (payload: unknown) => {
    if (!isRecord(payload)) {
      throw new Error("M.I.A. no envio los datos del alimento.");
    }

    const { mealType, query, quantity } = payload as MiaAddFoodPayload;
    const parsedMealType = getMealType(mealType);

    if (!query || !quantity || !parsedMealType) {
      throw new Error("La accion de alimento viene incompleta.");
    }

    const token = await getAccessToken();
    const foods = await searchFood(query, token);
    const selectedFood = foods.find((food) => food.id);

    if (!selectedFood?.id) {
      throw new Error("No encontre un alimento registrable en el catalogo.");
    }

    const shouldRegister = await confirmAction(
      "Registrar alimento",
      `Agregar ${quantity}g de ${selectedFood.name || query} en ${parsedMealType.toLowerCase()}?`,
    );

    if (!shouldRegister) {
      addBotMessage(setMessages, "Registro cancelado.");
      return;
    }

    await addFood(
      {
        foodItemId: selectedFood.id,
        mealType: parsedMealType,
        quantity,
      },
      token,
    );

    addBotMessage(
      setMessages,
      `Listo, registre ${quantity}g de ${selectedFood.name || query} en ${parsedMealType.toLowerCase()}.`,
    );
  };

  const handleCreateRoutineAction = async (payload: unknown) => {
    if (!isRecord(payload)) {
      throw new Error("M.I.A. no envio los datos de la rutina.");
    }

    const routinePayload = payload as MiaCreateRoutinePayload;

    if (
      !routinePayload.difficulty ||
      !routinePayload.durationMinutes ||
      !routinePayload.muscleGroups?.length
    ) {
      throw new Error("La accion de rutina viene incompleta.");
    }

    const token = await getAccessToken();
    const request: GenerateRoutineRequest = {
      availableEquipment: getRoutineEquipmentList(
        routinePayload.availableEquipment,
      ),
      difficulty: routinePayload.difficulty as GenerateRoutineRequest["difficulty"],
      durationMinutes: routinePayload.durationMinutes,
      limitations: routinePayload.limitations || "ninguna",
      muscleGroups: routinePayload.muscleGroups as GenerateRoutineRequest["muscleGroups"],
    };
    const response = await generateRoutineOptions(request, token);

    addBotMessage(
      setMessages,
      formatRoutineOptionsForChat(response),
      [
        {
          label: "Ver opciones en Rutinas",
          payload: response,
          type: "SHOW_ROUTINE_OPTIONS",
        },
      ],
    );
  };

  const handleGenerateMealPlanAction = async (payload: unknown) => {
    if (!isRecord(payload)) {
      throw new Error("M.I.A. no envio los datos del plan de comidas.");
    }

    const mealPlanPayload = payload as MiaGenerateMealPlanPayload;
    const request: GenerateMealPlanRequest = {
      allergies: getStringList(mealPlanPayload.allergies),
      dislikes: getStringList(mealPlanPayload.dislikes),
      goal: getMealPlanGoal(mealPlanPayload.goal),
      likes: getStringList(mealPlanPayload.likes),
      preferences: getStringList(mealPlanPayload.preferences),
    };

    const shouldGenerate = await confirmAction(
      "Generar plan de comidas",
      `Objetivo: ${request.goal}\nPreferencias: ${
        request.preferences?.join(", ") || "Sin preferencias"
      }\nAlergias: ${request.allergies?.join(", ") || "Sin alergias"}`,
    );

    if (!shouldGenerate) {
      addBotMessage(setMessages, "Generacion de plan cancelada.");
      return;
    }

    const token = await getAccessToken();
    const mealPlan = await generateMealPlan(request, token);

    addBotMessage(setMessages, formatMealPlanForChat(mealPlan), [
      {
        label: "Usar este plan",
        payload: mealPlan,
        type: "USE_MEAL_PLAN",
      },
    ]);
  };

  const handleUseMealPlanAction = async (payload: unknown) => {
    if (!isMealPlanResponse(payload)) {
      throw new Error("No se encontro el plan generado.");
    }

    await saveMiaGeneratedMealPlan(payload);
    addBotMessage(
      setMessages,
      "Listo. Este plan quedo aplicado para las tarjetas de Alimentacion.",
    );
  };

  const handleShowRoutineOptionsAction = async (payload: unknown) => {
    if (!isRoutineResponse(payload)) {
      throw new Error("No se encontraron las rutinas generadas.");
    }

    await saveMiaGeneratedRoutineOptions(payload);
    addBotMessage(
      setMessages,
      "Listo. Las opciones quedaron disponibles en la pantalla de Rutinas para elegir una.",
    );
  };

  const handleMiaAction = async (action: MiaAction) => {
    if (isActionRunning) {
      return;
    }

    setIsActionRunning(true);

    try {
      if (action.type === "ADD_FOOD") {
        await handleAddFoodAction(action.payload);
        return;
      }

      if (action.type === "CREATE_ROUTINE") {
        await handleCreateRoutineAction(action.payload);
        return;
      }

      if (action.type === "GENERATE_MEAL_PLAN") {
        await handleGenerateMealPlanAction(action.payload);
        return;
      }

      if (action.type === "USE_MEAL_PLAN") {
        await handleUseMealPlanAction(action.payload);
        return;
      }

      if (action.type === "SHOW_ROUTINE_OPTIONS") {
        await handleShowRoutineOptionsAction(action.payload);
        return;
      }

      addBotMessage(
        setMessages,
        `La accion ${action.type} ya se muestra, pero todavia falta conectar su ejecucion.`,
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "No se pudo ejecutar la accion de M.I.A.";

      if (MIA_CHAT_DEBUG) {
        console.log("[MIA screen] action error:", error);
      }

      addBotMessage(setMessages, errorMessage);
    } finally {
      setIsActionRunning(false);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (MIA_CHAT_DEBUG) {
      console.log("[MIA screen] send pressed:", message);
    }

    const userMessage: MiaChatMessage = {
      id: createMessageId(),
      type: "user",
      text: message,
    };

    setMessages((currentMessages) => [userMessage, ...currentMessages]);
    setIsSending(true);

    try {
      const response = await sendPromptToMia(message);
      const responseText = getMiaResponseText(response);
      const responseActions = getMiaResponseActions(response);
      const responseMetadata = getMiaResponseMetadata(response);

      if (MIA_CHAT_DEBUG) {
        console.log("[MIA screen] service response:", response);
        console.log("[MIA screen] extracted response text:", responseText);
        console.log("[MIA screen] extracted actions:", responseActions);
      }

      const botMessage: MiaChatMessage = {
        actions: responseActions,
        disclaimer: responseMetadata.disclaimer,
        id: createMessageId(),
        model: responseMetadata.model,
        status: responseMetadata.status,
        type: "bot",
        text: responseText,
      };

      setMessages((currentMessages) => [botMessage, ...currentMessages]);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "No se pudo obtener respuesta de M.I.A.";

      if (MIA_CHAT_DEBUG) {
        console.log("[MIA screen] error:", error);
        console.log("[MIA screen] error message:", errorMessage);
      }

      setMessages((currentMessages) => [
        {
          id: createMessageId(),
          type: "bot",
          text: errorMessage,
        },
        ...currentMessages,
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLOR.SIN_COLOR,
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        data={visibleMessages}
        style={{ flex: 1 }}
        inverted={true}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: hp(20),
          paddingTop: hp(12),
        }}
        renderItem={({ item }) => {
          if (MIA_CHAT_DEBUG) {
            console.log("[MIA screen] render message:", item);
          }

          return item.type === "user" ? (
            <MessageUserBox message={item.text} />
          ) : (
            <MessageResponseBox
              actions={item.actions}
              disabledActions={isActionRunning}
              onActionPress={handleMiaAction}
              response={item.text}
            />
          );
        }}
      />
      <View
        style={{
          paddingBottom: hp(12),
          paddingHorizontal: hp(0),
        }}
      >
        <MessageInputText disabled={isSending} onSend={handleSendMessage} />
      </View>
    </View>
  );
}
