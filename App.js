
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

export default function App() {
  return (
     <GestureHandlerRootView style={styles.container}>

    <NavigationContainer>
          <AuthProvider>
      <AppNavigator />
          </AuthProvider>
    </NavigationContainer>
     </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});