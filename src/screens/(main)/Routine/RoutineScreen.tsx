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
  RoutineLimitsResponse,
  RoutineStatus,
  activateRoutine,
  deactivateRoutine,
  generateRoutineOptions,
  getExerciseOptions,
  getRoutineLimits,
  getRoutines,
  selectGeneratedRoutine,
} from "@/src/services/routines";
import {
  clearMiaGeneratedRoutineOptions,
  getMiaGeneratedRoutineOptions,
  MIA_GENERATED_ROUTINE_OPTIONS_EVENT,
} from "@/src/services/mia/mia.generated.storage";
import { getAccessToken } from "@/src/services/session/token.storage";
import { COLOR } from "@/src/theme";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import {
  DeviceEventEmitter,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import { RoutineScreenStyles as style } from "./RoutineScreen.styles";

const FILTER_LIST = ["Activas", "Inactivas", "Todas"];
const STATUS_BY_FILTER: Record<string, RoutineStatus> = {
  Activas: "ACTIVE",
  Inactivas: "INACTIVE",
  Todas: "ALL",
};
const DEFAULT_MUSCLE_GROUP_OPTIONS: MuscleGroup[] = [
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
const DEFAULT_EQUIPMENT_OPTIONS: RoutineEquipment[] = [
  "BARRA",
  "MANCUERNAS",
  "MAQUINA",
  "PESO_CORPORAL",
  "POLEA",
  "BANDA_ELASTICA",
  "KETTLEBELL",
];
const DEFAULT_DIFFICULTY_OPTIONS: RoutineDifficulty[] = [
  "PRINCIPIANTE",
  "INTERMEDIO",
  "AVANZADO",
];
const DURATION_OPTIONS = [30, 45, 60];

export default function RoutineScreen() {
  const { activeFilter, handleFilterChange } = useActiveFilter("Activas");
  const selectedRoutineStatus = STATUS_BY_FILTER[activeFilter] || "ACTIVE";
  const [checkedExerciseIds, setCheckedExerciseIds] = useState<string[]>([]);
  const [routines, setRoutines] = useState(MOCK_ROUTINES);
  const [routineLimits, setRoutineLimits] =
    useState<RoutineLimitsResponse | null>(null);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUpdatingRoutine, setIsUpdatingRoutine] = useState(false);
  const [isSelectingRoutine, setIsSelectingRoutine] = useState(false);
  const [generatedSessionId, setGeneratedSessionId] = useState<string | null>(
    null,
  );
  const [generatedRoutines, setGeneratedRoutines] = useState<BackendRoutine[]>(
    [],
  );
  const [muscleGroupOptions, setMuscleGroupOptions] = useState<MuscleGroup[]>(
    DEFAULT_MUSCLE_GROUP_OPTIONS,
  );
  const [equipmentOptions, setEquipmentOptions] = useState<RoutineEquipment[]>(
    DEFAULT_EQUIPMENT_OPTIONS,
  );
  const [difficultyOptions, setDifficultyOptions] = useState<
    RoutineDifficulty[]
  >(DEFAULT_DIFFICULTY_OPTIONS);
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
  const [routineErrorMessage, setRoutineErrorMessage] = useState("");

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
      const data = await getRoutines(token, selectedRoutineStatus);
      setRoutines(data.map(mapBackendRoutineToScreenRoutine));
      console.log("Rutinas del usuario:", data);
    } catch (error) {
      console.log("Error cargando rutinas:", error);
    }
  }, [selectedRoutineStatus]);

  const loadRoutineLimits = React.useCallback(async () => {
    try {
      const token = await getAccessToken();
      const limits = await getRoutineLimits(token);

      setRoutineLimits(limits);
    } catch (error) {
      console.log("Error cargando limites de rutinas:", error);
    }
  }, []);

  const loadExerciseOptions = React.useCallback(async () => {
    try {
      const token = await getAccessToken();
      const options = await getExerciseOptions(token);

      if (options.muscleGroups?.length) {
        setMuscleGroupOptions(options.muscleGroups);
      }

      if (options.equipment?.length) {
        setEquipmentOptions(options.equipment);
      }

      if (options.difficultyLevels?.length) {
        setDifficultyOptions(options.difficultyLevels);
      }
    } catch (error) {
      console.log("Error cargando opciones de ejercicios:", error);
    }
  }, []);

  React.useEffect(() => {
    loadRoutines();
  }, [loadRoutines]);

  React.useEffect(() => {
    void loadRoutineLimits();
    void loadExerciseOptions();
  }, [loadExerciseOptions, loadRoutineLimits]);

  const applyMiaRoutineOptions = React.useCallback(
    (miaRoutineOptions: {
      routines: BackendRoutine[];
      sessionId: string;
    }) => {
      setGeneratedSessionId(miaRoutineOptions.sessionId);
      setGeneratedRoutines(miaRoutineOptions.routines);
      setIsAiPanelOpen(true);
    },
    [],
  );

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const loadMiaRoutineOptions = async () => {
        const miaRoutineOptions = await getMiaGeneratedRoutineOptions();

        if (!isActive || !miaRoutineOptions) {
          return;
        }

        applyMiaRoutineOptions(miaRoutineOptions);
      };

      void loadMiaRoutineOptions();

      return () => {
        isActive = false;
      };
    }, [applyMiaRoutineOptions]),
  );

  React.useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      MIA_GENERATED_ROUTINE_OPTIONS_EVENT,
      applyMiaRoutineOptions,
    );

    return () => subscription.remove();
  }, [applyMiaRoutineOptions]);

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
      setRoutineErrorMessage("");
      const token = await getAccessToken();
      const response = await generateRoutineOptions(body, token);

      setGeneratedSessionId(response.sessionId);
      setGeneratedRoutines(response.routines);
      console.log("Rutinas generadas:", response);
    } catch (error) {
      console.log("Error generando rutinas:", error);
      setRoutineErrorMessage(
        error instanceof Error
          ? error.message
          : "No se pudieron generar las rutinas.",
      );
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
      setRoutineErrorMessage("");
      const token = await getAccessToken();
      const selectionPayload = {
        customName: routine.name,
        selectedIndex,
        sessionId: generatedSessionId,
      };

      await selectGeneratedRoutine(selectionPayload, token);

      setGeneratedRoutines([]);
      setGeneratedSessionId(null);
      setIsAiPanelOpen(false);
      await clearMiaGeneratedRoutineOptions();
      await loadRoutines();
      await loadRoutineLimits();
    } catch (error) {
      console.log("Error seleccionando rutina generada:", error);
      await clearMiaGeneratedRoutineOptions();
      setGeneratedRoutines([]);
      setGeneratedSessionId(null);
      setRoutineErrorMessage(
        error instanceof Error
          ? error.message
          : "No se pudo guardar la rutina generada. Genera nuevas opciones e intenta otra vez.",
      );
    } finally {
      setIsSelectingRoutine(false);
    }
  };

  const handleRoutineStatusChange = async (
    routineId: string,
    action: "activate" | "deactivate",
  ) => {
    try {
      setIsUpdatingRoutine(true);
      setRoutineErrorMessage("");

      const token = await getAccessToken();

      if (action === "activate") {
        await activateRoutine(routineId, token);
      } else {
        await deactivateRoutine(routineId, token);
      }

      await loadRoutines();
      await loadRoutineLimits();
    } catch (error) {
      console.log("Error actualizando estado de rutina:", error);
      setRoutineErrorMessage(
        error instanceof Error
          ? error.message
          : "No se pudo actualizar la rutina.",
      );
    } finally {
      setIsUpdatingRoutine(false);
    }
  };

  const mapBackendRoutineToScreenRoutine = (routine: BackendRoutine) => {
    return {
      // 💡 SI routine.id es null, le asigna un string único temporal basado en el nombre o un timestamp
      id:
        routine.id ??
        `temp-ia-${routine.name.replace(/\s+/g, "-").toLowerCase()}`,
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
        id: exercise.id ?? `temp-ex-${exercise.orderIndex}`, // Evita nulls también en ejercicios
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
      {routineLimits && (
        <View style={style.limitBox}>
          <CustomText type="button_secondary">Limite de rutinas</CustomText>
          <CustomText type="body_secondary">
            Activas: {routineLimits.activeRoutines}/
            {routineLimits.maxActiveRoutines} - Inactivas:{" "}
            {routineLimits.inactiveRoutines}
          </CustomText>
          {!routineLimits.canCreateRoutine && (
            <CustomText type="body_secondary">
              Desactiva una rutina antes de crear otra.
            </CustomText>
          )}
        </View>
      )}
      {!!routineErrorMessage && !isAiPanelOpen && (
        <CustomText type="body_secondary">{routineErrorMessage}</CustomText>
      )}
      <View style={style.routineList}>
        {routines.map((routine) => {
          const canChangeStatus = !routine.id.startsWith("temp-");

          return (
            <View key={routine.id} style={style.routineCardGroup}>
              <RoutineExpandableCard
                routine={routine}
                checkedExerciseIds={checkedExerciseIds}
                onToggleExercise={(exerciseId) =>
                  toggleExercise(routine.id, exerciseId)
                }
              />
              {selectedRoutineStatus !== "ALL" && canChangeStatus && (
                <CustomButton
                  disabled={isUpdatingRoutine}
                  isLoading={isUpdatingRoutine}
                  type="secondary"
                  onPress={() =>
                    handleRoutineStatusChange(
                      routine.id,
                      selectedRoutineStatus === "ACTIVE"
                        ? "deactivate"
                        : "activate",
                    )
                  }
                >
                  {selectedRoutineStatus === "ACTIVE"
                    ? "Desactivar"
                    : "Activar"}
                </CustomButton>
              )}
            </View>
          );
        })}
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
          {!!routineErrorMessage && (
            <CustomText type="body_secondary">
              {routineErrorMessage}
            </CustomText>
          )}
          <View style={style.aiSection}>
            <CustomText type="button_secondary">Grupos musculares</CustomText>
            <View style={style.chipRow}>
              {muscleGroupOptions.map((muscleGroup) => {
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
              {equipmentOptions.map((equipment) => {
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
              {difficultyOptions.map((difficulty) => {
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
            disabled={isSelectingRoutine || !routineLimits?.canCreateRoutine}
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
