import AddLogo from "@/assets/images/Icons/add.svg";
import FeedingLogo from "@/assets/images/Icons/chart.svg";
import HomeLogo from "@/assets/images/Icons/home.svg";
import PeopleLogo from "@/assets/images/Icons/people.svg";
import ProfileLogo from "@/assets/images/Icons/profile.svg";
import { COLOR } from "@/src/theme";
import React from "react";
import { View } from "react-native";
import CustomText from "../components/CustomText";
import ExpandableScreen from "../components/ExpandableScreen";
import { MainTabBarStyles as styles } from "./MainTabBar.styles";
import MainTabIcon from "./components/MainTabIcon/MainTabIcon";

export default function MainTabBar() {
  return (
    <View style={styles.container}>
      <MainTabIcon href="/(main)/home" accessibilityLabel="Ir a inicio">
        <HomeLogo width={24} height={24} fill={COLOR.FONDO} />
      </MainTabIcon>
      <MainTabIcon
        href="/(main)/feeding"
        accessibilityLabel="Ir a alimentación"
      >
        <FeedingLogo width={24} height={24} fill={COLOR.FONDO} />
      </MainTabIcon>

      <ExpandableScreen
        top={-10}
        initialRadius={100}
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

      <MainTabIcon href="/(main)/routine" accessibilityLabel="Ir a rutina">
        <PeopleLogo width={24} height={24} fill={COLOR.FONDO} />
      </MainTabIcon>
      <MainTabIcon href="/(main)/profile" accessibilityLabel="Ir a perfil">
        <ProfileLogo width={24} height={24} fill={COLOR.FONDO} />
      </MainTabIcon>
    </View>
  );
}
