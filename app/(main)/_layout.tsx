import Wrapper from "@/src/core/components/Wrapper";
import MainTabBar from "@/src/core/Navigation";
import { Slot } from "expo-router";
import { View } from "react-native";

export default function MainLayout() {
  return (
    <Wrapper>
      <View style={{ flex: 1, width: "100%" }}>
        <Slot />
      </View>
      <MainTabBar />
    </Wrapper>
  );
}
