import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabs from "./MainTabs";
import SelectLanguageScreen from "../screens/SelectLanguageScreen";
// import RideConfirmationScreen from "../screens/RideConfirmationScreen";
// import RideBookingScreen from "../screens/RideBookingScreen";
// import RideDetailsScreen from "../screens/RideDetailsScreen";
// import EditProfileScreen from "../screens/EditProfileScreen";
// import HelpScreen from "../components/HelpScreen";
// import InsuranceScreen from "../components/InsuranceScreen";
// import RideHistoryScreen from "../components/RideHistoryScreen";
// import RideDetailsHistoryScreen from "../components/RideDetailsHistoryScreen";
// import NotificationsScreen from "../components/NotificationsScreen";
// import SettingsScreen from "../components/SettingsScreen";
// import SavedLocationsScreen from "../components/SavedLocationsScreen";
// import ProfileScreen from "../screens/ProfileScreen";
// import AboutScreen from "../components/AboutScreen";
// import SafeguardToolScreen from "../components/SafeguardToolScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />

      <Stack.Screen name="language" component={SelectLanguageScreen} />








{/* 
<Stack.Screen name="RideBooking" component={RideBookingScreen} />

      <Stack.Screen
        name="RideConfirmation"
        component={RideConfirmationScreen}
      />

      <Stack.Screen
  name="RideDetails"
  component={RideDetailsScreen}
  options={{ headerShown: false }}
/>

<Stack.Screen name="EditProfile" component={EditProfileScreen} />
<Stack.Screen name="Profile" component={ProfileScreen} />
<Stack.Screen name="Help" component={HelpScreen} />
<Stack.Screen
  name="Insurance"
  component={InsuranceScreen}
/>

<Stack.Screen
  name="RideHistory"
  component={RideHistoryScreen}
/>
<Stack.Screen name="RideHistoryDetails" component={RideDetailsHistoryScreen} />
<Stack.Screen name="Notification" component={NotificationsScreen} />
<Stack.Screen name="Settings" component={SettingsScreen} />
<Stack.Screen name="SavedLocations" component={SavedLocationsScreen} />
<Stack.Screen name="About" component={AboutScreen} />
<Stack.Screen name="Safeguard" component={SafeguardToolScreen} /> */}

    </Stack.Navigator>
  );
}

