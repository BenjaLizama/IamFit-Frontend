import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CustomCarouselStyles as styles } from "./CustomCarousel.styles";
import { CustomCarouselProps } from "./CustomCarousel.types";
import { useCustomCarousel } from "./useCustomCarousel";

export default function CustomCarousel({
  children,
  initialIndex = 7,
}: CustomCarouselProps & { initialIndex?: number }) {
  const { scrollRef, INTERVAL } = useCustomCarousel({ initialIndex });

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        ref={scrollRef}
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={INTERVAL}
        snapToAlignment="center"
        disableIntervalMomentum={true}
        renderToHardwareTextureAndroid={true}
        snapToOffsets={Array.from(
          Array(React.Children.count(children)).keys(),
        ).map((i) => i * INTERVAL)}
      >
        {children}
      </ScrollView>
    </View>
  );
}
