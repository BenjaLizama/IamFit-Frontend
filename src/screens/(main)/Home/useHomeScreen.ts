import { DayType, MonthType } from "@/src/core/types";
import {
  getActiveMealPlanProgress,
  getDailyFoodLogSummary,
} from "@/src/services/feeding/feeding.service";
import { getRoutineProgress } from "@/src/services/routines";
import { getAccessToken } from "@/src/services/session/token.storage";
import { getNickname } from "@/src/services/session/user.storage";
import {
  getProfile,
  getProfileActiveItems,
} from "@/src/services/user-profile/user-profile.service";
import { COLOR } from "@/src/theme";
import { useCallback, useEffect, useMemo, useState } from "react";

const MONTHS: MonthType[] = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const DAYS: DayType[] = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
];

export interface HomeCalendarDay {
  dayNumber: number;
  dayText: DayType;
  id: string;
  isSelected: boolean;
  month: MonthType;
}

export interface HomeProgressTask {
  color: string;
  goal: string;
  id: string;
  progress: number;
  subtitle: string;
}

const clampProgress = (value: number) =>
  Math.max(0, Math.min(100, Math.round(value)));

const buildCalendarDays = () => {
  const today = new Date();

  return Array.from({ length: 15 }, (_, index): HomeCalendarDay => {
    const date = new Date(today);
    date.setDate(today.getDate() + index - 7);

    return {
      dayNumber: date.getDate(),
      dayText: DAYS[date.getDay()],
      id: date.toISOString(),
      isSelected: index === 7,
      month: MONTHS[date.getMonth()],
    };
  });
};

const getCalorieGoal = (goal?: string | null) => {
  if (!goal) return 1900;

  const normalizedGoal = goal
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (normalizedGoal.includes("gain") || normalizedGoal.includes("ganar")) {
    return 2300;
  }

  if (
    normalizedGoal.includes("lose") ||
    normalizedGoal.includes("bajar") ||
    normalizedGoal.includes("perder")
  ) {
    return 1700;
  }

  return 1900;
};

export const useHomeScreen = () => {
  const [nickname, setNickname] = useState<string | null>("");
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [exerciseCount, setExerciseCount] = useState(0);
  const [calorieGoal, setCalorieGoal] = useState(1900);
  const [proteinGoal, setProteinGoal] = useState(120);
  const [mealProgress, setMealProgress] = useState({
    completedMeals: 0,
    totalMeals: 0,
    percentage: 0,
  });
  const [routineProgress, setRoutineProgress] = useState({
    currentStreak: 0,
    percentage: 0,
    routineName: "",
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const calendarDays = useMemo(() => buildCalendarDays(), []);

  const loadHomeData = useCallback(async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const token = await getAccessToken();
      const storedNickname = await getNickname();
      setNickname(storedNickname);

      const [profileResult, foodSummaryResult, mealProgressResult, activeItemsResult] =
        await Promise.allSettled([
          getProfile(token),
          getDailyFoodLogSummary(token),
          getActiveMealPlanProgress(token),
          getProfileActiveItems(token),
        ]);

      if (profileResult.status === "fulfilled") {
        const profile = profileResult.value;
        setNickname(profile.nickname || storedNickname);
        setCalorieGoal(getCalorieGoal(profile.goal));
        setProteinGoal(Math.max(80, Math.round((profile.weight || 75) * 1.6)));
      }

      if (foodSummaryResult.status === "fulfilled") {
        const summary = foodSummaryResult.value;
        setCalories(Math.round(summary.totalCalories || 0));
        setProtein(Math.round(summary.totalProtein || 0));
      }

      if (mealProgressResult.status === "fulfilled") {
        const currentDay = mealProgressResult.value.days.find(
          (day) => day.day === mealProgressResult.value.currentDay,
        );
        const meals = currentDay?.meals ?? [];
        const completedMeals = meals.filter((meal) => meal.completed).length;

        setMealProgress({
          completedMeals,
          totalMeals: meals.length,
          percentage: meals.length
            ? clampProgress((completedMeals / meals.length) * 100)
            : Math.round(mealProgressResult.value.progressPercentage || 0),
        });
      }

      if (activeItemsResult.status === "fulfilled") {
        const activeRoutine = activeItemsResult.value.activeRoutines?.[0];
        const activeRoutines = activeItemsResult.value.activeRoutines || [];

        setExerciseCount(activeRoutines.length);

        if (activeRoutine?.id) {
          const progress = await getRoutineProgress(activeRoutine.id, token).catch(
            () => null,
          );

          if (progress) {
            setRoutineProgress({
              currentStreak: progress.currentStreak,
              percentage: clampProgress(progress.weeklyCompletionPercentage),
              routineName:
                activeRoutine.name || activeRoutine.title || "Rutina activa",
            });
          }
        }
      }
    } catch (error) {
      console.error("Error cargando home:", error);
      setErrorMessage("No se pudo cargar tu resumen del dia.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadHomeData();
  }, [loadHomeData]);

  const progressTasks = useMemo<HomeProgressTask[]>(() => {
    const tasks: HomeProgressTask[] = [];

    if (mealProgress.totalMeals > 0) {
      tasks.push({
        color: COLOR.AZUL_PRIMARIO,
        goal: "Plan de comidas",
        id: "meal-plan",
        progress: mealProgress.percentage,
        subtitle: `${mealProgress.completedMeals}/${mealProgress.totalMeals} comidas`,
      });
    }

    if (routineProgress.routineName) {
      tasks.push({
        color: COLOR.WARNING,
        goal: routineProgress.routineName,
        id: "routine-progress",
        progress: routineProgress.percentage,
        subtitle: `${routineProgress.currentStreak} dias de racha`,
      });
    }

    return tasks;
  }, [mealProgress, routineProgress]);

  return {
    calendarDays,
    calories,
    calorieGoal,
    errorMessage,
    exerciseCount,
    loading,
    nickname,
    protein,
    proteinGoal,
    progressTasks,
    reload: loadHomeData,
  };
};
