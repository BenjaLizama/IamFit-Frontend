import CustomFormImput from "@/src/core/components/CustomFormInput";
import React from "react";
import { Text, View } from "react-native";

export default function AddFoodScreen() {
  return (
    <View>
      <CustomFormImput placeholder="Pollo a la plancha..."> </CustomFormImput>
      <Text>AddFoodScreen</Text>
    </View>
  );
}
