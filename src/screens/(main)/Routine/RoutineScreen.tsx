import CustomButton from "@/src/core/components/CustomButton";
import CustomCheckbox from "@/src/core/components/CustomCheckbox";
import CustomText from "@/src/core/components/CustomText";
import ExpandableScreen from "@/src/core/components/ExpandableScreen";
import FilterInformationBox from "@/src/core/components/FilterInformationBox";
import FilterSelector from "@/src/core/components/FilterSelector";
import { useActiveFilter } from "@/src/core/hooks/useActiveFilter";
import DailyExerciseCard from "@/src/features/routine/components/DailyExerciseCard";
import ExerciseListItem from "@/src/features/routine/components/ExerciseListItem";
import RoutineSummaryCard from "@/src/features/routine/components/RoutineSummaryCard";
import { MOCK_ROUTINES } from "@/src/features/routine/data/RoutineMock";
import { Routine } from "@/src/features/routine/types/RoutineScreen.types";
import { COLOR } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { RoutineScreenStyles as style } from "./RoutineScreen.styles";

const FILTER_LIST = ["Esta semana", "Completado", "Favoritas"];

export default function RoutineScreen() {
  const { handleFilterChange } = useActiveFilter();
  const [checkedExerciseIds, setCheckedExerciseIds] = useState<string[]>([]);

  const toggleExercise = (routineId: string, exerciseId: string) => {
    const compositeKey = `${routineId}-${exerciseId}`;
    setCheckedExerciseIds((currentIds) =>
      currentIds.includes(compositeKey)
        ? currentIds.filter((id) => id !== compositeKey)
        : [...currentIds, compositeKey],
    );
  };

  return (
    <ScrollView contentContainerStyle={style.scrollContent}>
      <View style={style.headerRow}>
        <CustomText type="h2" style={style.screenTitle}>
          Mis Rutinas
        </CustomText>
      </View>

      <View style={style.filterRow}>
        <FilterSelector
          filterList={FILTER_LIST}
          onFilterChange={handleFilterChange}
        />
      </View>
      <View style={style.routineList}>
        {MOCK_ROUTINES.map((routine) => (
          <ExpandableRoutineItem
            key={routine.id}
            routine={routine}
            checkedExerciseIds={checkedExerciseIds}
            onToggleExercise={(exerciseId) =>
              toggleExercise(routine.id, exerciseId)
            }
          />
        ))}
      </View>

      <View style={style.aiButton}>
        <Ionicons
          name="sparkles-outline"
          size={16}
          color={COLOR.AZUL_PRIMARIO}
        />
        <CustomText type="body_interactive" style={style.aiButtonText}>
          Generar rutina con IA
        </CustomText>
      </View>
    </ScrollView>
  );
}

interface ExpandableRoutineItemProps {
  routine: Routine;
  checkedExerciseIds: string[];
  onToggleExercise: (exerciseId: string) => void;
}

function ExpandableRoutineItem({
  routine,
  checkedExerciseIds,
  onToggleExercise,
}: ExpandableRoutineItemProps) {
  return (
    <ExpandableScreen
      initialRadius={10}
      headerChildren={
        <View style={style.detailTitleRow}>
          <CustomCheckbox checked={routine.checked} size={16} />
          <CustomText type="button_secondary" style={style.detailTitle}>
            {routine.name}
          </CustomText>
        </View>
      }
      children1={
        <DailyExerciseCard
          exerciseName={routine.name}
          description={routine.description}
          estimatedTimeMin={routine.summary.estimatedTime}
          imageVariant={routine.imageVariant}
          intensity={routine.intensity}
          leftElement={<CustomCheckbox checked={routine.checked} size={18} />}
          rightElement={
            <FilterInformationBox color={routine.dayColor}>
              {routine.checked ? `Ok ${routine.dayLabel}` : routine.dayLabel}
            </FilterInformationBox>
          }
        />
      }
      children2={
        <View>
          <View style={style.detailHeader}>
            <RoutineSummaryCard {...routine.summary} />
          </View>
          <View style={style.detailContainer}>
            <CustomText type="button_secondary" style={style.sectionTitle}>
              Ejercicios
            </CustomText>

            <View style={style.exerciseList}>
              {routine.exercises.map((exercise) => {
                const isChecked = checkedExerciseIds.includes(
                  `${routine.id}-${exercise.id}`,
                );

                return (
                  <ExerciseListItem
                    key={exercise.id}
                    {...exercise}
                    checked={isChecked}
                    onAction={() => onToggleExercise(exercise.id)}
                    rightItem={<CustomCheckbox checked={isChecked} size={14} />}
                  />
                );
              })}
            </View>

            <View style={style.actionRow}>
              <CustomButton type="primary" widht={style.startButton.width}>
                Iniciar rutina
              </CustomButton>
            </View>
          </View>
        </View>
      }
    />
  );
}
