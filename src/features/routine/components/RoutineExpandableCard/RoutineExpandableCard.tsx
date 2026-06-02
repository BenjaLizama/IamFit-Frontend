import CustomButton from "@/src/core/components/CustomButton";
import CustomCheckbox from "@/src/core/components/CustomCheckbox";
import CustomText from "@/src/core/components/CustomText";
import ExpandableScreen from "@/src/core/components/ExpandableScreen";
import FilterInformationBox from "@/src/core/components/FilterInformationBox";
import DailyExerciseCard from "@/src/features/routine/components/DailyExerciseCard";
import ExerciseListItem from "@/src/features/routine/components/ExerciseListItem";
import RoutineSummaryCard from "@/src/features/routine/components/RoutineSummaryCard";
import React from "react";
import { View } from "react-native";
import { RoutineExpandableCardStyles as style } from "./RoutineExpandableCard.styles";
import { RoutineExpandableCardProps } from "./RoutineExpandableCard.types";

export default function RoutineExpandableCard({
  routine,
  checkedExerciseIds,
  onToggleExercise,
}: RoutineExpandableCardProps) {
  return (
    <ExpandableScreen
      initialRadius={10}
      pressScale={1}
      showHeader={false}
      headerChildren={null}
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
        <View style={style.detailContent}>
          <View style={style.detailHeader}>
            <View style={style.detailTitleRow}>
              <CustomCheckbox checked={routine.checked} size={16} />
              <CustomText type="button_secondary" style={style.detailTitle}>
                {routine.name}
              </CustomText>
            </View>
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
              <CustomButton type="primary">Iniciar rutina</CustomButton>
            </View>
          </View>
        </View>
      }
    />
  );
}
