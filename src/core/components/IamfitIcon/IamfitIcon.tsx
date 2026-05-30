import React from "react";
import { Image, View } from "react-native";
import { IamfitIconStyles as styles } from "./IamfitIcon.styles";

export default function IamfitIcon() {
  return (
    <View style={styles.shadowWrapper}>
      <Image source={require("@/assets/images/icon.png")} style={styles.icon} />
    </View>
  );
}
