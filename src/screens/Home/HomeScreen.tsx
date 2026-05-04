import MainTabBar from "@/src/core/components/Navigation/MainTabBar";
import Wrapper from "@/src/core/components/Wrapper";
import React from "react";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <Wrapper>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <MainTabBar />
      </View>
    </Wrapper>
  );
}
