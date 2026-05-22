import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CustomCarouselStyles as styles } from "./CustomCarousel.styles";
import { CustomCarouselProps } from "./CustomCarousel.types";
import { useCustomCarousel } from "./useCustomCarousel";

export default function CustomCarousel({
  children,
  initialIndex = 0,
  mode = "default",
}: CustomCarouselProps) {
  const { initialContentOffset, scrollRef, INTERVAL } = useCustomCarousel({
    initialIndex,
  });
  const isCentered = mode === "centered";

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        ref={scrollRef}
        contentOffset={initialContentOffset}
        contentContainerStyle={[
          styles.contentContainer,
          isCentered
            ? styles.centeredContentContainer
            : styles.defaultContentContainer,
        ]}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={INTERVAL}
        snapToAlignment={isCentered ? "center" : "start"}
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
