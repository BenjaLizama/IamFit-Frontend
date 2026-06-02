import CustomText from "@/src/core/components/CustomText";
import { hp } from "@/src/core/utils";
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
  leftElement,
  imageVariant = "default",
}: DailyExerciseCardProps) {
  const imageVariantStyle = {
    default: null,
    blue: styles.imageContainerBlue,
    red: styles.imageContainerRed,
    purple: styles.imageContainerPurple,
  }[imageVariant];

  return (
    <View style={styles.container}>
      <View style={[styles.imageContainer, imageVariantStyle]}>
        {leftElement
          ? leftElement
          : pathImage && (
              <Image style={styles.image} source={{ uri: pathImage }} />
            )}
      </View>
      <View style={styles.content}>
        <CustomText
          type="button_secondary"
          size={hp(15)}
          style={styles.titleText}
        >
          {exerciseName}
        </CustomText>

        <CustomText
          type="body"
          size={hp(12)}
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
            size={hp(12)}
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
