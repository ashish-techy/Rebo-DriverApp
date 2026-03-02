import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* ===== LOGO ===== */}
        {/* <Text style={styles.logo}>REBO{"\n"}PARTNER</Text> */}
        <Image
             source={require("../../assets/Login/Logo1.png")}
            style={styles.logo}
            resizeMode="contain"
          />

        {/* ===== HEADLINE ===== */}
        <Text style={styles.title}>
          Set your own schedule,{"\n"}
          control your income.
        </Text>

        <Text style={styles.subtitle}>Work your way.</Text>

        {/* ===== BUTTONS ===== */}
        <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.primaryText}>Sign up now</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.secondaryText}>Log in</Text>
        </TouchableOpacity>

        {/* ===== ILLUSTRATION ===== */}
        <View style={styles.illustrationWrap}>
          <Image
             source={require("../../assets/Login/Login-rebo.png")}
            style={styles.illustration}
            resizeMode="contain"
          />
          {/* <Image
                    source={require("../../assets/Login/Login-rebo.png")}
                    style={styles.bottomImage}
                    resizeMode="contain"
                  /> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

/* ===== STYLES ===== */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFCB05",
    
  },

  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
  },

  /* Logo */
  // logo: {
  //   marginTop: 20,
  //   fontSize: 22,
  //   fontWeight: "800",
  //   color: "#fff",
  //   // textAlign: "center",
  //   letterSpacing: 1,
  // },

  /* Headline */
  title: {
    marginTop: 40,
    fontSize: 26,
    fontWeight: "700",
    color: "#000",
    // textAlign: "center",
    lineHeight: 34,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#000",
    opacity: 0.8,
    textAlign: "left"
  },

  /* Buttons */
  primaryBtn: {
    marginTop: 28,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },

  primaryText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#000",
  },

  secondaryBtn: {
    marginTop: 22,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },

  secondaryText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#000",
  },

  /* Illustration */
  illustrationWrap: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },

  illustration: {
    width: 337,
    height: 202,
  },
  logo: {
    width: 150,
    height: 60,
    marginTop: 20,
  },
});
