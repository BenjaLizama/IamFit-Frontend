import * as Haptics from "expo-haptics";
import React, { useRef } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
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
  variant = "default",
  keyboardVerticalOffset,
  showHeader = true,
  pressScale = 0.96,
}: ExpandableScreenProps) {
  const cardRef = useRef<View>(null);

  const {
    isExpanded,
    animatedStyle,
    backdropStyle,
    headerSmallStyle,
    headerLargeStyle,
    transitionContentStyle,
    bodyAnimatedStyle,
    initialDims,
    pressAnimationStyle,
    collapse,
    expand,
    setInitialDims,
    handlePressIn,
    handlePressOut,
  } = useExpandableScreen({
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    initialRadius,
    pressScale,
  });

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

  const effectiveKeyboardVerticalOffset = keyboardVerticalOffset ?? 0;
  const keyboardBehavior =
    Platform.OS === "ios" ? "padding" : variant === "chat" ? undefined : "height";

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
        <View style={styles.baseContent}>
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
            {showHeader && (
              <Pressable
                onPress={handleCollapse}
                style={[styles.header, { height: initialDims.h || "auto" }]}
              >
                <Animated.View
                  style={[
                    StyleSheet.absoluteFill,
                    styles.headerSmallContent,
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
            )}

            <Animated.View entering={FadeIn.delay(200)} style={styles.body}>
              <KeyboardAvoidingView
                behavior={keyboardBehavior}
                style={styles.bodyKeyboard}
                keyboardVerticalOffset={effectiveKeyboardVerticalOffset}
              >
                {variant === "chat" ? (
                  <Animated.View
                    style={[styles.bodyKeyboard, bodyAnimatedStyle]}
                  >
                    {children2}
                  </Animated.View>
                ) : (
                  <ScrollView
                    style={styles.bodyScroll}
                    contentContainerStyle={styles.bodyScrollContent}
                    keyboardShouldPersistTaps="handled"
                    automaticallyAdjustKeyboardInsets
                    showsVerticalScrollIndicator={false}
                  >
                    <Animated.View style={bodyAnimatedStyle}>
                      {children2}
                    </Animated.View>
                  </ScrollView>
                )}
              </KeyboardAvoidingView>
            </Animated.View>

            {!showHeader && (
              <Animated.View
                pointerEvents="none"
                style={[
                  StyleSheet.absoluteFill,
                  styles.headerSmallContent,
                  styles.transitionContent,
                  transitionContentStyle,
                ]}
              >
                {children1}
              </Animated.View>
            )}
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}
