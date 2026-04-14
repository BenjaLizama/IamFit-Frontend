import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack
      initialRouteName="home"
      screenOptions={{
        headerShown: true,
        title: "IamFit",
      }}
    />
  );
}
