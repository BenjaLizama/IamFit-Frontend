import { useState } from "react";
import {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
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

  const MAX_WIDTH = 500;
  const targetWidth = Math.min(SCREEN_WIDTH * 0.92, MAX_WIDTH);
  const targetHeight = SCREEN_HEIGHT * 0.85;

  const expand = (x: number, y: number, w: number, h: number) => {
    pos.value = { x, y, w, h };
    setIsExpanded(true);
    setIsVisible(false);
    progress.value = withSpring(1, { damping: 40, stiffness: 90, mass: 1 });
  };
  const collapse = () => {
    progress.value = withSpring(
      0,
      { damping: 40, stiffness: 100, mass: 0.4 },
      () => {
        runOnJS(setIsExpanded)(false);
        runOnJS(setIsVisible)(true);
      },
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    const finalTop = (SCREEN_HEIGHT - targetHeight) / 2;
    const finalLeft = (SCREEN_WIDTH - targetWidth) / 2;
    return {
      top: interpolate(progress.value, [0, 1], [pos.value.y, finalTop]),
      left: interpolate(progress.value, [0, 1], [pos.value.x, finalLeft]),
      width: interpolate(progress.value, [0, 1], [pos.value.w, targetWidth]),
      height: interpolate(progress.value, [0, 1], [pos.value.h, targetHeight]),
      borderRadius: interpolate(progress.value, [0, 1], [initialRadius, 20]),
      position: "absolute",
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
    backdropStyle,
    headerSmallStyle,
    headerLargeStyle,
    initialDims,
    expand,
    collapse,
    setInitialDims,
  };
};
