import React from "react";
import { TouchableOpacity, View } from "react-native";
import { usePathname, useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { MainTabIconStyles as styles } from "./MainTabIcon.styles";
import { MainTabIconProps } from "./MainTabIcon.types";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export default function MainTabIcon({
  type,
  children,
  disabled,
  href,
  onPress,
  selected,
  accessibilityLabel,
}: MainTabIconProps) {
  const router = useRouter();
  const pathname = usePathname();
  const scale = useSharedValue(1);
  const isInteractive = Boolean(href || onPress);
  const isSelected = selected ?? (href ? isCurrentRoute(pathname, href) : false);
  const containerStyles = [styles.container, type ? styles[type] : null];
  const selectedIndicator = isSelected ? <View style={styles.selected} /> : null;
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const triggerFeedback = () => {
    void Haptics.selectionAsync();

    scale.value = withSequence(
      withTiming(0.96, { duration: 80 }),
      withSpring(1, { damping: 14, stiffness: 260, mass: 0.5 }),
    );
  };

  const handlePress: MainTabIconProps["onPress"] = (event) => {
    if (disabled) {
      return;
    }

    onPress?.(event);

    if (href && !isSelected) {
      triggerFeedback();
      router.replace(href);
    }
  };

  if (!isInteractive) {
    return (
      <View style={containerStyles}>
        {children}
        {selectedIndicator}
      </View>
    );
  }

  return (
    <AnimatedTouchableOpacity
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      activeOpacity={0.8}
      disabled={disabled}
      onPress={handlePress}
      style={[containerStyles, animatedStyle]}
    >
      {children}
      {selectedIndicator}
    </AnimatedTouchableOpacity>
  );
}

function isCurrentRoute(pathname: string, href: MainTabIconProps["href"]) {
  return pathname === normalizeHref(href);
}

function normalizeHref(href: MainTabIconProps["href"]) {
  const stringHref = typeof href === "string" ? href : href?.pathname;

  return stringHref?.replace(/\/\([^)]+\)/g, "") ?? "";
}
