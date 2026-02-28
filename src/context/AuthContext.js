import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useReq from "../hooks/useReq";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const {
    requestData: logoutRequest,
    response: logoutResponse,
    error: logoutError,
    loading: logoutLoading,
  } = useReq();

  /* -------------------- LOAD TOKEN ON APP START -------------------- */
  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("token");
      console.log("Loaded token:", token);
      setIsLoggedIn(!!token);
    };
    loadToken();
  }, []);

  /* -------------------- LOGIN -------------------- */
  const login = async (token, refreshToken) => {
    console.log("TTTTTTTTT", token)
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("refreshToken", refreshToken);
    setIsLoggedIn(true);
  };

const logout = async () => {
  const refreshToken = await AsyncStorage.getItem("refreshToken");

  // 🔥 LOGOUT LOCALLY FIRST
  await AsyncStorage.multiRemove(["token", "refreshToken"]);
  setIsLoggedIn(false);

  // 🔁 Try server logout (best effort)
  if (refreshToken) {
    logoutRequest("POST", "/auth/logout", { refreshToken });
  }
};


  /* -------------------- LOGOUT SUCCESS -------------------- */
  useEffect(() => {
    if (logoutResponse) {
      console.log("LOGOUT SUCCESS");

      AsyncStorage.multiRemove(["token", "refreshToken"]);
      setIsLoggedIn(false);
    }
  }, [logoutResponse]);

  /* -------------------- LOGOUT ERROR -------------------- */
  useEffect(() => {
    if (logoutError) {
      console.log("LOGOUT FAILED, FORCE LOGOUT");

      AsyncStorage.multiRemove(["token", "refreshToken"]);
      setIsLoggedIn(false);
    }
  }, [logoutError]);

  useEffect(() => {
  if (logoutError?.status === 403) {
    AsyncStorage.multiRemove(["token", "refreshToken"]);
    setIsLoggedIn(false);
  }
}, [logoutError]);



  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, logoutLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
