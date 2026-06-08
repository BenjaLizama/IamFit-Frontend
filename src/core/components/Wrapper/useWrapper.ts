import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useWrapper = () => {
  const insets = useSafeAreaInsets();

  return {
    insets,
  };
};
