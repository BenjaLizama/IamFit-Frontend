import CustomButton from "@/src/core/components/CustomButton";
import CustomText from "@/src/core/components/CustomText";
import FilterSelector from "@/src/core/components/FilterSelector";
import { useActiveFilter } from "@/src/core/hooks/useActiveFilter";
import RoutineExpandableCard from "@/src/features/routine/components/RoutineExpandableCard";
import { MOCK_ROUTINES } from "@/src/features/routine/data/RoutineMock";
import { getRoutines } from "@/src/services/routines";
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
  React.useEffect(() => {
    const loadRoutines = async () => {
      try {
        const data = await getRoutines();
        console.log("Rutinas del usuario:", data);
      } catch (error) {
        console.log("Error cargando rutinas:", error);
      }
    };

    loadRoutines();
  }, []);

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
          <RoutineExpandableCard
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
        <View>
          <CustomButton type="secondary">Generar rutina con IA</CustomButton>
        </View>
      </View>
    </ScrollView>
  );
}
