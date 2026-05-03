import React from "react";
import { Animated, Pressable, Text, View } from "react-native";
import {
  INPUT_SELECTOR_OPTION_HEIGHT,
  InputSelectorStyles as styles,
} from "./InputSelector.styles";
import { InputSelectorOption, InputSelectorProps } from "./InputSelector.types";
import { useInputSelector } from "./useInputSelector";

const SelectorItem = ({
  option,
  index,
  scrollY,
  activeIndex,
  onSelect,
}: {
  option: InputSelectorOption;
  index: number;
  scrollY: Animated.Value;
  activeIndex: number;
  onSelect: (option: InputSelectorOption, index: number) => void;
}) => {
  const inputRange = [
    (index - 1.5) * INPUT_SELECTOR_OPTION_HEIGHT,
    (index - 1) * INPUT_SELECTOR_OPTION_HEIGHT,
    index * INPUT_SELECTOR_OPTION_HEIGHT,
    (index + 1) * INPUT_SELECTOR_OPTION_HEIGHT,
    (index + 1.5) * INPUT_SELECTOR_OPTION_HEIGHT,
  ];

  const scale = scrollY.interpolate({
    inputRange,
    outputRange: [0.6, 0.7, 1.2, 0.7, 0.6],
    extrapolate: "clamp",
  });

  const opacity = scrollY.interpolate({
    inputRange,
    outputRange: [0, 0.3, 1, 0.3, 0],
    extrapolate: "clamp",
  });

  return (
    <Pressable
      accessibilityRole="button"
      disabled={option.disabled}
      onPress={() => onSelect(option, index)}
      style={[styles.option, option.disabled && styles.optionDisabled]}
    >
      <Animated.Text
        style={[styles.label, { opacity, transform: [{ scale }] }]}
      >
        {option.label}
      </Animated.Text>

      {activeIndex === index && option.helperText ? (
        <Text style={styles.helperText}>{option.helperText}</Text>
      ) : null}
    </Pressable>
  );
};

export default function InputSelector(props: InputSelectorProps) {
  const {
    scrollRef,
    scrollY,
    activeIndex,
    selectorHeight,
    spacerHeight,
    handleScrollEnd,
    selectOption,
  } = useInputSelector(props);

  return (
    <View style={styles.accessibilityWrapper}>
      <View style={[styles.container, { height: selectorHeight }]}>
        <Animated.ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          snapToInterval={INPUT_SELECTOR_OPTION_HEIGHT}
          decelerationRate="normal"
          disableIntervalMomentum={false}
          bounces={true}
          alwaysBounceVertical={true}
          overScrollMode="always"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true },
          )}
          scrollEventThrottle={16}
          onMomentumScrollEnd={handleScrollEnd}
          onScrollEndDrag={handleScrollEnd}
        >
          <View style={{ height: spacerHeight }} />

          {props.options.map((option, index) => (
            <SelectorItem
              key={option.value}
              option={option}
              index={index}
              scrollY={scrollY}
              activeIndex={activeIndex}
              onSelect={selectOption}
            />
          ))}

          <View style={{ height: spacerHeight }} />
        </Animated.ScrollView>
      </View>
    </View>
  );
}
