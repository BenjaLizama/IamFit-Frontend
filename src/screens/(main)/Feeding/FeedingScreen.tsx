import CustomButton from "@/src/core/components/CustomButton";
import CustomText from "@/src/core/components/CustomText";
import FilterSelector from "@/src/core/components/FilterSelector";
import { useActiveFilter } from "@/src/core/hooks/useActiveFilter";
import { hp, wp } from "@/src/core/utils";
import FoodSummaryCard from "@/src/features/Feeding/components/FoodSummaryCard";
import {
  FoodLimitsResponse,
  FoodInfo,
  FoodLogCaloriesResponse,
  GenerateMealPlanResponse,
  MealPlanLimitsResponse,
  MealPlanDayMenu,
  MealType,
  SavedMealPlan,
} from "@/src/services/feeding/feeding.dtos";
import {
  activateMealPlan,
  deactivateMealPlan,
  deleteFoodEntry,
  deleteMealPlan,
  editFoodEntry,
  generateMealPlan,
  getActiveMealPlan,
  getDailyFoodLogSummary,
  getFoodLimits,
  getMealPlans,
  getMealPlanLimits,
  getMealPlanText,
  saveMealPlan,
} from "@/src/services/feeding/feeding.service";
import {
  getMiaGeneratedMealPlan,
  MIA_GENERATED_MEAL_PLAN_EVENT,
} from "@/src/services/mia/mia.generated.storage";
import { getAccessToken } from "@/src/services/session/token.storage";
import { COLOR } from "@/src/theme";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  DeviceEventEmitter,
  Modal,
  Pressable,
  TextInput,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { FeedingScreenStyles as styles } from "./FeedingScreen.styles";

const MEALS: Array<{
  key: MealType;
  label: "Desayuno" | "Almuerzo" | "Cena" | "Snack";
}> = [
  { key: "DESAYUNO", label: "Desayuno" },
  { key: "ALMUERZO", label: "Almuerzo" },
  { key: "CENA", label: "Cena" },
  { key: "SNACK", label: "Snack" },
];

const GOALS = ["Ganar musculo", "Bajar de peso", "Mantener peso"] as const;
const PREFERENCES = [
  "Alta proteina",
  "Vegano",
  "Keto",
  "Bajo en carbohidratos",
] as const;

const DAY_TO_MENU_KEY = {
  Domingo: "domingo",
  Jueves: "jueves",
  Lunes: "lunes",
  Martes: "martes",
  Miercoles: "miercoles",
  Sabado: "sabado",
  Viernes: "viernes",
} as const;

const MIA_ACTIVE_MEAL_PLAN_ID = "mia-active-meal-plan";

type DayLabel = keyof typeof DAY_TO_MENU_KEY;

type LocalSavedMealPlan = {
  day: string;
  id: string;
  response: GenerateMealPlanResponse;
};

const buildMealDescription = (
  summary: FoodLogCaloriesResponse | null,
  mealType: MealType,
) => {
  const foods = summary?.entriesByMeal?.[mealType] || [];

  if (!foods.length) {
    return "Sin alimentos registrados.";
  }

  return foods.map((food) => food.foodName).join(", ");
};

const getGeneratedMealDescription = (
  menu: MealPlanDayMenu | null,
  mealType: MealType,
) => {
  if (!menu) {
    return "";
  }

  if (mealType === "DESAYUNO") return menu.desayuno;
  if (mealType === "ALMUERZO") return menu.almuerzo;
  if (mealType === "CENA") return menu.cena;
  return menu.snacks?.length ? menu.snacks.join(", ") : "";
};

const parseListInput = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const normalizeText = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const getListIntersections = (baseList: string[], checkList: string[]) => {
  const normalizedCheckList = new Set(checkList.map(normalizeText));

  return baseList.filter((item) => normalizedCheckList.has(normalizeText(item)));
};

export default function FeedingScreen() {
  const router = useRouter();
  const [summary, setSummary] = useState<FoodLogCaloriesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isGeneratingMealPlan, setIsGeneratingMealPlan] = useState(false);
  const [isSavingMealPlan, setIsSavingMealPlan] = useState(false);
  const [isManagingMealPlan, setIsManagingMealPlan] = useState(false);
  const [isDeletingFoodEntry, setIsDeletingFoodEntry] = useState(false);
  const [isEditingFoodEntry, setIsEditingFoodEntry] = useState(false);
  const [editingFoodEntry, setEditingFoodEntry] = useState<FoodInfo | null>(
    null,
  );
  const [editFoodQuantity, setEditFoodQuantity] = useState("");
  const [editFoodMealType, setEditFoodMealType] =
    useState<MealType>("DESAYUNO");
  const [foodLimits, setFoodLimits] = useState<FoodLimitsResponse | null>(null);
  const [mealPlanLimits, setMealPlanLimits] =
    useState<MealPlanLimitsResponse | null>(null);
  const [generatedMealPlan, setGeneratedMealPlan] =
    useState<GenerateMealPlanResponse | null>(null);
  const [activeMealPlan, setActiveMealPlan] = useState<SavedMealPlan | null>(
    null,
  );
  const [backendMealPlans, setBackendMealPlans] = useState<SavedMealPlan[]>([]);
  const [savedMealPlans, setSavedMealPlans] = useState<LocalSavedMealPlan[]>(
    [],
  );
  const [mealPlanError, setMealPlanError] = useState("");
  const [isMealPlanModalVisible, setIsMealPlanModalVisible] = useState(false);
  const [selectedGoal, setSelectedGoal] =
    useState<(typeof GOALS)[number]>("Mantener peso");
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([
    "Alta proteina",
  ]);
  const [allergiesInput, setAllergiesInput] = useState("");
  const [likesInput, setLikesInput] = useState("");
  const [dislikesInput, setDislikesInput] = useState("");
  const [requiresSafetyConfirmation, setRequiresSafetyConfirmation] =
    useState(false);
  const filterList: DayLabel[] = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
  ];
  const { activeFilter, handleFilterChange } = useActiveFilter("Lunes");
  const selectedDay = (activeFilter || "Lunes") as DayLabel;
  const selectedDayMealPlans = useMemo(
    () => savedMealPlans.filter((plan) => plan.day === selectedDay),
    [savedMealPlans, selectedDay],
  );
  const latestSelectedDayMealPlan = selectedDayMealPlans[0]?.response || null;
  const visibleMealPlan = latestSelectedDayMealPlan || activeMealPlan?.menu;
  const generatedDayMenu = visibleMealPlan
    ? visibleMealPlan.menu[DAY_TO_MENU_KEY[selectedDay]]
    : null;
  const mealCards = useMemo(
    () =>
      MEALS.map((meal) => {
        const totals = summary?.mealTotals?.[meal.key];
        const generatedDescription = getGeneratedMealDescription(
          generatedDayMenu,
          meal.key,
        );

        return {
          ...meal,
          calories: Math.round(totals?.calories || 0),
          carbohydrates: Math.round(totals?.carbohydrates || 0),
          fat: Math.round(totals?.fat || 0),
          protein: Math.round(totals?.protein || 0),
          description:
            generatedDescription || buildMealDescription(summary, meal.key),
        };
      }),
    [generatedDayMenu, summary],
  );
  const registeredFoodEntries = useMemo(
    () => Object.values(summary?.entriesByMeal || {}).flat(),
    [summary],
  );
  const allergies = useMemo(
    () => parseListInput(allergiesInput),
    [allergiesInput],
  );
  const likes = useMemo(() => parseListInput(likesInput), [likesInput]);
  const dislikes = useMemo(
    () => parseListInput(dislikesInput),
    [dislikesInput],
  );
  const unsafeLikes = useMemo(
    () => [
      ...getListIntersections(likes, allergies),
      ...getListIntersections(likes, dislikes),
    ],
    [allergies, dislikes, likes],
  );
  const unsafePreferences = useMemo(
    () => getListIntersections(selectedPreferences, dislikes),
    [dislikes, selectedPreferences],
  );
  const safetyWarnings = useMemo(() => {
    const warnings: string[] = [];

    if (allergies.length) {
      warnings.push(`Alergias a excluir: ${allergies.join(", ")}`);
    }

    if (dislikes.length) {
      warnings.push(`No incluir: ${dislikes.join(", ")}`);
    }

    if (unsafeLikes.length) {
      warnings.push(
        `Revisa tus favoritos: ${unsafeLikes.join(", ")} tambien aparece en alergias o no deseados.`,
      );
    }

    if (unsafePreferences.length) {
      warnings.push(
        `Revisa preferencias: ${unsafePreferences.join(", ")} tambien aparece en no deseados.`,
      );
    }

    return warnings;
  }, [allergies, dislikes, unsafeLikes, unsafePreferences]);
  const mustDoubleCheckSafety =
    allergies.length > 0 ||
    dislikes.length > 0 ||
    unsafeLikes.length > 0 ||
    unsafePreferences.length > 0;

  const applyMiaMealPlan = React.useCallback(
    (miaMealPlan: GenerateMealPlanResponse) => {
      setGeneratedMealPlan(miaMealPlan);
      setSavedMealPlans((currentPlans) => [
        {
          day: selectedDay,
          id: MIA_ACTIVE_MEAL_PLAN_ID,
          response: miaMealPlan,
        },
        ...currentPlans.filter(
          (plan) => plan.id !== MIA_ACTIVE_MEAL_PLAN_ID,
        ),
      ]);
    },
    [selectedDay],
  );

  const loadDailyFoodLog = React.useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const token = await getAccessToken();
      const dailySummary = await getDailyFoodLogSummary(token);

      setSummary(dailySummary);
    } catch (error) {
      console.error("Error cargando alimentacion de la API:", error);
      setErrorMessage("No se pudo cargar tu alimentacion del dia.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDailyFoodLog();
  }, [loadDailyFoodLog]);

  const loadFeedingManagementData = React.useCallback(async () => {
    try {
      const token = await getAccessToken();
      const [
        activePlanResult,
        foodLimitResult,
        mealPlanLimitResult,
        mealPlansResult,
      ] =
        await Promise.allSettled([
        getActiveMealPlan(token),
        getFoodLimits(token),
        getMealPlanLimits(token),
        getMealPlans("ALL", token),
      ]);

      if (activePlanResult.status === "fulfilled") {
        setActiveMealPlan(activePlanResult.value);
      }

      if (foodLimitResult.status === "fulfilled") {
        setFoodLimits(foodLimitResult.value);
      }

      if (mealPlanLimitResult.status === "fulfilled") {
        setMealPlanLimits(mealPlanLimitResult.value);
      }

      if (mealPlansResult.status === "fulfilled") {
        setBackendMealPlans(mealPlansResult.value);
      }
    } catch (error) {
      console.log("Error cargando datos de gestion de alimentacion:", error);
    }
  }, []);

  useEffect(() => {
    void loadFeedingManagementData();
  }, [loadFeedingManagementData]);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const loadMiaMealPlan = async () => {
        const miaMealPlan = await getMiaGeneratedMealPlan();

        if (!isActive || !miaMealPlan) {
          return;
        }

        applyMiaMealPlan(miaMealPlan);
      };

      void loadMiaMealPlan();

      return () => {
        isActive = false;
      };
    }, [applyMiaMealPlan]),
  );

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      MIA_GENERATED_MEAL_PLAN_EVENT,
      applyMiaMealPlan,
    );

    return () => subscription.remove();
  }, [applyMiaMealPlan]);

  const togglePreference = (preference: string) => {
    setSelectedPreferences((currentPreferences) =>
      currentPreferences.includes(preference)
        ? currentPreferences.filter((current) => current !== preference)
        : [...currentPreferences, preference],
    );
    setRequiresSafetyConfirmation(false);
  };

  const handleGenerateMealPlan = async () => {
    if (mustDoubleCheckSafety && !requiresSafetyConfirmation) {
      setRequiresSafetyConfirmation(true);
      return;
    }

    try {
      setIsGeneratingMealPlan(true);
      setMealPlanError("");

      const token = await getAccessToken();
      const response = await generateMealPlan(
        {
          allergies,
          dislikes,
          goal: selectedGoal,
          likes,
          preferences: selectedPreferences,
        },
        token,
      );

      setGeneratedMealPlan(response);
      setSavedMealPlans((currentPlans) => [
        {
          day: selectedDay,
          id: `${Date.now()}-${Math.random()}`,
          response,
        },
        ...currentPlans,
      ]);
      setIsMealPlanModalVisible(false);
      setRequiresSafetyConfirmation(false);
      console.log("Plan de comidas generado:", response);
    } catch (error) {
      console.error("Error generando plan de comidas:", error);
      setMealPlanError(
        error instanceof Error
          ? error.message
          : "No se pudo generar el plan de comidas.",
      );
    } finally {
      setIsGeneratingMealPlan(false);
    }
  };

  const handleSaveAndActivateMealPlan = async () => {
    if (!generatedMealPlan) {
      return;
    }

    try {
      setIsSavingMealPlan(true);
      setMealPlanError("");

      const token = await getAccessToken();
      const savedPlan = await saveMealPlan(
        {
          goal: generatedMealPlan.objetivo,
          menu: generatedMealPlan.menu,
          recomendacionesNutricionales:
            generatedMealPlan.recomendaciones_nutricionales,
          title: `Plan ${generatedMealPlan.objetivo}`,
        },
        token,
      );
      const activatedPlan = await activateMealPlan(savedPlan.id, token);

      setActiveMealPlan(activatedPlan);
      await loadFeedingManagementData();
    } catch (error) {
      console.error("Error guardando plan de comidas:", error);
      setMealPlanError(
        error instanceof Error
          ? error.message
          : "No se pudo guardar el plan de comidas.",
      );
    } finally {
      setIsSavingMealPlan(false);
    }
  };

  const handleMealPlanStatusChange = async (
    mealPlan: SavedMealPlan,
    action: "activate" | "deactivate",
  ) => {
    try {
      setIsManagingMealPlan(true);
      setMealPlanError("");

      const token = await getAccessToken();

      if (action === "activate") {
        const activatedPlan = await activateMealPlan(mealPlan.id, token);
        setActiveMealPlan(activatedPlan);
      } else {
        await deactivateMealPlan(mealPlan.id, token);
        if (activeMealPlan?.id === mealPlan.id) {
          setActiveMealPlan(null);
        }
      }

      await loadFeedingManagementData();
    } catch (error) {
      console.error("Error actualizando plan de comidas:", error);
      setMealPlanError(
        error instanceof Error
          ? error.message
          : "No se pudo actualizar el plan de comidas.",
      );
    } finally {
      setIsManagingMealPlan(false);
    }
  };

  const handleDeleteMealPlan = async (mealPlan: SavedMealPlan) => {
    Alert.alert(
      "Eliminar plan",
      `Eliminar ${mealPlan.title}?`,
      [
        { style: "cancel", text: "Cancelar" },
        {
          onPress: async () => {
            try {
              setIsManagingMealPlan(true);
              setMealPlanError("");

              const token = await getAccessToken();
              await deleteMealPlan(mealPlan.id, token);

              if (activeMealPlan?.id === mealPlan.id) {
                setActiveMealPlan(null);
              }

              await loadFeedingManagementData();
            } catch (error) {
              console.error("Error eliminando plan de comidas:", error);
              setMealPlanError(
                error instanceof Error
                  ? error.message
                  : "No se pudo eliminar el plan de comidas.",
              );
            } finally {
              setIsManagingMealPlan(false);
            }
          },
          style: "destructive",
          text: "Eliminar",
        },
      ],
    );
  };

  const handleDeleteFoodEntry = async (entryId: string, foodName: string) => {
    Alert.alert(
      "Eliminar comida",
      `Eliminar ${foodName}?`,
      [
        { style: "cancel", text: "Cancelar" },
        {
          onPress: async () => {
            try {
              setIsDeletingFoodEntry(true);
              setErrorMessage("");

              const token = await getAccessToken();
              await deleteFoodEntry(entryId, token);
              await loadDailyFoodLog();
              await loadFeedingManagementData();
            } catch (error) {
              console.error("Error eliminando comida:", error);
              setErrorMessage(
                error instanceof Error
                  ? error.message
                  : "No se pudo eliminar la comida.",
              );
            } finally {
              setIsDeletingFoodEntry(false);
            }
          },
          style: "destructive",
          text: "Eliminar",
        },
      ],
    );
  };

  const handleOpenEditFoodEntry = (food: FoodInfo) => {
    setEditingFoodEntry(food);
    setEditFoodQuantity(String(food.quantity || ""));
    setEditFoodMealType(food.mealType);
  };

  const handleCloseEditFoodEntry = () => {
    setEditingFoodEntry(null);
    setEditFoodQuantity("");
    setEditFoodMealType("DESAYUNO");
  };

  const handleSubmitEditFoodEntry = async () => {
    if (!editingFoodEntry) {
      return;
    }

    const parsedQuantity = Number(editFoodQuantity.replace(",", "."));

    if (!Number.isFinite(parsedQuantity) || parsedQuantity <= 0) {
      setErrorMessage("Ingresa una cantidad valida.");
      return;
    }

    try {
      setIsEditingFoodEntry(true);
      setErrorMessage("");

      const token = await getAccessToken();
      await editFoodEntry(
        editingFoodEntry.id,
        {
          mealType: editFoodMealType,
          quantity: parsedQuantity,
        },
        token,
      );

      handleCloseEditFoodEntry();
      await loadDailyFoodLog();
      await loadFeedingManagementData();
    } catch (error) {
      console.error("Error editando comida:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "No se pudo editar la comida.",
      );
    } finally {
      setIsEditingFoodEntry(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      style={{
        paddingHorizontal: wp(12),
        flex: 1,
      }}
    >
      <View style={{ marginTop: hp(24) }}>
        <FilterSelector
          filterList={filterList}
          onFilterChange={handleFilterChange}
        />
      </View>
      {loading && <CustomText type="body_secondary">Cargando...</CustomText>}
      {!!errorMessage && (
        <CustomText type="body_secondary">{errorMessage}</CustomText>
      )}
      {(foodLimits || mealPlanLimits) && (
        <View style={styles.limitsBox}>
          <CustomText type="button_secondary">Gestion de alimentacion</CustomText>
          {foodLimits && (
            <CustomText type="body_secondary">
              Comidas registradas: {foodLimits.entriesForDate}/
              {foodLimits.maxFoodEntriesPerDay}
            </CustomText>
          )}
          {mealPlanLimits && (
            <CustomText type="body_secondary">
              Planes guardados: {mealPlanLimits.savedMealPlans}/
              {mealPlanLimits.maxSavedMealPlans} - Activos:{" "}
              {mealPlanLimits.activeMealPlans}/
              {mealPlanLimits.maxActiveMealPlans}
            </CustomText>
          )}
        </View>
      )}
      {activeMealPlan && (
        <View style={styles.activePlanBox}>
          <CustomText type="button_secondary">Plan activo</CustomText>
          <CustomText type="body_secondary">{activeMealPlan.title}</CustomText>
        </View>
      )}
      {!loading && (
        <View style={styles.mealList}>
          {mealCards.map((meal) => (
            <FoodSummaryCard
              key={meal.key}
              tipoComida={meal.label}
              calorias={meal.calories}
              descripcion={meal.description}
              dato1={meal.protein}
              dato2={meal.carbohydrates}
              dato3={meal.fat}
            />
          ))}
        </View>
      )}
      {registeredFoodEntries.length > 0 && (
        <View style={styles.managementList}>
          <CustomText type="button_secondary">Comidas registradas</CustomText>
          {registeredFoodEntries.map((food) => (
            <View key={food.id} style={styles.managementCard}>
              <View style={styles.managementCardContent}>
                <CustomText type="button_secondary">{food.foodName}</CustomText>
              <CustomText type="body_secondary">
                {food.quantity}g - {food.mealType} -{" "}
                {Math.round(food.calories || 0)} kcal
              </CustomText>
            </View>
              <View style={styles.managementActions}>
                <CustomButton
                  disabled={isDeletingFoodEntry || isEditingFoodEntry}
                  onPress={() => handleOpenEditFoodEntry(food)}
                  type="secondary"
                >
                  Editar
                </CustomButton>
                <CustomButton
                  disabled={isDeletingFoodEntry || isEditingFoodEntry}
                  isLoading={isDeletingFoodEntry}
                  onPress={() => handleDeleteFoodEntry(food.id, food.foodName)}
                  type="destructive"
                >
                  Eliminar
                </CustomButton>
              </View>
            </View>
          ))}
        </View>
      )}
      <View style={styles.actions}>
        <CustomButton
          type="primary"
          onPress={() => {
            router.push("/feeding/addfood" as const);
          }}
        >
          Agregar comida
        </CustomButton>
        <CustomButton
          disabled={isGeneratingMealPlan}
          isLoading={isGeneratingMealPlan}
          type="secondary"
          onPress={() => setIsMealPlanModalVisible(true)}
        >
          Generar plan de comidas
        </CustomButton>
      </View>
      {!!mealPlanError && (
        <CustomText type="body_secondary">{mealPlanError}</CustomText>
      )}
      {generatedMealPlan && (
        <View style={styles.generatedPlan}>
          <CustomText type="button_secondary">Plan generado</CustomText>
          <CustomText type="body_secondary">
            {getMealPlanText(generatedMealPlan)}
          </CustomText>
          <CustomButton
            disabled={isSavingMealPlan || !mealPlanLimits?.canSaveMealPlan}
            isLoading={isSavingMealPlan}
            onPress={handleSaveAndActivateMealPlan}
            type="primary"
          >
            Guardar y activar
          </CustomButton>
        </View>
      )}
      {selectedDayMealPlans.length > 0 && (
        <View style={styles.generatedPlanList}>
          <CustomText type="button_secondary">
            Opciones guardadas para {selectedDay}
          </CustomText>
          {selectedDayMealPlans.map((plan, index) => (
            <View key={plan.id} style={styles.generatedPlanOption}>
              <CustomText type="button_secondary">Plan {index + 1}</CustomText>
              <CustomText type="body_secondary">
                {getMealPlanText(plan.response)}
              </CustomText>
            </View>
          ))}
        </View>
      )}
      {backendMealPlans.length > 0 && (
        <View style={styles.managementList}>
          <CustomText type="button_secondary">Planes guardados</CustomText>
          {backendMealPlans.map((plan) => (
            <View key={plan.id} style={styles.managementCard}>
              <View style={styles.managementCardContent}>
                <CustomText type="button_secondary">{plan.title}</CustomText>
                <CustomText type="body_secondary">
                  {plan.goal} - {plan.status}
                </CustomText>
              </View>
              <View style={styles.managementActions}>
                <CustomButton
                  disabled={isManagingMealPlan}
                  isLoading={isManagingMealPlan}
                  onPress={() =>
                    handleMealPlanStatusChange(
                      plan,
                      plan.status === "ACTIVE" ? "deactivate" : "activate",
                    )
                  }
                  type="secondary"
                >
                  {plan.status === "ACTIVE" ? "Desactivar" : "Activar"}
                </CustomButton>
                <CustomButton
                  disabled={isManagingMealPlan}
                  onPress={() => handleDeleteMealPlan(plan)}
                  type="destructive"
                >
                  Eliminar
                </CustomButton>
              </View>
            </View>
          ))}
        </View>
      )}

      <Modal
        animationType="fade"
        transparent
        visible={Boolean(editingFoodEntry)}
        onRequestClose={handleCloseEditFoodEntry}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <CustomText type="h2" style={styles.modalTitle}>
                Editar comida
              </CustomText>
              <Pressable
                style={styles.closeButton}
                onPress={handleCloseEditFoodEntry}
              >
                <CustomText type="button_secondary">X</CustomText>
              </Pressable>
            </View>
            <View style={styles.modalBody}>
              <View style={styles.section}>
                <CustomText type="button_secondary">
                  {editingFoodEntry?.foodName}
                </CustomText>
                <TextInput
                  keyboardType="numeric"
                  onChangeText={setEditFoodQuantity}
                  placeholder="Cantidad en gramos"
                  placeholderTextColor={COLOR.TEXTO_SECUNDARIO}
                  style={styles.input}
                  value={editFoodQuantity}
                />
              </View>

              <View style={styles.section}>
                <CustomText type="button_secondary">Tipo de comida</CustomText>
                <View style={styles.chipRow}>
                  {MEALS.map((meal) => {
                    const isSelected = editFoodMealType === meal.key;

                    return (
                      <Pressable
                        key={meal.key}
                        onPress={() => setEditFoodMealType(meal.key)}
                        style={[
                          styles.chip,
                          isSelected && styles.chipSelected,
                        ]}
                      >
                        <CustomText
                          color={
                            isSelected ? COLOR.FONDO : COLOR.TEXTO_PRINCIPAL
                          }
                          type="body"
                        >
                          {meal.label}
                        </CustomText>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <View style={styles.actionRow}>
                <CustomButton
                  disabled={isEditingFoodEntry}
                  isLoading={isEditingFoodEntry}
                  onPress={handleSubmitEditFoodEntry}
                  type="primary"
                >
                  Guardar cambios
                </CustomButton>
                <CustomButton
                  disabled={isEditingFoodEntry}
                  onPress={handleCloseEditFoodEntry}
                  type="secondary"
                >
                  Cancelar
                </CustomButton>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent
        visible={isMealPlanModalVisible}
        onRequestClose={() => setIsMealPlanModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <CustomText type="h2" style={styles.modalTitle}>
                Generar plan de comidas
              </CustomText>
              <Pressable
                style={styles.closeButton}
                onPress={() => setIsMealPlanModalVisible(false)}
              >
                <CustomText type="button_secondary">X</CustomText>
              </Pressable>
            </View>
            <ScrollView
              contentContainerStyle={styles.modalBody}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.section}>
                <CustomText type="button_secondary">Objetivo</CustomText>
                <View style={styles.chipRow}>
                  {GOALS.map((goal) => {
                    const isSelected = selectedGoal === goal;

                    return (
                      <Pressable
                        key={goal}
                        onPress={() => setSelectedGoal(goal)}
                        style={[styles.chip, isSelected && styles.chipSelected]}
                      >
                        <CustomText
                          type="body"
                          color={isSelected ? COLOR.FONDO : COLOR.TEXTO_PRINCIPAL}
                        >
                          {goal}
                        </CustomText>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <View style={styles.section}>
                <CustomText type="button_secondary">Preferencias</CustomText>
                <View style={styles.chipRow}>
                  {PREFERENCES.map((preference) => {
                    const isSelected =
                      selectedPreferences.includes(preference);

                    return (
                      <Pressable
                        key={preference}
                        onPress={() => togglePreference(preference)}
                        style={[styles.chip, isSelected && styles.chipSelected]}
                      >
                        <CustomText
                          type="body"
                          color={isSelected ? COLOR.FONDO : COLOR.TEXTO_PRINCIPAL}
                        >
                          {preference}
                        </CustomText>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <View style={styles.section}>
                <CustomText type="button_secondary">Alergias</CustomText>
                <TextInput
                  value={allergiesInput}
                  onChangeText={(value) => {
                    setAllergiesInput(value);
                    setRequiresSafetyConfirmation(false);
                  }}
                  placeholder="Ej: mani, lactosa, gluten"
                  placeholderTextColor={COLOR.TEXTO_SECUNDARIO}
                  style={styles.input}
                />
                <CustomText type="body_secondary" style={styles.helperText}>
                  Separalas con coma. Nunca deberian aparecer en el plan.
                </CustomText>
              </View>

              <View style={styles.section}>
                <CustomText type="button_secondary">Me gusta</CustomText>
                <TextInput
                  value={likesInput}
                  onChangeText={(value) => {
                    setLikesInput(value);
                    setRequiresSafetyConfirmation(false);
                  }}
                  placeholder="Ej: pollo, arroz, palta"
                  placeholderTextColor={COLOR.TEXTO_SECUNDARIO}
                  style={styles.input}
                />
              </View>

              <View style={styles.section}>
                <CustomText type="button_secondary">No me gusta</CustomText>
                <TextInput
                  value={dislikesInput}
                  onChangeText={(value) => {
                    setDislikesInput(value);
                    setRequiresSafetyConfirmation(false);
                  }}
                  placeholder="Ej: pescado, huevo"
                  placeholderTextColor={COLOR.TEXTO_SECUNDARIO}
                  style={styles.input}
                />
              </View>

              {safetyWarnings.length > 0 && (
                <View style={styles.warningBox}>
                  <CustomText type="button_secondary">Doble revision</CustomText>
                  {safetyWarnings.map((warning) => (
                    <CustomText
                      key={warning}
                      type="body_secondary"
                      style={styles.helperText}
                    >
                      {warning}
                    </CustomText>
                  ))}
                </View>
              )}

              <View style={styles.actionRow}>
                <CustomButton
                  disabled={isGeneratingMealPlan}
                  isLoading={isGeneratingMealPlan}
                  type={requiresSafetyConfirmation ? "destructive" : "primary"}
                  onPress={handleGenerateMealPlan}
                >
                  {requiresSafetyConfirmation
                    ? "Confirmar y generar"
                    : "Generar plan"}
                </CustomButton>
                <CustomButton
                  disabled={isGeneratingMealPlan}
                  type="secondary"
                  onPress={() => setIsMealPlanModalVisible(false)}
                >
                  Cancelar
                </CustomButton>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
