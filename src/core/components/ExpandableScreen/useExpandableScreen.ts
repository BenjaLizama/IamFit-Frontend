import { useState } from "react";
import {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface useExpandableScreenProps {
  SCREEN_HEIGHT: number;
  SCREEN_WIDTH: number;
  initialRadius: number;
}

export const useExpandableScreen = ({
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  initialRadius,
}: useExpandableScreenProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [initialDims, setInitialDims] = useState({ w: 0, h: 0 });

  const progress = useSharedValue(0);
  const pos = useSharedValue({ x: 0, y: 0, w: 0, h: 0 });
  const pressScale = useSharedValue(1);

  const MAX_WIDTH = 500;
  const targetWidth = Math.min(SCREEN_WIDTH * 0.92, MAX_WIDTH);
  const targetHeight = SCREEN_HEIGHT * 0.85;

  const expand = (x: number, y: number, w: number, h: number) => {
    pos.value = { x, y, w, h };
    setIsExpanded(true);
    setIsVisible(false);
    progress.value = withSpring(1, { damping: 40, stiffness: 150, mass: 0.5 });
  };

  const collapse = () => {
    setIsVisible(true);

    progress.value = withSpring(
      0,
      {
        damping: 50, // Valor alto = Cero rebote
        stiffness: 90, // Menos rígido para que sea suave
        mass: 0.1, // Masa estándar para evitar aceleraciones raras
      },
      (finished) => {
        if (finished) {
          runOnJS(setIsExpanded)(false);
        }
      },
    );
  };

  const pressAnimationStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value }],
  }));

  const handlePressIn = () => {
    pressScale.value = withSpring(0.96, {
      damping: 10,
      stiffness: 200,
      mass: 0.6,
    });
  };

  const handlePressOut = () => {
    pressScale.value = withTiming(1, { duration: 150 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    const finalTop = (SCREEN_HEIGHT - targetHeight) / 2;
    const finalLeft = (SCREEN_WIDTH - targetWidth) / 2;
    return {
      opacity: interpolate(progress.value, [0, 1], [1, 1], Extrapolation.CLAMP),
      top: interpolate(progress.value, [0, 1], [pos.value.y, finalTop]),
      left: interpolate(progress.value, [0, 1], [pos.value.x, finalLeft]),
      width: interpolate(progress.value, [0, 1], [pos.value.w, targetWidth]),
      height: interpolate(progress.value, [0, 1], [pos.value.h, targetHeight]),
      borderRadius: interpolate(progress.value, [0, 1], [initialRadius, 20]),
      position: "absolute",
    };
  });

  const bodyAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        progress.value,
        [0.4, 1],
        [0, 1],
        Extrapolation.CLAMP,
      ),
    };
  });

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  const headerSmallStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      progress.value,
      [0, 0.25],
      [1, 0],
      Extrapolation.CLAMP,
    ),
    transform: [{ scale: interpolate(progress.value, [0, 0.5], [1, 0.9]) }],
  }));

  const headerLargeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      progress.value,
      [0.4, 0.9],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  }));

  return {
    isVisible,
    isExpanded,
    animatedStyle,
    bodyAnimatedStyle,
    backdropStyle,
    headerSmallStyle,
    headerLargeStyle,
    initialDims,
    pressAnimationStyle,
    expand,
    collapse,
    setInitialDims,
    handlePressIn,
    handlePressOut,
  };
};
