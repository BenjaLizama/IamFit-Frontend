import SuccessResult from "@/src/core/components/SuccessResult";
import { router } from "expo-router";
import { View } from "react-native";

export default function ForgotPasswordSuccessRoute() {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <SuccessResult
        title={"Tu contrasena ha\nsido actualizada"}
        buttonLabel="Ir al inicio"
        onPress={() => router.replace("/login")}
      />
    </View>
  );
}
