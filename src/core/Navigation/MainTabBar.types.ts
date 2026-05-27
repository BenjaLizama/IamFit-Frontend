import type { PanResponderInstance } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import type React from "react";

export interface MainTabBarState {
  barRef: React.RefObject<import("react-native").View | null>;
  isExpandableOpen: boolean;
  setIsExpandableOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleLayout: (event: import("react-native").LayoutChangeEvent) => void;
  panResponder: PanResponderInstance;
  touchIndicatorOpacity: SharedValue<number>;
  touchIndicatorSkew: SharedValue<number>;
  touchIndicatorStretch: SharedValue<number>;
  touchIndicatorX: SharedValue<number>;
}
