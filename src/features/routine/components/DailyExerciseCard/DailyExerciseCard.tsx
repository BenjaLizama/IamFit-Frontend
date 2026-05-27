import CustomText from "@/src/core/components/CustomText";
import { COLOR } from "@/src/theme";
import { Image, View } from "react-native";
import { DailyExerciseCardStyles as styles } from "./DailyExerciseCard.styles";
import { DailyExerciseCardProps } from "./DailyExerciseCard.types";

export default function DailyExerciseCard({
  exerciseName,
  description,
  estimatedTimeMin,
  pathImage,
  intensity,
  rightElement,
}: DailyExerciseCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: pathImage }} />
      </View>
      <View style={styles.content}>
        <CustomText type="button_secondary" size={15} style={styles.titleText}>
          {exerciseName}
        </CustomText>

        <CustomText
          type="body"
          size={12}
          color={COLOR.TEXTO_SECUNDARIO}
          style={styles.detailText}
        >
          {estimatedTimeMin
            ? `${description} - ${estimatedTimeMin} min estimados`
            : description}
        </CustomText>

        {intensity && (
          <CustomText
            type="body"
            size={12}
            color={COLOR.TEXTO_SECUNDARIO}
            style={styles.detailText}
          >
            {intensity}
          </CustomText>
        )}
      </View>
      {rightElement && <View style={styles.dayContainer}>{rightElement}</View>}
    </View>
  );
}
