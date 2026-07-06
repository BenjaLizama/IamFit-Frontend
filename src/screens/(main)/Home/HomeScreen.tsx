import CustomCarousel from "@/src/core/components/CustomCarousel";
import CustomText from "@/src/core/components/CustomText";
import { hp } from "@/src/core/utils";
import DailyGoalItem from "@/src/features/home/components/DailyGoalItem";
import DailyGoalProgressItem from "@/src/features/home/components/DailyGoalProgressItem/DailyGoalProgressItem";
import DayCalendarCard from "@/src/features/home/components/DayCalendarCard";
import ProgressTaskCard from "@/src/features/home/components/ProgressTaskCard";
import WelcomeUser from "@/src/features/home/components/WelcomeUser";
import { COLOR, UI } from "@/src/theme";
import React from "react";
import { RefreshControl, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { HomeScreenStyles as styles } from "./HomeScreen.styles";
import { useHomeScreen } from "./useHomeScreen";

export default function HomeScreen() {
  const {
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
    reload,
  } = useHomeScreen();

  const proteinProgressLabel = `${protein}/${proteinGoal}g`;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={reload} />
      }
      style={styles.container}
    >
      <WelcomeUser name={nickname} />
      <CustomCarousel mode="centered" initialIndex={7}>
        {calendarDays.map((day) => (
          <DayCalendarCard
            key={day.id}
            type={day.isSelected ? "selected" : undefined}
            month={day.month}
            dayNumber={day.dayNumber}
            dayText={day.dayText}
          />
        ))}
      </CustomCarousel>

      <View style={{ marginTop: hp(12) }}>
        <ProgressTaskCard
          actualCalories={Math.round(calories)}
          goal={calorieGoal}
        />
      </View>

      {!!errorMessage && (
        <View style={{ paddingTop: UI.spacing.md }}>
          <CustomText type="body_secondary">{errorMessage}</CustomText>
        </View>
      )}

      <View style={{ paddingVertical: UI.LATERAL_PADDING }}>
        <CustomText type="body_secondary">Resumen del dia</CustomText>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <DailyGoalItem
          color={COLOR.AZUL_PRIMARIO}
          item={exerciseCount}
          text="Ejercicios"
        />
        <DailyGoalItem
          color={COLOR.TEXTO_PRINCIPAL}
          item={`${protein}g`}
          text="Proteina"
        />
        <DailyGoalItem
          color={COLOR.SUCCESS}
          item={proteinProgressLabel}
          text="Meta proteina"
        />
      </View>

      <View style={{ paddingVertical: UI.LATERAL_PADDING }}>
        <CustomText type="body_secondary">En progreso</CustomText>
      </View>
      {progressTasks.length > 0 ? (
        <View style={styles.progressGrid}>
          {progressTasks.map((task) => (
            <DailyGoalProgressItem
              key={task.id}
              goal={task.goal}
              subtitle={task.subtitle}
              progress={task.progress}
              color={task.color}
            />
          ))}
        </View>
      ) : (
        <View style={styles.emptyProgress}>
          <CustomText type="body_secondary">
            Activa una rutina o un plan de comidas para ver tu progreso aqui.
          </CustomText>
        </View>
      )}
    </ScrollView>
  );
}
