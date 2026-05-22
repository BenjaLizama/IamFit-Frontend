import * as Haptics from "expo-haptics";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from "react-native";
import { INPUT_SELECTOR_OPTION_HEIGHT } from "./InputSelector.styles";
import { InputSelectorOption, InputSelectorProps } from "./InputSelector.types";

export function useInputSelector({
  options,
  value,
  onChange,
  maxVisibleOptions = 3,
}: InputSelectorProps) {
  const scrollRef = useRef<ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const initialIndex = Math.max(
    options.findIndex((option) => option.value === value),
    0,
  );
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const lastTickRef = useRef(initialIndex);

  const VISUAL_BUFFER = 40;
  const selectorHeight =
    INPUT_SELECTOR_OPTION_HEIGHT * maxVisibleOptions + VISUAL_BUFFER;
  const spacerHeight = (selectorHeight - INPUT_SELECTOR_OPTION_HEIGHT) / 2;

  useEffect(() => {
    const listenerId = scrollY.addListener(({ value }) => {
      const currentIndex = Math.round(value / INPUT_SELECTOR_OPTION_HEIGHT);

      if (
        currentIndex !== lastTickRef.current &&
        currentIndex >= 0 &&
        currentIndex < options.length
      ) {
        lastTickRef.current = currentIndex;

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    });

    return () => {
      scrollY.removeListener(listenerId);
    };
  }, [scrollY, options.length]);

  const isFirstRender = useRef(true);

  useEffect(() => {
    const targetIndex = options.findIndex((option) => option.value === value);
    if (targetIndex < 0) return;

    if (isFirstRender.current) {
      const timer = setTimeout(() => {
        scrollRef.current?.scrollTo({
          y: targetIndex * INPUT_SELECTOR_OPTION_HEIGHT,
          animated: false,
        });
        setActiveIndex(targetIndex);
        isFirstRender.current = false;
      }, 50);

      return () => clearTimeout(timer);
    } else {
      setActiveIndex((currentIndex) => {
        if (currentIndex !== targetIndex) {
          scrollRef.current?.scrollTo({
            y: targetIndex * INPUT_SELECTOR_OPTION_HEIGHT,
            animated: true,
          });
          return targetIndex;
        }
        return currentIndex;
      });
    }
  }, [value, options]);

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const nextIndex = Math.round(offsetY / INPUT_SELECTOR_OPTION_HEIGHT);
    const safeIndex = Math.min(Math.max(nextIndex, 0), options.length - 1);
    const nextOption = options[safeIndex];

    if (!nextOption) return;

    setActiveIndex(safeIndex);
    if (!nextOption.disabled && nextOption.value !== value) {
      onChange(nextOption.value, nextOption);
    }
  };

  const selectOption = (option: InputSelectorOption, index: number) => {
    if (option.disabled) return;
    scrollRef.current?.scrollTo({
      y: index * INPUT_SELECTOR_OPTION_HEIGHT,
      animated: true,
    });
  };

  return {
    scrollRef,
    scrollY,
    activeIndex,
    selectorHeight,
    spacerHeight,
    handleScrollEnd,
    selectOption,
  };
}
