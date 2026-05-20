import { useMemo, useRef } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from "react-native";

let savedContentOffsetX: number | undefined;

export const useCustomCarousel = ({
  initialIndex = 0,
}: {
  initialIndex?: number;
}) => {
  const scrollRef = useRef<ScrollView>(null);
  const ITEM_WIDTH = 64;
  const GAP = 11;
  const INTERVAL = ITEM_WIDTH + GAP;
  const initialContentOffset = useMemo(
    () => ({
      x: savedContentOffsetX ?? initialIndex * INTERVAL,
      y: 0,
    }),
    [initialIndex, INTERVAL],
  );

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    savedContentOffsetX = event.nativeEvent.contentOffset.x;
  };

  return {
    handleScroll,
    initialContentOffset,
    scrollRef,
    INTERVAL,
  };
};
