import { useEffect, useRef } from "react";
import { ScrollView } from "react-native";

export const useCustomCarousel = ({
  initialIndex = 0,
}: {
  initialIndex?: number;
}) => {
  const scrollRef = useRef<ScrollView>(null);
  const ITEM_WIDTH = 64;
  const GAP = 13;
  const INTERVAL = ITEM_WIDTH + GAP;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          x: initialIndex * INTERVAL,
          animated: false,
        });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [initialIndex, INTERVAL]);

  return {
    scrollRef,
    INTERVAL,
  };
};
