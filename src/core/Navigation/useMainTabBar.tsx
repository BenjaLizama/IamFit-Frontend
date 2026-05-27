import * as Haptics from "expo-haptics";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import type { LayoutChangeEvent, View } from "react-native";
import { PanResponder } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { MAIN_TABS, TOUCH_INDICATOR_SIZE } from "./MainTabBar.constants";
import type { MainTabBarState } from "./MainTabBar.types";
import {
  getBarLocationX,
  getDropletSkew,
  getMagnetizedIndicator,
  getRouteCenterX,
  getRouteIndexFromTouch,
  normalizeHref,
} from "./MainTabBar.utils";

export function useMainTabBar(): MainTabBarState & {
  touchIndicatorStyle: ReturnType<typeof useAnimatedStyle>;
} {
  const pathname = usePathname();
  const router = useRouter();
  const barRef = React.useRef<View>(null);
  const [isExpandableOpen, setIsExpandableOpen] = React.useState(false);
  const [barWidth, setBarWidth] = React.useState(0);
  const barPageX = React.useRef(0);
  const selectedIndexRef = React.useRef(0);
  const isTouchIndicatorVisible = React.useRef(false);
  const touchIndicatorOpacity = useSharedValue(0);
  const touchIndicatorX = useSharedValue(TOUCH_INDICATOR_SIZE / 2);
  const touchIndicatorStretch = useSharedValue(0);
  const touchIndicatorSkew = useSharedValue(0);

  const currentIndex = MAIN_TABS.findIndex(
    (href) => pathname === normalizeHref(href),
  );

  const touchIndicatorStyle = useAnimatedStyle(() => {
    const skewString = `${touchIndicatorSkew.value}deg`;

    return {
      opacity: touchIndicatorOpacity.value,
      transform: [
        { translateX: touchIndicatorX.value - TOUCH_INDICATOR_SIZE / 2 },
        { scale: 0.9 + touchIndicatorOpacity.value * 0.1 },
        { scaleX: 1 + touchIndicatorStretch.value },
        { scaleY: 1 - touchIndicatorStretch.value * 0.24 },
        { skewX: skewString },
      ],
    };
  });

  React.useEffect(() => {
    if (currentIndex !== -1) {
      selectedIndexRef.current = currentIndex;
    }
  }, [currentIndex]);

  const navigateToTab = React.useCallback(
    (index: number) => {
      if (
        isExpandableOpen ||
        index < 0 ||
        index >= MAIN_TABS.length ||
        index === selectedIndexRef.current
      ) {
        return;
      }

      selectedIndexRef.current = index;
      void Haptics.selectionAsync();
      router.replace(MAIN_TABS[index]);
    },
    [isExpandableOpen, router],
  );

  const handleLayout = React.useCallback((event: LayoutChangeEvent) => {
    setBarWidth(event.nativeEvent.layout.width);
    barRef.current?.measureInWindow((x) => {
      barPageX.current = x;
    });
  }, []);

  const selectTabFromTouch = React.useCallback(
    (pageX: number) => {
      if (!barWidth || isExpandableOpen) {
        return;
      }

      const locationX = getBarLocationX(pageX, barWidth, barPageX.current);
      const nextIndex = getRouteIndexFromTouch(locationX, barWidth);

      navigateToTab(nextIndex);
    },
    [barWidth, isExpandableOpen, navigateToTab],
  );

  const showTouchIndicator = React.useCallback(
    (pageX: number) => {
      if (!barWidth || isExpandableOpen) {
        return;
      }

      const locationX = getBarLocationX(pageX, barWidth, barPageX.current);
      const { x, stretch } = getMagnetizedIndicator(locationX, barWidth);

      if (!isTouchIndicatorVisible.current) {
        isTouchIndicatorVisible.current = true;
        touchIndicatorX.value = x;
      } else {
        touchIndicatorX.value = withSpring(x, {
          damping: 15,
          stiffness: 390,
          mass: 0.28,
        });
      }

      touchIndicatorOpacity.value = withTiming(1, { duration: 100 });
      touchIndicatorStretch.value = withSpring(stretch, {
        damping: 13,
        stiffness: 315,
        mass: 0.28,
      });
      touchIndicatorSkew.value = withSpring(getDropletSkew(locationX, barWidth), {
        damping: 14,
        stiffness: 270,
        mass: 0.3,
      });
    },
    [
      barWidth,
      isExpandableOpen,
      touchIndicatorOpacity,
      touchIndicatorSkew,
      touchIndicatorStretch,
      touchIndicatorX,
    ],
  );

  const hideTouchIndicator = React.useCallback(() => {
    isTouchIndicatorVisible.current = false;

    if (barWidth) {
      touchIndicatorX.value = withSpring(
        getRouteCenterX(selectedIndexRef.current, barWidth),
        {
          damping: 18,
          stiffness: 420,
          mass: 0.2,
        },
      );
    }

    touchIndicatorOpacity.value = withTiming(0, { duration: 210 });
    touchIndicatorStretch.value = withTiming(-0.18, { duration: 180 });
    touchIndicatorSkew.value = withTiming(0, { duration: 150 });
  }, [
    barWidth,
    touchIndicatorOpacity,
    touchIndicatorSkew,
    touchIndicatorStretch,
    touchIndicatorX,
  ]);

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => {
          if (isExpandableOpen) {
            return false;
          }

          return Math.abs(gestureState.dx) > 8 || Math.abs(gestureState.dy) > 8;
        },
        onPanResponderGrant: (event) => {
          showTouchIndicator(event.nativeEvent.pageX);
          selectTabFromTouch(event.nativeEvent.pageX);
        },
        onPanResponderMove: (event) => {
          showTouchIndicator(event.nativeEvent.pageX);
          selectTabFromTouch(event.nativeEvent.pageX);
        },
        onPanResponderRelease: hideTouchIndicator,
        onPanResponderTerminate: hideTouchIndicator,
      }),
    [hideTouchIndicator, isExpandableOpen, selectTabFromTouch, showTouchIndicator],
  );

  return {
    barRef,
    handleLayout,
    isExpandableOpen,
    panResponder,
    setIsExpandableOpen,
    touchIndicatorOpacity,
    touchIndicatorSkew,
    touchIndicatorStretch,
    touchIndicatorStyle,
    touchIndicatorX,
  };
}
