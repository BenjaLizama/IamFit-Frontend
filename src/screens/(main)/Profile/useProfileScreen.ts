import { MiaContextItem, MiaQuickAction } from "@/src/core/components/MiaContextCard";
import {
  ProfileActivityType,
  UpdateUserProfileRequest,
  UserProfileActiveItemsResponse,
  UserProfileActivityResponse,
  UserProfileContextResponse,
  UserProfileResponse,
  UserProfileSummaryResponse,
} from "@/src/services/user-profile/user-profile.dtos";
import {
  getProfile,
  getProfileActiveItems,
  getProfileActivity,
  getProfileContext,
  getProfileSummary,
  updateProfile,
} from "@/src/services/user-profile/user-profile.service";
import { Href, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";

export const PROFILE_FILTERS = [
  "General",
  "Ejercicios",
  "Comidas",
  "Rutinas",
  "Planes",
] as const;

export type ProfileFilter = (typeof PROFILE_FILTERS)[number];

type EditableField =
  | "allergies"
  | "equipment"
  | "limitations"
  | "dietaryPreferences";

const FILTER_TO_CHART_TYPE: Record<ProfileFilter, ProfileActivityType> = {
  General: "WORKOUTS",
  Ejercicios: "WORKOUTS",
  Comidas: "CALORIES",
  Rutinas: "ROUTINES",
  Planes: "PROTEIN",
};

const GOAL_LABELS: Record<string, string> = {
  GAIN_MUSCLE: "Ganar musculo",
  LOSE_WEIGHT: "Bajar de peso",
  MAINTAIN_WEIGHT: "Mantener peso",
  IMPROVE_HEALTH: "Mejorar salud",
};

const ACTIVITY_LABELS: Record<string, string> = {
  SEDENTARY: "Sedentario",
  LIGHT: "Ligero",
  MODERATE: "Moderado",
  ACTIVE: "Activo",
  VERY_ACTIVE: "Muy activo",
};

const FIELD_LABELS: Record<EditableField, string> = {
  allergies: "alergias",
  equipment: "equipo disponible",
  limitations: "limitaciones",
  dietaryPreferences: "preferencias alimentarias",
};

export const useProfileScreen = () => {
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfileResponse | null>(null);
  const [summary, setSummary] = useState<UserProfileSummaryResponse | null>(null);
  const [context, setContext] = useState<UserProfileContextResponse | null>(null);
  const [activeItems, setActiveItems] =
    useState<UserProfileActiveItemsResponse | null>(null);
  const [activity, setActivity] = useState<UserProfileActivityResponse | null>(null);

  const [selectedFilter, setSelectedFilter] = useState<ProfileFilter>("General");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isChartLoading, setIsChartLoading] = useState(false);

  const [editField, setEditField] = useState<EditableField | null>(null);
  const [editDraft, setEditDraft] = useState("");
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  const loadProfileData = useCallback(async () => {
    const [profileData, summaryData, contextData, activeItemsData] =
      await Promise.all([
        getProfile(),
        getProfileSummary().catch(() => null),
        getProfileContext().catch(() => null),
        getProfileActiveItems().catch(() => null),
      ]);

    setProfile(profileData);
    setSummary(summaryData);
    setContext(contextData);
    setActiveItems(activeItemsData);
  }, []);

  const loadActivity = useCallback(async (filter: ProfileFilter) => {
    setIsChartLoading(true);
    try {
      const data = await getProfileActivity(FILTER_TO_CHART_TYPE[filter]);
      setActivity(data);
    } catch {
      setActivity(null);
    } finally {
      setIsChartLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        await Promise.all([loadProfileData(), loadActivity("General")]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [loadActivity, loadProfileData]);

  const handleFilterChange = useCallback(
    (filter: string) => {
      const nextFilter = filter as ProfileFilter;
      setSelectedFilter(nextFilter);
      loadActivity(nextFilter);
    },
    [loadActivity],
  );

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([loadProfileData(), loadActivity(selectedFilter)]);
    } finally {
      setIsRefreshing(false);
    }
  }, [loadProfileData, loadActivity, selectedFilter]);

  const goToSettings = useCallback(() => {
    router.push("/change-password" as Href);
  }, [router]);

  const openEditField = useCallback(
    (field: EditableField) => {
      const currentValue = (profile?.[field] as string[] | undefined) ?? [];
      setEditDraft(currentValue.join(", "));
      setEditField(field);
    },
    [profile],
  );

  const closeEditField = useCallback(() => {
    setEditField(null);
    setEditDraft("");
  }, []);

  const saveEditField = useCallback(async () => {
    if (!editField) return;

    const values = editDraft
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    const payload: UpdateUserProfileRequest = { [editField]: values };

    setIsSavingEdit(true);
    try {
      const updated = await updateProfile(payload);
      setProfile(updated);
      closeEditField();
    } finally {
      setIsSavingEdit(false);
    }
  }, [editField, editDraft, closeEditField]);

  const completionPercentage = useMemo(() => {
    if (typeof context?.completionPercentage === "number") {
      return context.completionPercentage;
    }

    if (!profile) return 0;

    const criteria = [
      Boolean(profile.goal),
      Boolean(profile.activityLevel),
      Boolean(profile.allergies?.length),
      Boolean(profile.equipment?.length),
      Boolean(profile.limitations?.length),
    ];

    const filled = criteria.filter(Boolean).length;
    return Math.round((filled / criteria.length) * 100);
  }, [context, profile]);

  const goalLabel = useMemo(() => {
    if (!profile?.goal) return null;
    return GOAL_LABELS[profile.goal] ?? profile.goal;
  }, [profile]);

  const contextItems = useMemo<MiaContextItem[]>(() => {
    if (!profile) return [];
    const items: MiaContextItem[] = [];

    if (profile.goal) {
      items.push({
        icon: "flag-outline",
        label: "Objetivo",
        value: GOAL_LABELS[profile.goal] ?? profile.goal,
      });
    }

    const dietParts: string[] = [];
    if (profile.dietaryPreferences?.length) {
      dietParts.push(profile.dietaryPreferences.join(", "));
    }
    if (profile.allergies?.length) {
      dietParts.push(`Sin ${profile.allergies.join(", ")}`);
    }
    if (dietParts.length) {
      items.push({
        icon: "restaurant-outline",
        label: "Alimentacion",
        value: dietParts.join(" · "),
      });
    }

    if (profile.activityLevel) {
      items.push({
        icon: "barbell-outline",
        label: "Entrenamiento",
        value: ACTIVITY_LABELS[profile.activityLevel] ?? profile.activityLevel,
      });
    }

    if (profile.limitations?.length) {
      items.push({
        icon: "alert-circle-outline",
        label: "Limitaciones",
        value: profile.limitations.join(", "),
      });
    }

    return items;
  }, [profile]);

  const footerLeft = useMemo(() => {
    const plan = activeItems?.activeMealPlan;
    if (!plan) return null;
    return {
      icon: "restaurant-outline",
      label: "Plan activo",
      value: plan.name || plan.goal || "Activo",
    };
  }, [activeItems]);

  const footerRight = useMemo(() => {
    const routine = activeItems?.activeRoutines?.[0];
    if (!routine) return null;
    return {
      icon: "walk-outline",
      label: "Rutina activa",
      value: routine.name || routine.title || "Activa",
    };
  }, [activeItems]);

  const quickActions = useMemo<MiaQuickAction[]>(() => {
    const actions: MiaQuickAction[] = [];

    if (!profile?.allergies?.length) {
      actions.push({
        label: "Agrega tus alergias",
        icon: "alert-circle-outline",
        onPress: () => openEditField("allergies"),
      });
    }
    if (!profile?.equipment?.length) {
      actions.push({
        label: "Selecciona tu equipo disponible",
        icon: "barbell-outline",
        onPress: () => openEditField("equipment"),
      });
    }
    if (!profile?.limitations?.length) {
      actions.push({
        label: "Define tus limitaciones",
        icon: "body-outline",
        onPress: () => openEditField("limitations"),
      });
    }

    return actions;
  }, [profile, openEditField]);

  const contentCards = useMemo(() => {
    const cards: { id: string; icon: string; title: string; subtitle: string }[] =
      [];

    const includeRoutines =
      selectedFilter === "General" ||
      selectedFilter === "Ejercicios" ||
      selectedFilter === "Rutinas";
    const includeMealPlan =
      selectedFilter === "General" ||
      selectedFilter === "Comidas" ||
      selectedFilter === "Planes";

    if (includeRoutines) {
      activeItems?.activeRoutines?.forEach((routine) => {
        cards.push({
          id: `routine-${routine.id}`,
          icon: "barbell-outline",
          title: routine.name || routine.title || "Rutina",
          subtitle: routine.durationMinutes
            ? `${routine.durationMinutes} min`
            : "Activa",
        });
      });
    }

    if (includeMealPlan && activeItems?.activeMealPlan) {
      cards.push({
        id: `mealplan-${activeItems.activeMealPlan.id}`,
        icon: "restaurant-outline",
        title: activeItems.activeMealPlan.name || "Plan de comidas",
        subtitle: activeItems.activeMealPlan.goal || "Activo",
      });
    }

    return cards;
  }, [activeItems, selectedFilter]);

  return {
    profile,
    summary,
    activity,
    selectedFilter,
    isLoading,
    isRefreshing,
    isChartLoading,
    completionPercentage,
    goalLabel,
    contextItems,
    footerLeft,
    footerRight,
    quickActions,
    contentCards,
    editField,
    editFieldLabel: editField ? FIELD_LABELS[editField] : "",
    editDraft,
    isSavingEdit,
    setEditDraft,
    handleFilterChange,
    handleRefresh,
    goToSettings,
    closeEditField,
    saveEditField,
  };
};
