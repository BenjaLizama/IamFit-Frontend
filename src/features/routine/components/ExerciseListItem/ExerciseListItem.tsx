import CustomText from "@/src/core/components/CustomText";
import { COLOR } from "@/src/theme";
import React from "react";
import { View } from "react-native";
import { ExerciseListItemStyles as style } from "./ExerciseListItem.styles";
import { ExerciseListItemProps } from "./ExerciseListItem.types";
import { hp } from "@/src/core/utils";

export default function ExerciseListItem(props: ExerciseListItemProps) {
  const { name, rightItem, kind } = props;

  return (
    <View style={[style.container, props.checked && style.checkedContainer]}>
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

      {rightItem && <View style={style.rightItemContainer}>{rightItem}</View>}
    </View>
  );
}