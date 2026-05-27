import FilterInformationBox from "@/src/core/components/FilterInformationBox";
import DailyExerciseCard from "@/src/features/routine/components/DailyExerciseCard";
import { COLOR } from "@/src/theme";
import React from "react";
import { View } from "react-native";

export default function RoutineScreen() {
  return (
    <View>
      <DailyExerciseCard
        excerciseName="Pecho + Triceps"
        description="6 ejercicios"
        estimatedTimeMin={45}
        pathImage="https://i.scdn.co/image/ab67616d0000b2732f44fa0694228be2e5b8887b"
        rightElement={
          <FilterInformationBox color={COLOR.MORADO}>
            Mañana
          </FilterInformationBox>
        }
      />
      <DailyExerciseCard
        excerciseName="Cardio 20 min"
        description="6 ejercicios"
        intensity="alta intencidad"
        pathImage="https://images.steamusercontent.com/ugc/23179543362586276/274ED7378A4EDB6FE6B2FB3308567EF55EF0FBC8/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
        rightElement={
          <FilterInformationBox color={COLOR.AZUL_PRIMARIO}>
            Hoy
          </FilterInformationBox>
        }
      />
    </View>
  );
}
