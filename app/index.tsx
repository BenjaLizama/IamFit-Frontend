import WelcomeScreen from "@/src/screens/Welcome";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function WelcomePage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("./login");
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  return <WelcomeScreen />;
}
