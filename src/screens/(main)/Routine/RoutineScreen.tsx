import CustomButton from "@/src/core/components/CustomButton";
import CustomCheckbox from "@/src/core/components/CustomCheckbox";
import CustomText from "@/src/core/components/CustomText";
import ExpandableScreen from "@/src/core/components/ExpandableScreen";
import FilterInformationBox from "@/src/core/components/FilterInformationBox";
import DailyExerciseCard from "@/src/features/routine/components/DailyExerciseCard";
import ExerciseListItem from "@/src/features/routine/components/ExerciseListItem";
import { COLOR, UI } from "@/src/theme";
import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const misEjercicios = [
  {
    id: "1",
    kind: "weight" as const,
    name: "Press banca plano",
    series: 4,
    reps: 10,
    weight: 60,
  },
  {
    id: "2",
    kind: "cardio" as const,
    name: "Cardio HIIT",
    time: "20 min",
    intensity: "alta intensidad",
  },
  {
    id: "3",
    kind: "weight" as const,
    name: "Aperturas con mancuernas",
    series: 3,
    reps: 12,
    weight: 14,
  },
];

export default function RoutineScreen() {
  const [checkedExerciseIds, setCheckedExerciseIds] = React.useState<string[]>(
    [],
  );

  const toggleExercise = (exerciseId: string) => {
    setCheckedExerciseIds((currentIds) =>
      currentIds.includes(exerciseId)
        ? currentIds.filter((currentId) => currentId !== exerciseId)
        : [...currentIds, exerciseId],
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: UI.spacing.xl,
        paddingHorizontal: UI.LATERAL_PADDING,
      }}
    >
      <DailyExerciseCard
        exerciseName="Pecho + Triceps"
        description="6 ejercicios"
        estimatedTimeMin={45}
        pathImage="https://i.scdn.co/image/ab67616d0000b2732f44fa0694228be2e5b8887b"
        rightElement={
          <FilterInformationBox color={COLOR.MORADO}>
            Mañana
          </FilterInformationBox>
        }
      />

      <ExpandableScreen
        initialRadius={10}
        headerChildren
        children1={
          <DailyExerciseCard
            exerciseName="Cardio 20 min"
            description="6 ejercicios"
            intensity="alta intensidad"
            pathImage="https://images.steamusercontent.com/ugc/23179543362586276/274ED7378A4EDB6FE6B2FB3308567EF55EF0FBC8/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
            rightElement={
              <FilterInformationBox color={COLOR.AZUL_PRIMARIO}>
                Hoy
              </FilterInformationBox>
            }
          />
        }
        children2={
          <View>
            <View>
              <CustomText type="h1">Ejercicios</CustomText>

              {misEjercicios.map((ejercicio) => {
                const isChecked = checkedExerciseIds.includes(ejercicio.id);

                return (
                  <ExerciseListItem
                    key={ejercicio.id}
                    {...ejercicio}
                    checked={isChecked}
                    rightItem={
                      <CustomCheckbox
                        checked={isChecked}
                        onPress={() => toggleExercise(ejercicio.id)}
                        size={18}
                      ></CustomCheckbox>
                    }
                  />
                );
              })}
            </View>
            <View style={{ marginTop: UI.spacing.lg }}>
              <CustomButton
                onPress={() => console.log("Seleccionar rutina para editar")}
                type="primary"
              >
                Seleccionar rutina para editar
              </CustomButton>
            </View>
          </View>
        }
      ></ExpandableScreen>
    </ScrollView>
  );
}
