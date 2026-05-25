import { COLOR } from "@/src/theme/colors";
import React from "react";
import { View } from "react-native";
import CustomText from "../CustomText";
import { FilterInformationBoxStyles as styles } from "./FilterInformationBox.styles";
import { FilterInformationBoxProps } from "./FilterInformationBox.types";

export default function FilterInformationBox({
  children,
  color,
}: FilterInformationBoxProps) {
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <CustomText
        type="button_secondary"
        size={12}
        color={COLOR.FILTER_INFORMATION_BOX}
      >
        {children}
      </CustomText>
    </View>
  );
}
