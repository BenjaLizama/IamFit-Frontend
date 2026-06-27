import ExpandableScreen from "@/src/core/components/ExpandableScreen";
import DailyExerciseCard from "@/src/features/routine/components/DailyExerciseCard";
import ExerciseListItem from "@/src/features/routine/components/ExerciseListItem";
import React from "react";
import TestRenderer, { act } from "react-test-renderer";
import { describe, expect, it, vi } from "vitest";
import RoutineExpandableCard from "./RoutineExpandableCard";

vi.mock("@expo/vector-icons", () => ({
  Ionicons: (props: any) => React.createElement("mock-icon", props),
  AntDesign: (props: any) => React.createElement("mock-icon", props),
}));

// 1. Helper de renderizado seguro
const renderWithAct = (element: React.ReactElement): ReactTestRenderer => {
  let renderer: ReactTestRenderer | null = null;
  act(() => {
    renderer = TestRenderer.create(element);
  });
  if (!renderer) throw new Error("No se pudo renderizar");
  return renderer;
};

// 2. Mock de datos complejo para simular una rutina real
const mockRoutine: any = {
  id: "rutina-1",
  name: "Día de Piernas",
  description: "Enfoque en cuádriceps",
  checked: false,
  dayColor: "red",
  dayLabel: "L",
  imageVariant: "red",
  intensity: "Alta",
  summary: {
    estimatedTime: 45,
    totalExercises: 2,
    totalVolume: 5000,
  },
  exercises: [
    { id: "ex-1", name: "Sentadilla Libre", kind: "weight", series: 4, reps: 10 },
    { id: "ex-2", name: "Prensa", kind: "weight", series: 3, reps: 12 },
  ],
};

describe("RoutineExpandableCard", () => {
  const baseProps = {
    routine: mockRoutine,
    checkedExerciseIds: [],
    onToggleExercise: vi.fn(),
  };

  it("renderiza el ExpandableScreen con la tarjeta diaria básica en children1", () => {
    const renderer = renderWithAct(<RoutineExpandableCard {...baseProps} />);
    
    // Buscamos el componente ExpandableScreen
    const expandableScreen = renderer.root.findByType(ExpandableScreen);
    expect(expandableScreen).toBeDefined();

    // Verificamos que el children1 sea un DailyExerciseCard y reciba el nombre correcto
    const children1 = expandableScreen.props.children1;
    expect(children1.type).toBe(DailyExerciseCard);
    expect(children1.props.exerciseName).toBe("Día de Piernas");
    expect(children1.props.estimatedTimeMin).toBe(45);
  });

  it("renderiza la lista de ejercicios en children2 mapeando el arreglo", () => {
    const renderer = renderWithAct(<RoutineExpandableCard {...baseProps} />);
    
    // 1. Buscamos el ExpandableScreen
    const expandableScreen = renderer.root.findByType(ExpandableScreen);
    
    // 2. ¡TRUCO! Renderizamos aisladamente SOLO el contenido de children2
    const detailRenderer = renderWithAct(expandableScreen.props.children2);
    
    // 3. Ahora buscamos dentro de nuestro detalle aislado
    const exerciseItems = detailRenderer.root.findAllByType(ExerciseListItem);
    
    expect(exerciseItems.length).toBe(2);
    expect(exerciseItems[0].props.name).toBe("Sentadilla Libre");
    expect(exerciseItems[1].props.name).toBe("Prensa");
  });

  it("marca los ejercicios como checked si su ID compuesto está en checkedExerciseIds", () => {
    const renderer = renderWithAct(
      <RoutineExpandableCard 
        {...baseProps} 
        checkedExerciseIds={["rutina-1-ex-1"]} 
      />
    );
    
    const expandableScreen = renderer.root.findByType(ExpandableScreen);
    const detailRenderer = renderWithAct(expandableScreen.props.children2);
    
    const exerciseItems = detailRenderer.root.findAllByType(ExerciseListItem);
    
    expect(exerciseItems[0].props.checked).toBe(true);
    expect(exerciseItems[1].props.checked).toBe(false);
  });

  it("dispara onToggleExercise con el ID correcto al accionar un ejercicio", () => {
    const onToggleMock = vi.fn();
    const renderer = renderWithAct(
      <RoutineExpandableCard {...baseProps} onToggleExercise={onToggleMock} />
    );
    
    const expandableScreen = renderer.root.findByType(ExpandableScreen);
    const detailRenderer = renderWithAct(expandableScreen.props.children2);
    
    const exerciseItems = detailRenderer.root.findAllByType(ExerciseListItem);
    
    act(() => {
      exerciseItems[0].props.onAction();
    });

    expect(onToggleMock).toHaveBeenCalledWith("ex-1");
    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });
});