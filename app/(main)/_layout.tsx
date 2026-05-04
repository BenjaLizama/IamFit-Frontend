import MainTabBar from "@/src/core/components/Navigation/MainTabBar";
import Wrapper from "@/src/core/components/Wrapper";
import { Slot } from "expo-router";
import { View } from "react-native";

export default function MainLayout() {
  return (
    <Wrapper>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Slot />
        </View>
        <MainTabBar />
      </View>
    </Wrapper>
  );
}
