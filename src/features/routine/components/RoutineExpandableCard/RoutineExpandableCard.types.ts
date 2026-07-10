import { Routine } from "@/src/features/routine/types/RoutineScreen.types";

export interface RoutineExpandableCardProps {
  routine: Routine;
  checkedExerciseIds: string[];
  onToggleExercise: (exerciseId: string) => void;
  isFinishingSession?: boolean;
  isSessionLoading?: boolean;
  onFinishSession?: () => void;
  onStartSession?: () => void;
  sessionProgressLabel?: string;
}
