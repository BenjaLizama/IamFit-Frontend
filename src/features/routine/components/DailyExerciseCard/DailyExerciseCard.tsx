import CustomText from "@/src/core/components/CustomText";
import { COLOR } from "@/src/theme";
import { Image, View } from "react-native";
import { DailyExcerciseCardStyles as styles } from "./DailyExerciseCard.styles";
import { DailyExcerciseCardProps } from "./DailyExerciseCard.types";

export default function DailyExerciseCard({
  excerciseName,
  description,
  estimatedTimeMin,
  pathImage,
  intensity,
  rightElement,
}: DailyExcerciseCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: pathImage }} />
      </View>
      <View style={styles.content}>
        <CustomText type={"body"} size={15}>
          {excerciseName}
        </CustomText>
        <CustomText type={"body"} size={13} color={COLOR.TEXTO_SECUNDARIO}>
          {description}
        </CustomText>
        {estimatedTimeMin && (
          <CustomText type={"body"} size={12}>
            {"tiempo estimado: " + String(estimatedTimeMin) + " minutos"}
          </CustomText>
        )}
        {intensity && (
          <CustomText type={"body"} size={12}>
            {intensity}
          </CustomText>
        )}
      </View>
      {rightElement && <View style={styles.dayContainer}>{rightElement}</View>}
    </View>
  );
}
