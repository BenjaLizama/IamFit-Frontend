import React from "react";
import { View } from "react-native";
import { MainTabIconStyles as styles } from "./MainTabIcon.styles";
import { MainTabIconProps } from "./MainTabIcon.types";

export default function MainTabIcon({
  type,
  children,
  selected,
}: MainTabIconProps) {
  return (
    <View style={[styles.container, type ? styles[type] : null]}>
      {children}
      {selected ? <View style={styles.selected}></View> : null}
    </View>
  );
}
