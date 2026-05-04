import AddLogo from "@/assets/images/Icons/add.svg";
import StatisticsLogo from "@/assets/images/Icons/chart.svg";
import HomeLogo from "@/assets/images/Icons/home.svg";
import PeopleLogo from "@/assets/images/Icons/people.svg";
import ProfileLogo from "@/assets/images/Icons/profile.svg";
import { COLOR } from "@/src/theme";
import React from "react";
import { View } from "react-native";
import { MainTabBarStyles as styles } from "./MainTabBar.styles";
import MainTabIcon from "./components/MainTabIcon/MainTabIcon";

export default function MainTabBar() {
  return (
    <View style={styles.container}>
      <MainTabIcon selected={true}>
        <HomeLogo width={24} height={24} fill={COLOR.FONDO} />
      </MainTabIcon>
      <MainTabIcon selected={false}>
        <StatisticsLogo width={24} height={24} fill={COLOR.FONDO} />
      </MainTabIcon>

      <MainTabIcon selected={false} type="big">
        <AddLogo width={30} height={30} color={COLOR.AZUL_PRIMARIO} />
      </MainTabIcon>

      <MainTabIcon selected={false}>
        <PeopleLogo width={24} height={24} fill={COLOR.FONDO} />
      </MainTabIcon>
      <MainTabIcon selected={false}>
        <ProfileLogo width={24} height={24} fill={COLOR.FONDO} />
      </MainTabIcon>
    </View>
  );
}
