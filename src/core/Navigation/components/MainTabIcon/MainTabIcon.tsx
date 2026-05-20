import React from "react";
import { TouchableOpacity, View } from "react-native";
import { usePathname, useRouter } from "expo-router";
import { MainTabIconStyles as styles } from "./MainTabIcon.styles";
import { MainTabIconProps } from "./MainTabIcon.types";

export default function MainTabIcon({
  type,
  children,
  href,
  onPress,
  selected,
  accessibilityLabel,
}: MainTabIconProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isInteractive = Boolean(href || onPress);
  const isSelected = selected ?? (href ? isCurrentRoute(pathname, href) : false);
  const containerStyles = [styles.container, type ? styles[type] : null];
  const selectedIndicator = isSelected ? <View style={styles.selected} /> : null;

  const handlePress: MainTabIconProps["onPress"] = (event) => {
    onPress?.(event);

    if (href && !isSelected) {
      router.push(href);
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
    <TouchableOpacity
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      activeOpacity={0.8}
      onPress={handlePress}
      style={containerStyles}
    >
      {children}
      {selectedIndicator}
    </TouchableOpacity>
  );
}

function isCurrentRoute(pathname: string, href: MainTabIconProps["href"]) {
  return pathname === normalizeHref(href);
}

function normalizeHref(href: MainTabIconProps["href"]) {
  const stringHref = typeof href === "string" ? href : href?.pathname;

  return stringHref?.replace(/\/\([^)]+\)/g, "") ?? "";
}
