import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
  ImageBackground,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import useReq from "../hooks/useReq";
import { LinearGradient } from "expo-linear-gradient";
import { useAlert } from "../components/GlobalAlert";

export default function SignUpScreen({ navigation }) {
    const [phone, setPhone] = useState("");
  const { showAlert } = useAlert();


  const { requestData, response, error, loading } = useReq();

    const handleContinue = () => {
    if (!phone || phone.length !== 10) {
      showAlert({
        type: "error",
        title: "Invalid number",
        message: "Please enter a valid 10-digit phone number",
      });

      // Alert.alert("Invalid number", "Please enter a valid 10-digit phone number");
      return;
    }

    requestData("POST", "/auth/send-otp", {
      phone,
    });
  };


    useEffect(() => {
    if (response) {
      showAlert({
        type: "success",
        title: "Success",
        message: response.message || "OTP Sent",
      });

      // Alert.alert("Success", response.message || "OTP Sent");

      navigation.navigate("Otp", {
        mobile: phone,
      });
    }
  }, [response]);


    useEffect(() => {
    if (error) {
      Alert.alert(
        "Error",
        error.message || "Something went wrong"
      );
    }
  }, [error]);

    useEffect(() => {
    if (loading) {
      console.log("Sending OTP...");
    }
  }, [loading]);


  return (
    <>
      {/* ===== STATUS BAR ===== */}
      <StatusBar
        backgroundColor="#FFF7ED"
        barStyle="dark-content"
      />
    <ImageBackground
      source={require("../../assets/Login/auth-background.png")}
      style={styles.background}
      resizeMode="cover"
    >

      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          {/* ===== LOGO ===== */}
          <Text style={styles.logo}>
            <Image
                         source={require("../../assets/Login/Logo2.png")}
                        style={styles.logoImage}
                        resizeMode="contain"
                      />
            {/* <Text style={{ color: "#FF7A18" }}>REBO</Text>{" "}
            <Text style={{ color: "#000" }}>PARTNER</Text> */}
          </Text>

          {/* ===== CARD ===== */}
          <View style={styles.card}>
            <Text style={styles.title}>
              What's your phone{"\n"}number or email?
            </Text>

            {/* INPUT */}
            <View style={styles.inputWrap}>
              <Text style={styles.flag}>🇮🇳</Text>
              <Text style={styles.code}>+91</Text>
              <TextInput
  placeholder="0000000000"
  placeholderTextColor="#9E9E9E"
  keyboardType="phone-pad"
  style={styles.input}
  value={phone}
  onChangeText={setPhone}
  maxLength={10}
/>

            </View>

            {/* CONTINUE */}
            {/* <TouchableOpacity
  style={[
    styles.primaryBtn,
    loading && { opacity: 0.6 },
  ]}
  onPress={handleContinue}
  disabled={loading}
>
  <Text style={styles.primaryText}>
    {loading ? "Sending OTP..." : "Continue"}
  </Text>
</TouchableOpacity> */}

<TouchableOpacity
  onPress={handleContinue}
  disabled={loading}
  activeOpacity={0.8}
  style={{ width: "100%" }}
>
 <LinearGradient
          colors={["#FF862E", "#FF6B00"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }} // left to right like image
          style={[
            styles.button,
            loading && { opacity: 0.6 }
          ]}
        >
          <Text style={styles.text}>
            {loading ? "Sending OTP..." : "Continue"}
          </Text>
        </LinearGradient>
</TouchableOpacity>


           
          </View>

          <View  >
 {/* OR */}
            <View style={styles.orWrap}>
              <View style={styles.line} />
              <Text style={styles.orText}>Or</Text>
              <View style={styles.line} />
            </View>

            {/* GOOGLE */}
            <TouchableOpacity style={styles.socialBtn}>
              <Image
                // source={{ source: require("../../assets/Login/google.png") }}
                source={require("../../assets/Login/google.png")}
                style={styles.socialIcon}
              />
              <Text style={styles.socialText}>
                Continue with Google
              </Text>
            </TouchableOpacity>

            {/* APPLE */}
            <TouchableOpacity style={styles.socialBtn}>
              <Ionicons
                name="logo-apple"
                size={20}
                color="#000"
              />
              <Text style={styles.socialText}>
                Continue with Apple
              </Text>
            </TouchableOpacity>

            {/* TERMS */}
            <Text style={styles.terms}>
              By continuing, you agree to calls, including by autodialer,
              WhatsApp, or texts from REBO and its affiliates.
            </Text>
            </View>

          {/* ===== ILLUSTRATION ===== */}
          <Image
           source={require("../../assets/Login/Login-rebo.png")}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>
      </SafeAreaView>
    </ImageBackground>

    </>
  );
}

/* ===== STYLES ===== */
const styles = StyleSheet.create({
      background: {
        flex: 1,
      },
  safe: {
    flex: 1,
    // backgroundColor: "#FFF7ED", // 🔥 exact off-white background
  },

  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
  },

  /* Logo */
  logo: {
    marginTop: 20,
    fontSize: 20,
  },

  /* Card */
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginTop: 18,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  title: {
    fontSize: 30,
    fontWeight: "600",
    marginBottom: 16,
    lineHeight: 30,
  },

  /* Input */
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#F4F4F4",
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    height: 48, // 🔥 correct height
  },

  flag: {
    fontSize: 18,
    marginRight: 8,
  },

  code: {
    fontSize: 14,
    marginRight: 8,
    color: "#000",
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },

  /* Primary Button */
  primaryBtn: {
    marginTop: 16,
    // backgroundColor: "#FF7A18",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },

  primaryText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },

  /* OR */
  orWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#2E2E2E",
  },

  orText: {
    marginHorizontal: 10,
    fontSize: 12,
    color: "#2E2E2E",
  },

  /* Social */
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8E8E8",
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 12,
  },

  socialIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },

  socialText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },

  /* Terms */
  terms: {
    fontSize: 10,
    color: "#8A8A8A",
    marginTop: 8,
    lineHeight: 14,
  },

  /* Illustration */
  illustration: {
    width: 260,
    height: 200,
    marginTop: "auto",
    marginBottom: 12,
  },
  logoImage: {
    width: 120,
    height: 60,
  },
   button: {
    height: 48,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",

    marginTop: 16,

    // Shadow for iOS
    shadowColor: "#FF6B00",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,

    // Elevation for Android
    elevation: 5,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});
