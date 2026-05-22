import AddLogo from "@/assets/images/Icons/add.svg";
import FeedingLogo from "@/assets/images/Icons/chart.svg";
import HomeLogo from "@/assets/images/Icons/home.svg";
import PeopleLogo from "@/assets/images/Icons/people.svg";
import ProfileLogo from "@/assets/images/Icons/profile.svg";
import { COLOR } from "@/src/theme";
import * as Haptics from "expo-haptics";
import type { Href } from "expo-router";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import type { LayoutChangeEvent } from "react-native";
import { PanResponder, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import CustomText from "../components/CustomText";
import ExpandableScreen from "../components/ExpandableScreen";
import { MainTabBarStyles as styles } from "./MainTabBar.styles";
import MainTabIcon from "./components/MainTabIcon/MainTabIcon";

const MAIN_TABS: Href[] = [
  "/(main)/home",
  "/(main)/feeding",
  "/(main)/routine",
  "/(main)/profile",
];

const TOUCH_INDICATOR_SIZE = 59;
const VISUAL_SLOT_COUNT = 5;
const ROUTE_SLOT_INDEXES = [0, 1, 3, 4];
const TOUCH_INDICATOR_STICKINESS = 0.22;

export default function MainTabBar() {
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

  const touchIndicatorStyle = useAnimatedStyle(() => ({
    opacity: touchIndicatorOpacity.value,
    transform: [
      { translateX: touchIndicatorX.value - TOUCH_INDICATOR_SIZE / 2 },
      { scale: 0.9 + touchIndicatorOpacity.value * 0.1 },
      { scaleX: 1 + touchIndicatorStretch.value },
      { scaleY: 1 - touchIndicatorStretch.value * 0.24 },
      { skewX: `${touchIndicatorSkew.value}deg` },
    ],
  }));

  React.useEffect(() => {
    if (currentIndex !== -1) {
      selectedIndexRef.current = currentIndex;
    }
  }, [currentIndex]);

  const navigateToTab = (index: number) => {
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
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    setBarWidth(event.nativeEvent.layout.width);
    barRef.current?.measureInWindow((x) => {
      barPageX.current = x;
    });
  };

  const selectTabFromTouch = (pageX: number) => {
    if (!barWidth || isExpandableOpen) {
      return;
    }

    const locationX = getBarLocationX(pageX, barWidth, barPageX.current);
    const nextIndex = getRouteIndexFromTouch(locationX, barWidth);

    navigateToTab(nextIndex);
  };

  const showTouchIndicator = (pageX: number) => {
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
  };

  const hideTouchIndicator = () => {
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
  };

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
    [
      barWidth,
      isExpandableOpen,
      hideTouchIndicator,
      selectTabFromTouch,
      showTouchIndicator,
    ],
  );

  return (
    <View
      ref={barRef}
      onLayout={handleLayout}
      style={styles.container}
      {...panResponder.panHandlers}
    >
      <Animated.View
        pointerEvents="none"
        style={[styles.touchIndicator, touchIndicatorStyle]}
      >
        <View style={styles.touchIndicatorHighlight} />
        <View style={styles.touchIndicatorSpark} />
      </Animated.View>

      <MainTabIcon
        disabled={isExpandableOpen}
        href="/(main)/home"
        accessibilityLabel="Ir a inicio"
      >
        <HomeLogo width={24} height={24} fill={COLOR.FONDO} />
      </MainTabIcon>
      <MainTabIcon
        disabled={isExpandableOpen}
        href="/(main)/feeding"
        accessibilityLabel="Ir a alimentación"
      >
        <FeedingLogo width={24} height={24} fill={COLOR.FONDO} />
      </MainTabIcon>

      <ExpandableScreen
        top={-10}
        initialRadius={100}
        onExpandedChange={setIsExpandableOpen}
        children1={
          <MainTabIcon type="big">
            <AddLogo width={30} height={30} color={COLOR.AZUL_PRIMARIO} />
          </MainTabIcon>
        }
        children2={
          <>
            <CustomText type="body">Tu chat aqui</CustomText>
            <CustomText type="body">Tu chat aqui</CustomText>
            <CustomText type="body">Tu chat aqui</CustomText>
            <CustomText type="body">Tu chat aqui</CustomText>
            <CustomText type="body">Tu chat aqui</CustomText>
            <CustomText type="body">Tu chat aqui</CustomText>
            <CustomText type="body">Tu chat aqui</CustomText>
            <CustomText type="body">Tu chat aqui</CustomText>
            <CustomText type="body">Tu chat aqui</CustomText>
            <CustomText type="body">Tu chat aqui</CustomText>
            <CustomText type="body">Tu chat aqui</CustomText>
          </>
        }
        headerChildren={<CustomText type="h2">Habla con M.I.A</CustomText>}
      />

      <MainTabIcon
        disabled={isExpandableOpen}
        href="/(main)/routine"
        accessibilityLabel="Ir a rutina"
      >
        <PeopleLogo width={24} height={24} fill={COLOR.FONDO} />
      </MainTabIcon>
      <MainTabIcon
        disabled={isExpandableOpen}
        href="/(main)/profile"
        accessibilityLabel="Ir a perfil"
      >
        <ProfileLogo width={24} height={24} fill={COLOR.FONDO} />
      </MainTabIcon>
    </View>
  );
}

function normalizeHref(href: Href) {
  const stringHref = typeof href === "string" ? href : href.pathname;

  return stringHref.replace(/\/\([^)]+\)/g, "");
}

function clampNumber(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getBarLocationX(pageX: number, barWidth: number, barPageX: number) {
  return clampNumber(pageX - barPageX, 0, barWidth);
}

function getRouteIndexFromTouch(locationX: number, barWidth: number) {
  const visualSlotWidth = barWidth / VISUAL_SLOT_COUNT;
  let closestRouteIndex = 0;
  let closestDistance = Number.POSITIVE_INFINITY;

  ROUTE_SLOT_INDEXES.forEach((slotIndex, routeIndex) => {
    const routeCenter = slotIndex * visualSlotWidth + visualSlotWidth / 2;
    const distance = Math.abs(locationX - routeCenter);

    if (distance < closestDistance) {
      closestRouteIndex = routeIndex;
      closestDistance = distance;
    }
  });

  return closestRouteIndex;
}

function getMagnetizedIndicator(locationX: number, barWidth: number) {
  const visualSlotWidth = barWidth / VISUAL_SLOT_COUNT;
  const routeIndex = getRouteIndexFromTouch(locationX, barWidth);
  const tabCenter =
    ROUTE_SLOT_INDEXES[routeIndex] * visualSlotWidth + visualSlotWidth / 2;
  const pullDistance = locationX - tabCenter;
  const dropletX = locationX - pullDistance * TOUCH_INDICATOR_STICKINESS;
  const stretch = Math.min(Math.abs(pullDistance) / visualSlotWidth, 1) * 0.26;

  return {
    stretch,
    x: clampNumber(
      dropletX,
      TOUCH_INDICATOR_SIZE / 2,
      barWidth - TOUCH_INDICATOR_SIZE / 2,
    ),
  };
}

function getDropletSkew(locationX: number, barWidth: number) {
  const visualSlotWidth = barWidth / VISUAL_SLOT_COUNT;
  const routeIndex = getRouteIndexFromTouch(locationX, barWidth);
  const tabCenter =
    ROUTE_SLOT_INDEXES[routeIndex] * visualSlotWidth + visualSlotWidth / 2;
  const pullDistance = locationX - tabCenter;
  const pullProgress = clampNumber(pullDistance / visualSlotWidth, -1, 1);

  return pullProgress * 4;
}

function getRouteCenterX(routeIndex: number, barWidth: number) {
  const visualSlotWidth = barWidth / VISUAL_SLOT_COUNT;
  const slotIndex = ROUTE_SLOT_INDEXES[routeIndex] ?? ROUTE_SLOT_INDEXES[0];

  return slotIndex * visualSlotWidth + visualSlotWidth / 2;
}
