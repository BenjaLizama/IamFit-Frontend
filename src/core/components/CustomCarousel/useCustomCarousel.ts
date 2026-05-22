import { useMemo, useRef } from "react";
import { ScrollView } from "react-native";

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
      x: initialIndex * INTERVAL,
      y: 0,
    }),
    [initialIndex, INTERVAL],
  );

  return {
    initialContentOffset,
    scrollRef,
    INTERVAL,
  };
};
