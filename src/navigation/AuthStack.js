
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import OtpScreen from '../screens/OtpScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import VehicleVerificationScreen from '../screens/VehicleVerificationScreen';
import UploadProfilePhotoScreen from '../screens/UploadProfilePhotoScreen';
import UploadDocumentScreen from '../screens/UploadDocumentScreen';
import ApplicationPreview from '../screens/ApplicationPreview';
import ApplicationSubmitted from '../screens/ApplicationSubmitted';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EarningsScreen from '../screens/EarningsScreen';
import EarningsDetailsScreen from '../screens/EarningsDetailsScreen';
import WithdrawScreen from '../screens/WithdrawScreen';
import GigHistoryScreen from '../screens/GigHistoryScreen';
import TripHistoryScreen from '../screens/TripHistoryScreen';
import TripDetailsScreen from '../screens/TripDetailsScreen';
import YourOffersScreen from '../screens/OffersScreen';
// import SelectLangauge from '../screens/auth/SelectLangauge';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown:false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen}/>
      <Stack.Screen name="SignUp" component={SignUpScreen}/>
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="Otp" component={OtpScreen}/>
      {/* <Stack.Screen name="CreateAccount" component={CreateAccountScreen}/>
       <Stack.Screen
        name="VehicleVerification"
        component={VehicleVerificationScreen}
      />
      <Stack.Screen
  name="UploadProfilePhoto"
  component={UploadProfilePhotoScreen}
/>
      <Stack.Screen
  name="UploadDocument"
  component={UploadDocumentScreen}
/>
      <Stack.Screen
  name="ApplicationPreview"
  component={ApplicationPreview}
/>
      <Stack.Screen
  name="ApplicationSubmitted"
  component={ApplicationSubmitted}
/>
      <Stack.Screen
  name="Home"
  component={HomeScreen}
/>

      <Stack.Screen
  name="Profile"
  component={ProfileScreen}
/>

      <Stack.Screen
  name="Earnings"
  component={EarningsScreen}
/>
      <Stack.Screen
  name="EarningDetails"
  component={EarningsDetailsScreen}
/>
      <Stack.Screen
  name="Balance"
  component={WithdrawScreen}
/>

      <Stack.Screen
  name="GigHistory"
  component={GigHistoryScreen}
/>

      <Stack.Screen
  name="TripHistory"
  component={TripHistoryScreen}
/>

      <Stack.Screen
  name="TripDetails"
  component={TripDetailsScreen}
/>
      <Stack.Screen
  name="YourOffers"
  component={YourOffersScreen}
/> */}
      {/* <Stack.Screen name="langauge" component={SelectLangauge}/> */}
    </Stack.Navigator>
  );
}
