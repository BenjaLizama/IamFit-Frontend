import CustomButton from "@/src/core/components/CustomButton";
import CustomText from "@/src/core/components/CustomText";
import FilterSelector from "@/src/core/components/FilterSelector";
import { useActiveFilter } from "@/src/core/hooks/useActiveFilter";
import { hp, wp } from "@/src/core/utils";
import FoodSummaryCard from "@/src/features/Feeding/components/FoodSummaryCard";
import {
  FoodInfo,
  FoodLimitsResponse,
  FoodLogCaloriesResponse,
  GeneratedMealInfo,
  GenerateMealPlanResponse,
  MealPlanDayMenu,
  MealPlanLimitsResponse,
  MealType,
  NutritionTotals,
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
  getMealPlanLimits,
  getMealPlans,
  getMealPlanText,
  saveMealPlan,
} from "@/src/services/feeding/feeding.service";
import {
  clearMiaGeneratedMealPlan,
  getMiaGeneratedMealPlan,
  MIA_GENERATED_MEAL_PLAN_EVENT,
} from "@/src/services/mia/mia.generated.storage";
import { getAccessToken } from "@/src/services/session/token.storage";
import { COLOR } from "@/src/theme";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
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

const MEAL_PLAN_MENU_CACHE_KEY = "iamfit_saved_meal_plan_menu_cache";

const EMPTY_NUTRITION: NutritionTotals = {
  calories: 0,
  carbohydrates: 0,
  fat: 0,
  fiber: 0,
  protein: 0,
};

type DayLabel = keyof typeof DAY_TO_MENU_KEY;

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

const getGeneratedMealInfo = (
  menu: MealPlanDayMenu | null,
  mealType: MealType,
): GeneratedMealInfo | null => {
  if (!menu) return null;

  if (mealType === "DESAYUNO") return menu.desayuno;
  if (mealType === "ALMUERZO") return menu.almuerzo;
  if (mealType === "CENA") return menu.cena;

  // Para los snacks, si hay varios, unimos las descripciones y sumamos los macros
  if (menu.snacks?.length) {
    return menu.snacks.reduce(
      (acc, snack) => ({
        descripcion: acc.descripcion
          ? `${acc.descripcion}, ${snack.descripcion}`
          : snack.descripcion,
        calorias: acc.calorias + snack.calorias,
        proteina: acc.proteina + snack.proteina,
        carbohidratos: acc.carbohidratos + snack.carbohidratos,
        grasa: acc.grasa + snack.grasa,
      }),
      { descripcion: "", calorias: 0, proteina: 0, carbohidratos: 0, grasa: 0 },
    );
  }
  return null;
};

const sumNutrition = (foods: FoodInfo[] = []): NutritionTotals =>
  foods.reduce(
    (totals, food) => ({
      calories: totals.calories + (food.calories || 0),
      carbohydrates: totals.carbohydrates + (food.carbohydrates || 0),
      fat: totals.fat + (food.fat || 0),
      fiber: totals.fiber + (food.fiber || 0),
      protein: totals.protein + (food.protein || 0),
    }),
    EMPTY_NUTRITION,
  );

const getMealNutrition = (
  summary: FoodLogCaloriesResponse | null,
  mealType: MealType,
) => {
  const foods = summary?.entriesByMeal?.[mealType] || [];
  const summedTotals = sumNutrition(foods);
  const backendTotals = summary?.mealTotals?.[mealType] || EMPTY_NUTRITION;

  return {
    calories: backendTotals.calories || summedTotals.calories,
    carbohydrates: backendTotals.carbohydrates || summedTotals.carbohydrates,
    fat: backendTotals.fat || summedTotals.fat,
    fiber: backendTotals.fiber || summedTotals.fiber,
    protein: backendTotals.protein || summedTotals.protein,
  };
};

const hasNutrition = (nutrition: NutritionTotals) =>
  nutrition.calories > 0 ||
  nutrition.carbohydrates > 0 ||
  nutrition.fat > 0 ||
  nutrition.protein > 0;

const isWeekMenu = (value: unknown): value is GenerateMealPlanResponse["menu"] =>
  Boolean(
    value &&
      typeof value === "object" &&
      "lunes" in value &&
      "martes" in value &&
      "miercoles" in value,
  );

const getSavedMealPlanResponse = (
  mealPlan: SavedMealPlan | null,
): GenerateMealPlanResponse | null => {
  if (!mealPlan?.menu) {
    return null;
  }

  let storedMenu = mealPlan.menu as unknown;

  if (typeof storedMenu === "string") {
    try {
      storedMenu = JSON.parse(storedMenu);
    } catch {
      return null;
    }
  }

  if (
    storedMenu &&
    typeof storedMenu === "object" &&
    "menu" in storedMenu &&
    isWeekMenu((storedMenu as GenerateMealPlanResponse).menu)
  ) {
    const response = storedMenu as GenerateMealPlanResponse;

    return {
      objetivo: response.objetivo || mealPlan.goal,
      menu: response.menu,
      recomendaciones_nutricionales:
        response.recomendaciones_nutricionales ||
        (response as any).recomendacionesNutricionales ||
        "",
    };
  }

  if (!isWeekMenu(storedMenu)) {
    return null;
  }

  return {
    objetivo: mealPlan.goal,
    menu: storedMenu,
    recomendaciones_nutricionales:
      (mealPlan as any).recomendaciones_nutricionales ||
      (mealPlan as any).recomendacionesNutricionales ||
      "",
  };
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

  return baseList.filter((item) =>
    normalizedCheckList.has(normalizeText(item)),
  );
};

const getMealPlanTitle = (
  response: GenerateMealPlanResponse | null,
  fallback = "Plan de comidas",
) => {
  if (!response) return fallback;

  return response.objetivo ? `Plan ${response.objetivo}` : fallback;
};

const readMealPlanMenuCache = async (): Promise<
  Record<string, GenerateMealPlanResponse>
> => {
  const storedValue = await SecureStore.getItemAsync(MEAL_PLAN_MENU_CACHE_KEY);

  if (!storedValue) {
    return {};
  }

  try {
    return JSON.parse(storedValue);
  } catch {
    await SecureStore.deleteItemAsync(MEAL_PLAN_MENU_CACHE_KEY);
    return {};
  }
};

const saveMealPlanMenuCache = async (
  planId: string,
  mealPlan: GenerateMealPlanResponse,
) => {
  const cache = await readMealPlanMenuCache();
  cache[planId] = mealPlan;
  await SecureStore.setItemAsync(
    MEAL_PLAN_MENU_CACHE_KEY,
    JSON.stringify(cache),
  );
};

const hydrateMealPlanMenu = (
  mealPlan: SavedMealPlan | null,
  cache: Record<string, GenerateMealPlanResponse>,
): SavedMealPlan | null => {
  if (!mealPlan) {
    return null;
  }

  if (getSavedMealPlanResponse(mealPlan)) {
    return mealPlan;
  }

  const cachedMenu = cache[mealPlan.id];

  if (!cachedMenu) {
    return mealPlan;
  }

  return {
    ...mealPlan,
    menu: cachedMenu,
  };
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
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [expandedMealKey, setExpandedMealKey] = useState<MealType | null>(null);
  const [planDetails, setPlanDetails] = useState<{
    response: GenerateMealPlanResponse;
    title: string;
  } | null>(null);
  const [planToManage, setPlanToManage] = useState<SavedMealPlan | null>(null);
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
  const activeMealPlanResponse = useMemo(
    () => getSavedMealPlanResponse(activeMealPlan),
    [activeMealPlan],
  );
  const discoveredSelectedBackendPlan = useMemo(
    () => backendMealPlans.find((plan) => plan.id === selectedPlanId),
    [backendMealPlans, selectedPlanId],
  );
  const selectedPlanResponse = useMemo(() => {
    if (discoveredSelectedBackendPlan) {
      return getSavedMealPlanResponse(discoveredSelectedBackendPlan);
    }

    return null;
  }, [discoveredSelectedBackendPlan]);
  const firstSavedPlanWithMenu = useMemo(
    () => backendMealPlans.find((plan) => getSavedMealPlanResponse(plan)),
    [backendMealPlans],
  );

  useEffect(() => {
    if (selectedPlanId && selectedPlanResponse) {
      return;
    }

    if (activeMealPlan?.id && selectedPlanId !== activeMealPlan.id) {
      setSelectedPlanId(activeMealPlan.id);
      return;
    }

    const activeBackendPlan = backendMealPlans.find(
      (plan) => plan.status === "ACTIVE" && getSavedMealPlanResponse(plan),
    );

    if (activeBackendPlan && selectedPlanId !== activeBackendPlan.id) {
      setSelectedPlanId(activeBackendPlan.id);
      return;
    }

    if (firstSavedPlanWithMenu && selectedPlanId !== firstSavedPlanWithMenu.id) {
      setSelectedPlanId(firstSavedPlanWithMenu.id);
    }
  }, [
    activeMealPlan,
    backendMealPlans,
    firstSavedPlanWithMenu,
    selectedPlanId,
    selectedPlanResponse,
  ]);

  const visibleMealPlan =
    generatedMealPlan ||
    selectedPlanResponse ||
    activeMealPlanResponse ||
    getSavedMealPlanResponse(firstSavedPlanWithMenu ?? null);
  const visibleMealPlanTitle = generatedMealPlan
    ? getMealPlanTitle(generatedMealPlan)
    : discoveredSelectedBackendPlan?.title ||
      activeMealPlan?.title ||
      firstSavedPlanWithMenu?.title ||
      getMealPlanTitle(visibleMealPlan);
  const generatedDayMenu = visibleMealPlan
    ? visibleMealPlan.menu[DAY_TO_MENU_KEY[selectedDay]]
    : null;
  const mealCards = useMemo(
    () =>
      MEALS.map((meal) => {
        const foods = summary?.entriesByMeal?.[meal.key] || [];
        const totals = getMealNutrition(summary, meal.key);

        // 1. Obtenemos toda la info generada (descripción + macros)
        const generatedInfo = getGeneratedMealInfo(generatedDayMenu, meal.key);
        const hasGeneratedInfo = Boolean(generatedInfo);
        const hasRegisteredFoods = foods.length > 0;
        const showNutrition =
          hasRegisteredFoods || hasNutrition(totals) || hasGeneratedInfo;

        // 2. Si hay plan generado, usamos sus macros. Si no, usamos los registrados manualmente.
        return {
          ...meal,
          calories: Math.round(
            totals?.calories || generatedInfo?.calorias || 0,
          ),
          carbohydrates: Math.round(
            totals?.carbohydrates || generatedInfo?.carbohidratos || 0,
          ),
          fat: Math.round(totals?.fat || generatedInfo?.grasa || 0),
          protein: Math.round(totals?.protein || generatedInfo?.proteina || 0),
          hasContent: hasGeneratedInfo || hasRegisteredFoods,
          description:
            generatedInfo?.descripcion ||
            buildMealDescription(summary, meal.key),
          showNutrition,
          foods,
          generatedInfo,
          totals,
        };
      }).filter((meal) => meal.hasContent),
    [generatedDayMenu, summary],
  );
  const registeredFoodEntries = useMemo(
    () => Object.values(summary?.entriesByMeal || {}).flat(),
    [summary],
  );
  const selectedMeal = useMemo(
    () => mealCards.find((meal) => meal.key === expandedMealKey) || null,
    [mealCards, expandedMealKey],
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
    },
    [],
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
      const menuCache = await readMealPlanMenuCache();
      const [
        activePlanResult,
        foodLimitResult,
        mealPlanLimitResult,
        mealPlansResult,
      ] = await Promise.allSettled([
        getActiveMealPlan(token),
        getFoodLimits(token),
        getMealPlanLimits(token),
        getMealPlans("ALL", token),
      ]);

      if (activePlanResult.status === "fulfilled") {
        setActiveMealPlan(
          hydrateMealPlanMenu(activePlanResult.value, menuCache),
        );
      }

      if (foodLimitResult.status === "fulfilled") {
        setFoodLimits(foodLimitResult.value);
      }

      if (mealPlanLimitResult.status === "fulfilled") {
        setMealPlanLimits(mealPlanLimitResult.value);
      }

      if (mealPlansResult.status === "fulfilled") {
        setBackendMealPlans(
          mealPlansResult.value.map((plan) =>
            hydrateMealPlanMenu(plan, menuCache) ?? plan,
          ),
        );
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
      await saveMealPlanMenuCache(savedPlan.id, generatedMealPlan);
      const activatedPlan = await activateMealPlan(savedPlan.id, token);
      if (activatedPlan.id !== savedPlan.id) {
        await saveMealPlanMenuCache(activatedPlan.id, generatedMealPlan);
      }
      const hydratedActivatedPlan = hydrateMealPlanMenu(activatedPlan, {
        [savedPlan.id]: generatedMealPlan,
        [activatedPlan.id]: generatedMealPlan,
      });

      setActiveMealPlan(hydratedActivatedPlan);
      setSelectedPlanId(activatedPlan.id);
      setGeneratedMealPlan(null);
      await clearMiaGeneratedMealPlan();
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

  const handleDiscardGeneratedMealPlan = async () => {
    setGeneratedMealPlan(null);
    await clearMiaGeneratedMealPlan();

    const fallbackPlan = activeMealPlan ?? firstSavedPlanWithMenu;

    if (fallbackPlan?.id) {
      setSelectedPlanId(fallbackPlan.id);
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
        setSelectedPlanId(mealPlan.id);
      } else {
        await deactivateMealPlan(mealPlan.id, token);
        if (activeMealPlan?.id === mealPlan.id) {
          setActiveMealPlan(null);
        }
        if (selectedPlanId === mealPlan.id) {
          setSelectedPlanId(null);
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
    Alert.alert("Eliminar plan", `Eliminar ${mealPlan.title}?`, [
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

            if (selectedPlanId === mealPlan.id) {
              setSelectedPlanId(null);
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
    ]);
  };

  const handleDeleteFoodEntry = async (entryId: string, foodName: string) => {
    Alert.alert("Eliminar comida", `Eliminar ${foodName}?`, [
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
    ]);
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
        error instanceof Error ? error.message : "No se pudo editar la comida.",
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
          <CustomText type="button_secondary">
            Gestion de alimentacion
          </CustomText>
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
      {visibleMealPlan && (
        <View style={styles.activePlanBox}>
          <View style={styles.planRowHeader}>
            <View style={styles.planRowText}>
              <CustomText type="button_secondary">Plan seleccionado</CustomText>
              <CustomText type="body_secondary">
                {visibleMealPlanTitle}
              </CustomText>
            </View>
            <Pressable
              onPress={() =>
                setPlanDetails({
                  response: visibleMealPlan,
                  title: visibleMealPlanTitle,
                })
              }
              style={styles.textAction}
            >
              <CustomText type="button_extra" color={COLOR.AZUL_PRIMARIO}>
                Ver plan
              </CustomText>
            </Pressable>
          </View>
        </View>
      )}
      {!loading && (
        <View style={styles.mealList}>
          {visibleMealPlan && (
            <View style={styles.sectionHeader}>
              <CustomText type="button_secondary">
                Comidas del plan - {selectedDay}
              </CustomText>
              <CustomText type="body_secondary">
                Toca una comida para ver el detalle.
              </CustomText>
            </View>
          )}
          {mealCards.length > 0 ? (
            mealCards.map((meal) => (
              <View key={meal.key}>
                <FoodSummaryCard
                  tipoComida={meal.label}
                  calorias={meal.calories}
                  descripcion={meal.description}
                  dato1={meal.protein}
                  dato2={meal.carbohydrates}
                  dato3={meal.fat}
                  showNutrition={meal.showNutrition}
                  onPress={() =>
                    setExpandedMealKey((current) =>
                      current === meal.key ? null : meal.key,
                    )
                  }
                  isActive={expandedMealKey === meal.key}
                />
              </View>
            ))
          ) : (
            <View style={styles.emptyMealState}>
              <CustomText type="body_secondary">
                Selecciona o activa un plan para ver las comidas del dia.
              </CustomText>
            </View>
          )}
        </View>
      )}

      <Modal
        animationType="slide"
        transparent
        visible={Boolean(selectedMeal)}
        onRequestClose={() => setExpandedMealKey(null)}
      >
        <View style={styles.detailModalBackdrop}>
          <View style={styles.detailModalContent}>
            <View style={styles.detailModalHeader}>
              <View style={styles.detailModalTitle}>
                <CustomText type="h2">{selectedMeal?.label}</CustomText>
                <CustomText type="body_secondary">
                  {selectedMeal?.calories} kcal
                </CustomText>
              </View>
              <Pressable
                style={styles.closeButton}
                onPress={() => setExpandedMealKey(null)}
              >
                <CustomText type="button_secondary">X</CustomText>
              </Pressable>
            </View>
            <ScrollView
              contentContainerStyle={styles.detailModalBody}
              showsVerticalScrollIndicator={false}
            >
              {selectedMeal?.generatedInfo && (
                <View style={styles.mealDetailSection}>
                  <CustomText type="button_secondary">Plan sugerido</CustomText>
                  <CustomText type="body">
                    {selectedMeal.generatedInfo.descripcion}
                  </CustomText>
                  <CustomText type="body_secondary">
                    {`P: ${Math.round(selectedMeal.generatedInfo.proteina)} - C: ${Math.round(selectedMeal.generatedInfo.carbohidratos)} - G: ${Math.round(selectedMeal.generatedInfo.grasa)}`}
                  </CustomText>
                </View>
              )}

              {selectedMeal?.foods.length ? (
                <View style={styles.mealDetailSection}>
                  <CustomText type="button_secondary">
                    Alimentos registrados
                  </CustomText>
                  {selectedMeal.foods.map((food) => (
                    <View key={food.id} style={styles.mealDetailItem}>
                      <CustomText type="body">{food.foodName}</CustomText>
                      <CustomText type="body_secondary">
                        {food.quantity}g · {Math.round(food.calories || 0)} kcal
                      </CustomText>
                    </View>
                  ))}
                </View>
              ) : null}

              {selectedMeal && hasNutrition(selectedMeal.totals) ? (
                <View style={styles.mealDetailSection}>
                  <CustomText type="button_secondary">
                    Macros totales
                  </CustomText>
                  <CustomText type="body_secondary">
                    {`P: ${Math.round(selectedMeal.totals.protein)} - C: ${Math.round(selectedMeal.totals.carbohydrates)} - G: ${Math.round(selectedMeal.totals.fat)}`}
                  </CustomText>
                </View>
              ) : null}
            </ScrollView>
          </View>
        </View>
      </Modal>

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
          <View style={styles.planRowHeader}>
            <View style={styles.planRowText}>
              <CustomText type="button_secondary">Plan generado</CustomText>
              <CustomText type="body_secondary">
                {getMealPlanTitle(generatedMealPlan)}
              </CustomText>
            </View>
            <Pressable
              onPress={() =>
                setPlanDetails({
                  response: generatedMealPlan,
                  title: getMealPlanTitle(generatedMealPlan),
                })
              }
              style={styles.textAction}
            >
              <CustomText type="button_extra" color={COLOR.AZUL_PRIMARIO}>
                Ver detalles
              </CustomText>
            </Pressable>
          </View>
          <CustomText type="body_secondary">
            Revisalo y guardalo solo si quieres activarlo.
          </CustomText>
          <View style={styles.managementActions}>
            <CustomButton
              disabled={isSavingMealPlan || !mealPlanLimits?.canSaveMealPlan}
              isLoading={isSavingMealPlan}
              onPress={handleSaveAndActivateMealPlan}
              type="primary"
            >
              Guardar y activar
            </CustomButton>
            <CustomButton
              disabled={isSavingMealPlan}
              onPress={handleDiscardGeneratedMealPlan}
              type="secondary"
            >
              Descartar
            </CustomButton>
          </View>
        </View>
      )}
      {backendMealPlans.length > 0 && (
        <View style={styles.managementList}>
          <CustomText type="button_secondary">Mis planes guardados</CustomText>
          {backendMealPlans.map((plan) => {
            const isSelected = plan.id === selectedPlanId;
            const response = getSavedMealPlanResponse(plan);

            return (
              <Pressable
                key={plan.id}
                disabled={!response}
                onPress={() => response && setSelectedPlanId(plan.id)}
                style={[
                  styles.managementCard,
                  isSelected && styles.selectedGeneratedPlanOption,
                ]}
              >
                <View style={styles.planRowHeader}>
                  <View style={styles.planRowText}>
                    <CustomText type="button_secondary">{plan.title}</CustomText>
                    <CustomText type="body_secondary">
                      {isSelected ? "Mostrando comidas" : plan.goal} -{" "}
                      {plan.status}
                    </CustomText>
                  </View>
                  {response && (
                    <Pressable
                      onPress={() => {
                        setPlanDetails({
                          response,
                          title: plan.title,
                        });
                      }}
                      style={styles.textAction}
                    >
                      <CustomText
                        type="button_extra"
                        color={COLOR.AZUL_PRIMARIO}
                      >
                        Ver
                      </CustomText>
                    </Pressable>
                  )}
                </View>
                <View style={styles.compactPlanActions}>
                  <CustomText
                    type="body_secondary"
                    style={styles.compactPlanHint}
                  >
                    {response
                      ? "Toca la tarjeta para ver sus comidas"
                      : "Este plan no tiene menu disponible"}
                  </CustomText>
                  <Pressable
                    onPress={() => setPlanToManage(plan)}
                    style={styles.textAction}
                  >
                    <CustomText
                      type="button_extra"
                      color={COLOR.AZUL_PRIMARIO}
                    >
                      Gestionar
                    </CustomText>
                  </Pressable>
                </View>
              </Pressable>
            );
          })}
        </View>
      )}

      <Modal
        animationType="fade"
        transparent
        visible={Boolean(planToManage)}
        onRequestClose={() => setPlanToManage(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <CustomText type="h2" style={styles.modalTitle}>
                Gestionar plan
              </CustomText>
              <Pressable
                style={styles.closeButton}
                onPress={() => setPlanToManage(null)}
              >
                <CustomText type="button_secondary">X</CustomText>
              </Pressable>
            </View>
            <View style={styles.modalBody}>
              <View style={styles.section}>
                <CustomText type="button_secondary">
                  {planToManage?.title}
                </CustomText>
                <CustomText type="body_secondary">
                  {planToManage?.goal} - {planToManage?.status}
                </CustomText>
              </View>

              {planToManage && getSavedMealPlanResponse(planToManage) ? (
                <CustomButton
                  disabled={isManagingMealPlan}
                  onPress={() => {
                    setSelectedPlanId(planToManage.id);
                    setPlanToManage(null);
                  }}
                  type="secondary"
                >
                  Mostrar comidas
                </CustomButton>
              ) : null}

              {planToManage && (
                <CustomButton
                  disabled={isManagingMealPlan}
                  isLoading={isManagingMealPlan}
                  onPress={async () => {
                    await handleMealPlanStatusChange(
                      planToManage,
                      planToManage.status === "ACTIVE"
                        ? "deactivate"
                        : "activate",
                    );
                    setPlanToManage(null);
                  }}
                  type="primary"
                >
                  {planToManage.status === "ACTIVE"
                    ? "Desactivar"
                    : "Activar"}
                </CustomButton>
              )}

              {planToManage && (
                <CustomButton
                  disabled={isManagingMealPlan}
                  onPress={() => {
                    const plan = planToManage;
                    setPlanToManage(null);
                    handleDeleteMealPlan(plan);
                  }}
                  type="destructive"
                >
                  Eliminar
                </CustomButton>
              )}
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent
        visible={Boolean(planDetails)}
        onRequestClose={() => setPlanDetails(null)}
      >
        <View style={styles.detailModalBackdrop}>
          <View style={styles.detailModalContent}>
            <View style={styles.detailModalHeader}>
              <View style={styles.detailModalTitle}>
                <CustomText type="h2">{planDetails?.title}</CustomText>
                <CustomText type="body_secondary">
                  Plan semanal completo
                </CustomText>
              </View>
              <Pressable
                style={styles.closeButton}
                onPress={() => setPlanDetails(null)}
              >
                <CustomText type="button_secondary">X</CustomText>
              </Pressable>
            </View>
            <ScrollView
              contentContainerStyle={styles.detailModalBody}
              showsVerticalScrollIndicator={false}
            >
              {planDetails &&
                filterList.map((day) => {
                  const dayMenu =
                    planDetails.response.menu[DAY_TO_MENU_KEY[day]];

                  return (
                    <View key={day} style={styles.planDaySection}>
                      <CustomText type="button_secondary">{day}</CustomText>
                      {MEALS.map((meal) => {
                        const mealInfo = getGeneratedMealInfo(
                          dayMenu,
                          meal.key,
                        );

                        if (!mealInfo) {
                          return null;
                        }

                        return (
                          <View key={meal.key} style={styles.planMealRow}>
                            <CustomText type="body">{meal.label}</CustomText>
                            <CustomText type="body_secondary">
                              {mealInfo.descripcion}
                            </CustomText>
                            <CustomText type="body_secondary">
                              {Math.round(mealInfo.calorias)} kcal - P:{" "}
                              {Math.round(mealInfo.proteina)} - C:{" "}
                              {Math.round(mealInfo.carbohidratos)} - G:{" "}
                              {Math.round(mealInfo.grasa)}
                            </CustomText>
                          </View>
                        );
                      })}
                    </View>
                  );
                })}

              {planDetails?.response.recomendaciones_nutricionales ? (
                <View style={styles.mealDetailSection}>
                  <CustomText type="button_secondary">
                    Recomendaciones
                  </CustomText>
                  <CustomText type="body_secondary">
                    {planDetails.response.recomendaciones_nutricionales}
                  </CustomText>
                </View>
              ) : null}
            </ScrollView>
          </View>
        </View>
      </Modal>

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
                        style={[styles.chip, isSelected && styles.chipSelected]}
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
                          color={
                            isSelected ? COLOR.FONDO : COLOR.TEXTO_PRINCIPAL
                          }
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
                    const isSelected = selectedPreferences.includes(preference);

                    return (
                      <Pressable
                        key={preference}
                        onPress={() => togglePreference(preference)}
                        style={[styles.chip, isSelected && styles.chipSelected]}
                      >
                        <CustomText
                          type="body"
                          color={
                            isSelected ? COLOR.FONDO : COLOR.TEXTO_PRINCIPAL
                          }
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
                  <CustomText type="button_secondary">
                    Doble revision
                  </CustomText>
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
