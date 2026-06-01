import * as Haptics from "expo-haptics";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import type { GestureResponderEvent } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { MainTabIconProps } from "./MainTabIcon.types";
import { isCurrentRoute } from "./MainTabIcon.utils";

export function useMainTabIcon({
  disabled,
  href,
  onPress,
  selected,
}: Pick<MainTabIconProps, "disabled" | "href" | "onPress" | "selected">) {
  const router = useRouter();
  const pathname = usePathname();
  const scale = useSharedValue(1);
  const isInteractive = Boolean(href || onPress);
  const isSelected = selected ?? (href ? isCurrentRoute(pathname, href) : false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const triggerFeedback = React.useCallback(() => {
    void Haptics.selectionAsync();

    scale.value = withSequence(
      withTiming(0.96, { duration: 80 }),
      withSpring(1, { damping: 14, stiffness: 260, mass: 0.5 }),
    );
  }, [scale]);

  const handlePress: MainTabIconProps["onPress"] = React.useCallback(
    (event: GestureResponderEvent) => {
      if (disabled) {
        return;
      }

      onPress?.(event);

      if (href && !isSelected) {
        triggerFeedback();
        router.replace(href);
      }
    },
    [disabled, href, isSelected, onPress, router, triggerFeedback],
  );

  return {
    animatedStyle,
    handlePress,
    isInteractive,
    isSelected,
  };
}
