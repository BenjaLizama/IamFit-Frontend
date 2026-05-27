import * as Haptics from "expo-haptics";
import React, { useRef } from "react";
import { Dimensions, Modal, Pressable, StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { ExpandableScreenStyles as styles } from "./ExpandableScreen.styles";
import { ExpandableScreenProps } from "./ExpandableScreen.types";
import { useExpandableScreen } from "./useExpandableScreen";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function ExpandableScreen({
  children1,
  children2,
  headerChildren,
  initialRadius = 20,
  onExpandedChange,
  top = 0,
}: ExpandableScreenProps) {
  const cardRef = useRef<View>(null);

  const {
    isVisible,
    isExpanded,
    animatedStyle,
    backdropStyle,
    headerSmallStyle,
    headerLargeStyle,
    bodyAnimatedStyle,
    initialDims,
    pressAnimationStyle,
    collapse,
    expand,
    setInitialDims,
    handlePressIn,
    handlePressOut,
  } = useExpandableScreen({ SCREEN_WIDTH, SCREEN_HEIGHT, initialRadius });

  const onBaseLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setInitialDims({ w: width, h: height });
  };

  const handleExpand = () => {
    void Haptics.selectionAsync();
    onExpandedChange?.(true);

    cardRef.current?.measureInWindow((x, y, width, height) => {
      expand(x, y, width, height);
    });
  };

  const handleCollapse = () => {
    void Haptics.selectionAsync();
    onExpandedChange?.(false);
    collapse();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        ref={cardRef}
        collapsable={false}
        onLayout={onBaseLayout}
        style={[
          styles.baseCard,
          {
            borderRadius: initialRadius,
            ...(top && { top }),
          },
          pressAnimationStyle,
        ]}
      >
        <View style={{ opacity: isVisible ? 1 : 0 }}>
          <Pressable
            onPress={handleExpand}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            delayLongPress={150}
          >
            {children1}
          </Pressable>
        </View>
      </Animated.View>

      <Modal transparent visible={isExpanded} onRequestClose={handleCollapse}>
        <View style={styles.modalOverlay}>
          <Animated.View
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(300)}
            style={StyleSheet.absoluteFill}
          >
            <View style={StyleSheet.absoluteFill}>
              <Animated.View style={[styles.backdrop, backdropStyle]}>
                <Pressable style={{ flex: 1 }} onPress={handleCollapse} />
              </Animated.View>
            </View>
          </Animated.View>

          <Animated.View style={[styles.expandedCard, animatedStyle]}>
            <Pressable
              onPress={handleCollapse}
              style={[styles.header, { height: initialDims.h || "auto" }]}
            >
              <Animated.View
                style={[
                  StyleSheet.absoluteFill,
                  styles.centerContent,
                  headerSmallStyle,
                ]}
              >
                {children1}
              </Animated.View>
              <Animated.View style={headerLargeStyle}>
                {headerChildren || children1}
              </Animated.View>
            </Pressable>

            <Animated.View entering={FadeIn.delay(200)} style={styles.body}>
              <Animated.View style={bodyAnimatedStyle}>
                {children2}
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}
