import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { AuthProvider } from "./src/context/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { AlertProvider } from "./src/components/GlobalAlert";

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <AlertProvider>
        <NavigationContainer>
          <AuthProvider>
            <AppNavigator />
          </AuthProvider>
        </NavigationContainer>
      </AlertProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
