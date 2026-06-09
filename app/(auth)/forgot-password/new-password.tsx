import { ForgotPasswordNewScreen } from "@/src/screens/ForgotPassword";
import { useLocalSearchParams } from "expo-router";

export default function ForgotPasswordNewRoute() {
  const { email, code } = useLocalSearchParams<{
    email: string;
    code: string;
  }>();

  return <ForgotPasswordNewScreen email={email ?? ""} code={code ?? ""} />;
}
