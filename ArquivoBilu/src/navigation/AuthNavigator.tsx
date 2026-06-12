import { useState } from "react";
import { LoginScreen }    from "../screens/Auth/LoginScreen";
import { RegisterScreen } from "../screens/Auth/RegisterScreen";

export function AuthNavigator() {
  const [screen, setScreen] = useState<"login" | "register">("login");

  if (screen === "register") {
    return <RegisterScreen onGoLogin={() => setScreen("login")} />;
  }
  return <LoginScreen onGoRegister={() => setScreen("register")} />;
}