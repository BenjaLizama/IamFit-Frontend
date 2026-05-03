import { Stack } from "expo-router";
import { Button, Text, View } from "react-native";

export function ErrorBoundary(props: any) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "red", fontWeight: "bold" }}>Error en IamFit:</Text>
      <Text>{props.error.message}</Text>
      <Button title="Intentar de nuevo" onPress={props.retry} />
    </View>
  );
}

export default function MainLayout() {
  return (
    <Stack
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
