import { ForgotPasswordNewScreen } from "@/src/screens/ForgotPassword";
import { useLocalSearchParams } from "expo-router";

export default function ForgotPasswordNewRoute() {
  const { email, resetToken } = useLocalSearchParams<{
    email: string;
    resetToken: string;
  }>();

  return (
    <ForgotPasswordNewScreen
      email={email ?? ""}
      resetToken={resetToken ?? ""}
    />
  );
}
