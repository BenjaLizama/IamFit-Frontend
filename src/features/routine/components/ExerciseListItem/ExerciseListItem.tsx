import CustomText from "@/src/core/components/CustomText";
import { hp } from "@/src/core/utils";
import { COLOR } from "@/src/theme";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ExerciseListItemStyles as style } from "./ExerciseListItem.styles";
import { ExerciseListItemProps } from "./ExerciseListItem.types";

export default function ExerciseListItem(props: ExerciseListItemProps) {
  const { name, kind, checked, onAction, rightItem } = props;

  return (
    <TouchableOpacity
      onPress={onAction}
      activeOpacity={0.7}
      style={[style.container, checked && style.checkedContainer]}
    >
      <View style={style.content}>
        <CustomText type="button_secondary" size={hp(15)}>
          {name}
        </CustomText>

        {kind === "weight" ? (
          <CustomText type="body" size={hp(13)} color={COLOR.TEXTO_TENUE}>
            {`${props.series} x ${props.reps} reps - ${props.weight} kg`}
          </CustomText>
        ) : (
          <CustomText type="body" size={hp(13)} color={COLOR.TEXTO_TENUE}>
            {`${props.time}${props.intensity ? ` - ${props.intensity}` : ""}`}
          </CustomText>
        )}
      </View>

      {rightItem && (
        <View pointerEvents="none" style={style.rightItemContainer}>
          {rightItem}
        </View>
      )}
    </TouchableOpacity>
  );
}
