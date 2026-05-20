import Wrapper from "@/src/core/components/Wrapper";
import MainTabBar from "@/src/core/Navigation";
import { COLOR } from "@/src/theme";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function MainLayout() {
  return (
    <Wrapper>
      <View style={{ flex: 1, width: "100%" }}>
        <Stack
          screenOptions={{
            animation: "none",
            contentStyle: {
              backgroundColor: COLOR.FONDO,
            },
            gestureEnabled: false,
            headerShown: false,
          }}
        />
      </View>
      <MainTabBar />
    </Wrapper>
  );
}
