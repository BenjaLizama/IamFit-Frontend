import CustomButton from "@/src/core/components/CustomButton";
import CustomText from "@/src/core/components/CustomText";
import FilterSelector from "@/src/core/components/FilterSelector";
import { useActiveFilter } from "@/src/core/hooks/useActiveFilter";
import RoutineExpandableCard from "@/src/features/routine/components/RoutineExpandableCard";
import { MOCK_ROUTINES } from "@/src/features/routine/data/RoutineMock";
import {
  Routine as BackendRoutine,
  GenerateRoutineRequest,
  MuscleGroup,
  RoutineDifficulty,
  RoutineEquipment,
  generateRoutineOptions,
  getRoutines,
  selectGeneratedRoutine,
} from "@/src/services/routines";
import { getAccessToken } from "@/src/services/session/token.storage";
import { COLOR } from "@/src/theme";
import React, { useState } from "react";
import { Pressable, ScrollView, TextInput, View } from "react-native";
import { RoutineScreenStyles as style } from "./RoutineScreen.styles";

const FILTER_LIST = ["Esta semana", "Completado", "Favoritas"];
const MUSCLE_GROUP_OPTIONS: MuscleGroup[] = [
  "PECHO",
  "ESPALDA",
  "HOMBROS",
  "BICEPS",
  "TRICEPS",
  "PIERNAS",
  "GLUTEOS",
  "CORE",
  "CARDIO",
  "CUERPO_COMPLETO",
];
const EQUIPMENT_OPTIONS: RoutineEquipment[] = [
  "BARRA",
  "MANCUERNAS",
  "CUERDA",
  "CINTA",
  "MAQUINAS",
  "NINGUNO",
];
const DIFFICULTY_OPTIONS: RoutineDifficulty[] = [
  "PRINCIPIANTE",
  "INTERMEDIO",
  "AVANZADO",
];
const DURATION_OPTIONS = [30, 45, 60];

export default function RoutineScreen() {
  const { handleFilterChange } = useActiveFilter();
  const [checkedExerciseIds, setCheckedExerciseIds] = useState<string[]>([]);
  const [routines, setRoutines] = useState(MOCK_ROUTINES);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSelectingRoutine, setIsSelectingRoutine] = useState(false);
  const [generatedSessionId, setGeneratedSessionId] = useState<string | null>(
    null,
  );
  const [generatedRoutines, setGeneratedRoutines] = useState<BackendRoutine[]>(
    [],
  );
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<
    MuscleGroup[]
  >(["PECHO", "TRICEPS"]);
  const [selectedEquipment, setSelectedEquipment] = useState<
    RoutineEquipment[]
  >(["BARRA", "MANCUERNAS"]);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<RoutineDifficulty>("INTERMEDIO");
  const [selectedDuration, setSelectedDuration] = useState(45);
  const [limitations, setLimitations] = useState("ninguna");

  const toggleExercise = (routineId: string, exerciseId: string) => {
    const compositeKey = `${routineId}-${exerciseId}`;
    setCheckedExerciseIds((currentIds) =>
      currentIds.includes(compositeKey)
        ? currentIds.filter((id) => id !== compositeKey)
        : [...currentIds, compositeKey],
    );
  };

  const loadRoutines = React.useCallback(async () => {
    try {
      const token = await getAccessToken();
      const data = await getRoutines(token);
      setRoutines(data.map(mapBackendRoutineToScreenRoutine));
      console.log("Rutinas del usuario:", data);
    } catch (error) {
      console.log("Error cargando rutinas:", error);
    }
  }, []);

  React.useEffect(() => {
    loadRoutines();
  }, [loadRoutines]);

  const toggleMuscleGroup = (muscleGroup: MuscleGroup) => {
    setSelectedMuscleGroups((currentMuscleGroups) =>
      currentMuscleGroups.includes(muscleGroup)
        ? currentMuscleGroups.filter((current) => current !== muscleGroup)
        : [...currentMuscleGroups, muscleGroup],
    );
  };

  const toggleEquipment = (equipment: RoutineEquipment) => {
    setSelectedEquipment((currentEquipment) =>
      currentEquipment.includes(equipment)
        ? currentEquipment.filter((current) => current !== equipment)
        : [...currentEquipment, equipment],
    );
  };

  const handleGenerateRoutineOptions = async () => {
    if (!selectedMuscleGroups.length || !selectedEquipment.length) {
      console.log("Selecciona al menos un grupo muscular y un equipo.");
      return;
    }

    const body: GenerateRoutineRequest = {
      availableEquipment: selectedEquipment,
      difficulty: selectedDifficulty,
      durationMinutes: selectedDuration,
      limitations: limitations.trim() || "ninguna",
      muscleGroups: selectedMuscleGroups,
    };

    try {
      setIsGenerating(true);
      const token = await getAccessToken();
      const response = await generateRoutineOptions(body, token);

      setGeneratedSessionId(response.sessionId);
      setGeneratedRoutines(response.routines);
      console.log("Rutinas generadas:", response);
    } catch (error) {
      console.log("Error generando rutinas:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectGeneratedRoutine = async (
    selectedIndex: number,
    routine: BackendRoutine,
  ) => {
    if (!generatedSessionId) {
      console.log("No hay sessionId de generacion.");
      return;
    }

    try {
      setIsSelectingRoutine(true);
      const token = await getAccessToken();

      await selectGeneratedRoutine(
        {
          customName: routine.name,
          selectedIndex,
          sessionId: generatedSessionId,
        },
        token,
      );

      setGeneratedRoutines([]);
      setGeneratedSessionId(null);
      setIsAiPanelOpen(false);
      await loadRoutines();
    } catch (error) {
      console.log("Error seleccionando rutina generada:", error);
    } finally {
      setIsSelectingRoutine(false);
    }
  };

  const mapBackendRoutineToScreenRoutine = (routine: BackendRoutine) => {
    return {
      id: routine.id,
      name: routine.name,
      description: `${routine.exercises.length} ejercicios`,
      dayLabel: "Hoy",
      dayColor: COLOR.AZUL_PRIMARIO,
      imageVariant: "blue" as const,
      checked: false,
      summary: {
        equipment: "Sin equipamiento",
        exerciseCount: routine.exercises.length,
        level: routine.difficultyLevel,
        nextSessionLabel: "Hoy",
        estimatedTime: routine.estimatedDurationMinutes,
      },
      exercises: routine.exercises.map((exercise) => ({
        id: exercise.id,
        kind: "weight" as const,
        name: exercise.exerciseName,
        series: exercise.sets,
        reps: exercise.reps,
        weight: exercise.weightKg,
      })),
    };
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
        {routines.map((routine) => (
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
          <CustomButton
            type="secondary"
            onPress={() => setIsAiPanelOpen((current) => !current)}
          >
            Generar rutina con IA
          </CustomButton>
        </View>
      </View>

      {isAiPanelOpen && (
        <View style={style.aiPanel}>
          <View style={style.aiSection}>
            <CustomText type="button_secondary">Grupos musculares</CustomText>
            <View style={style.chipRow}>
              {MUSCLE_GROUP_OPTIONS.map((muscleGroup) => {
                const isSelected = selectedMuscleGroups.includes(muscleGroup);

                return (
                  <Pressable
                    key={muscleGroup}
                    onPress={() => toggleMuscleGroup(muscleGroup)}
                    style={[style.chip, isSelected && style.chipSelected]}
                  >
                    <CustomText
                      type="body"
                      color={isSelected ? COLOR.FONDO : COLOR.TEXTO_PRINCIPAL}
                      size={13}
                    >
                      {muscleGroup}
                    </CustomText>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={style.aiSection}>
            <CustomText type="button_secondary">Equipo disponible</CustomText>
            <View style={style.chipRow}>
              {EQUIPMENT_OPTIONS.map((equipment) => {
                const isSelected = selectedEquipment.includes(equipment);

                return (
                  <Pressable
                    key={equipment}
                    onPress={() => toggleEquipment(equipment)}
                    style={[style.chip, isSelected && style.chipSelected]}
                  >
                    <CustomText
                      type="body"
                      color={isSelected ? COLOR.FONDO : COLOR.TEXTO_PRINCIPAL}
                      size={13}
                    >
                      {equipment}
                    </CustomText>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={style.aiSection}>
            <CustomText type="button_secondary">Dificultad</CustomText>
            <View style={style.chipRow}>
              {DIFFICULTY_OPTIONS.map((difficulty) => {
                const isSelected = selectedDifficulty === difficulty;

                return (
                  <Pressable
                    key={difficulty}
                    onPress={() => setSelectedDifficulty(difficulty)}
                    style={[style.chip, isSelected && style.chipSelected]}
                  >
                    <CustomText
                      type="body"
                      color={isSelected ? COLOR.FONDO : COLOR.TEXTO_PRINCIPAL}
                      size={13}
                    >
                      {difficulty}
                    </CustomText>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={style.aiSection}>
            <CustomText type="button_secondary">Duracion objetivo</CustomText>
            <View style={style.chipRow}>
              {DURATION_OPTIONS.map((duration) => {
                const isSelected = selectedDuration === duration;

                return (
                  <Pressable
                    key={duration}
                    onPress={() => setSelectedDuration(duration)}
                    style={[style.chip, isSelected && style.chipSelected]}
                  >
                    <CustomText
                      type="body"
                      color={isSelected ? COLOR.FONDO : COLOR.TEXTO_PRINCIPAL}
                      size={13}
                    >
                      {duration} min
                    </CustomText>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={style.aiSection}>
            <CustomText type="button_secondary">Limitaciones</CustomText>
            <TextInput
              value={limitations}
              onChangeText={setLimitations}
              placeholder="ninguna"
              placeholderTextColor={COLOR.TEXTO_SECUNDARIO}
              style={style.limitationsInput}
            />
          </View>

          <CustomButton
            type="primary"
            isLoading={isGenerating}
            disabled={isSelectingRoutine}
            onPress={handleGenerateRoutineOptions}
          >
            Generar 3 opciones
          </CustomButton>

          {generatedRoutines.length > 0 && (
            <View style={style.generatedList}>
              <CustomText type="button_secondary">
                Selecciona una rutina
              </CustomText>

              {generatedRoutines.map((routine, index) => (
                <View
                  key={`${routine.name}-${index}`}
                  style={style.generatedCard}
                >
                  <View style={style.generatedCardHeader}>
                    <CustomText type="button_secondary">
                      Opcion {index + 1}
                    </CustomText>
                    <View style={style.generatedCardContent}>
                      <CustomText
                        type="button_secondary"
                        style={style.generatedCardTitle}
                      >
                        {routine.name}
                      </CustomText>
                      <CustomText
                        type="body_secondary"
                        size={13}
                        style={style.generatedCardDescription}
                      >
                        {routine.exercises.length} ejercicios -{" "}
                        {routine.estimatedDurationMinutes} min
                      </CustomText>
                    </View>
                  </View>

                  <CustomButton
                    type="secondary"
                    isLoading={isSelectingRoutine}
                    disabled={isGenerating}
                    onPress={() => handleSelectGeneratedRoutine(index, routine)}
                  >
                    Elegir esta
                  </CustomButton>
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}
