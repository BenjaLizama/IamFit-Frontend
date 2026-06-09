import { ForgotPasswordOTPScreen } from "@/src/screens/ForgotPassword";
import { useLocalSearchParams } from "expo-router";

export default function ForgotPasswordOTPRoute() {
  const { email } = useLocalSearchParams<{ email: string }>();

  return <ForgotPasswordOTPScreen email={email ?? ""} />;
}
