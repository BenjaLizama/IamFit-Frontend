import React from "react";
import { Image, View } from "react-native";
import { IamfitIconStyles as styles } from "./IamfitIcon.styles";
import { IamfitIconProps } from "./IamfitIcon.types";

export default function IamfitIcon({ size }: IamfitIconProps) {
  return (
    <View style={styles.shadowWrapper}>
      <Image
        source={require("@/assets/images/icon.png")}
        style={styles.icon}
        height={size}
        width={size}
      />
    </View>
  );
}
