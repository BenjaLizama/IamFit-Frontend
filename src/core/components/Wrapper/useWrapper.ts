import { useSafeAreaInsets } from "react-native-safe-area-context";

export const UseWrapper = () => {
  const insets = useSafeAreaInsets();

  return {
    insets,
  };
};
