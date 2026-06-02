import { COLOR } from "@/src/theme";
import { Routine } from "../types/RoutineScreen.types";

export const MOCK_ROUTINES: Routine[] = [
  {
    id: "pecho-triceps-a",
    name: "Pecho + Triceps A",
    description: "6 ejercicios",
    dayLabel: "Hoy",
    dayColor: COLOR.AZUL_PRIMARIO,
    imageVariant: "blue",
    checked: false,
    summary: {
      equipment: "Mancuernas, barra",
      exerciseCount: 6,
      level: "Intermedio",
      nextSessionLabel: "Hoy",
      estimatedTime: 45,
    },
    exercises: [
      {
        id: "press-banca-plano",
        kind: "weight",
        name: "Press banca plano",
        series: 4,
        reps: 10,
        weight: 60,
      },
      {
        id: "press-inclinado-mancuernas",
        kind: "weight",
        name: "Press inclinado mancuernas",
        series: 3,
        reps: 12,
        weight: 22,
      },
      {
        id: "aperturas-mancuernas",
        kind: "weight",
        name: "Aperturas con mancuernas",
        series: 3,
        reps: 15,
        weight: 16,
      },
      {
        id: "extension-triceps-polea",
        kind: "weight",
        name: "Extension triceps polea",
        series: 4,
        reps: 12,
        weight: 30,
      },
    ],
  },
  {
    id: "cardio-hiit",
    name: "Cardio HIIT",
    description: "4 bloques",
    intensity: "alta intensidad",
    dayLabel: "Mie",
    dayColor: COLOR.SUCCESS,
    imageVariant: "red",
    checked: true,
    summary: {
      equipment: "Cinta, cuerda",
      exerciseCount: 4,
      level: "Alto",
      nextSessionLabel: "Mie",
      estimatedTime: 20,
    },
    exercises: [
      {
        id: "sprints",
        kind: "cardio",
        name: "Sprints por intervalos",
        time: "8 rondas",
        intensity: "alta intensidad",
      },
      {
        id: "burpees",
        kind: "cardio",
        name: "Burpees",
        time: "4 bloques",
        intensity: "12 reps",
      },
    ],
  },
];
