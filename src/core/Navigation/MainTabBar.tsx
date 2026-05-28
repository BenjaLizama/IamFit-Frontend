import AiLogo from "@/assets/images/Icons/ai-commentary.svg";
import FeedingLogo from "@/assets/images/Icons/chart.svg";
import HomeLogo from "@/assets/images/Icons/home.svg";
import PeopleLogo from "@/assets/images/Icons/people.svg";
import ProfileLogo from "@/assets/images/Icons/profile.svg";
import ExpandableScreen from "@/src/core/components/ExpandableScreen";
import MiaHeader from "@/src/features/(m.i.a)/layout/MiaHeader";
import MiaChatScreen from "@/src/features/(m.i.a)/screens/MiaChatScreen";
import { COLOR } from "@/src/theme";
import React from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { MainTabBarStyles as styles } from "./MainTabBar.styles";
import MainTabIcon from "./components/MainTabIcon/MainTabIcon";
import { useMainTabBar } from "./useMainTabBar";

export default function MainTabBar() {
  const {
    barRef,
    handleLayout,
    isExpandableOpen,
    panResponder,
    setIsExpandableOpen,
    touchIndicatorStyle,
  } = useMainTabBar();
  const touchIndicatorBaseStyle = styles.touchIndicator as unknown as object;

  return (
    <View
      ref={barRef}
      onLayout={handleLayout}
      style={styles.container}
      {...panResponder.panHandlers}
    >
      <View pointerEvents="none" style={styles.touchIndicatorHost}>
        <View style={styles.touchIndicatorMask}>
          <Animated.View style={[touchIndicatorBaseStyle, touchIndicatorStyle]}>
            <View style={styles.touchIndicatorHighlight} />
            <View style={styles.touchIndicatorSpark} />
          </Animated.View>
        </View>
      </View>

      <MainTabIcon
        accessibilityLabel="Ir a inicio"
        disabled={isExpandableOpen}
        href="/(main)/home"
      >
        <HomeLogo fill={COLOR.FONDO} height={24} width={24} />
      </MainTabIcon>
      <MainTabIcon
        accessibilityLabel="Ir a alimentación"
        disabled={isExpandableOpen}
        href="/(main)/feeding"
      >
        <FeedingLogo fill={COLOR.FONDO} height={24} width={24} />
      </MainTabIcon>

      <ExpandableScreen
        children1={
          <MainTabIcon type="big">
            <AiLogo color={COLOR.AZUL_PRIMARIO} height={30} width={30} />
          </MainTabIcon>
        }
        children2={<MiaChatScreen />}
        headerChildren={<MiaHeader />}
        initialRadius={100}
        onExpandedChange={setIsExpandableOpen}
        top={-10}
        variant="chat"
        keyboardVerticalOffset={125}
      />

      <MainTabIcon
        accessibilityLabel="Ir a rutina"
        disabled={isExpandableOpen}
        href="/(main)/routine"
      >
        <PeopleLogo fill={COLOR.FONDO} height={24} width={24} />
      </MainTabIcon>
      <MainTabIcon
        accessibilityLabel="Ir a perfil"
        disabled={isExpandableOpen}
        href="/(main)/profile"
      >
        <ProfileLogo fill={COLOR.FONDO} height={24} width={24} />
      </MainTabIcon>
    </View>
  );
}
