import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import AuthStack from "./AuthStack";
import MainTabs from "./MainTabs";
import RootNavigator from "./RootNavigator";

export default function AppNavigator() {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn === null) return null; // Loading state

  return !isLoggedIn ? <RootNavigator  /> : <AuthStack />;
}
