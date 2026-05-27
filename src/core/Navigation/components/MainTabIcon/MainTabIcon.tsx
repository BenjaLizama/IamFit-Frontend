import { TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { MainTabIconStyles as styles } from "./MainTabIcon.styles";
import { MainTabIconProps } from "./MainTabIcon.types";
import { useMainTabIcon } from "./useMainTabIcon";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export default function MainTabIcon({
  type,
  children,
  disabled,
  href,
  onPress,
  selected,
  accessibilityLabel,
}: MainTabIconProps) {
  const { animatedStyle, handlePress, isInteractive, isSelected } =
    useMainTabIcon({
      disabled,
      href,
      onPress,
      selected,
    });
  const containerStyles = [styles.container, type ? styles[type] : null];
  const selectedIndicator = isSelected ? <View style={styles.selected} /> : null;

  if (!isInteractive) {
    return (
      <View style={containerStyles}>
        {children}
        {selectedIndicator}
      </View>
    );
  }

  return (
    <AnimatedTouchableOpacity
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      activeOpacity={0.8}
      disabled={disabled}
      onPress={handlePress}
      style={[containerStyles, animatedStyle]}
    >
      {children}
      {selectedIndicator}
    </AnimatedTouchableOpacity>
  );
}
