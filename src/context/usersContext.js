import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const UsersContext = createContext(null);

export function UsersProvider({ children }) {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ===============================
     LOAD TOKEN ON APP START
  =============================== */
  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.log("Token load error", err);
      } finally {
        setLoading(false);
      }
    };

    loadToken();
  }, []);

  /* ===============================
     LOGIN
  =============================== */
  const login = async (newToken) => {
    try {
      await AsyncStorage.setItem("token", newToken);
      setToken(newToken);
      setIsLoggedIn(true);
    } catch (err) {
      console.log("Login error", err);
    }
  };

  /* ===============================
     LOGOUT (used by useReq)
  =============================== */
  const logout = async () => {
    try {
      await AsyncStorage.clear();
    } catch (err) {
      console.log("Logout error", err);
    } finally {
      setToken(null);
      setIsLoggedIn(false);
    }
  };

  /* ===============================
     GLOBAL ALERT
  =============================== */
  const showAlert = (message, title = "Alert") => {
    Alert.alert(title, message);
  };

  return (
    <UsersContext.Provider
      value={{
        token,
        setToken,
        isLoggedIn,
        loading,
        login,
        logout,
        showAlert,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}
