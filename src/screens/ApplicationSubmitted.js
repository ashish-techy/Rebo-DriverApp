import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ApplicationSubmitted({ navigation }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* LOGO */}
      <Text style={styles.logo}>
        <Image
                         source={require("../../assets/Login/Logo2.png")}
                        style={styles.logoImage}
                        resizeMode="contain"
                      />
        {/* <Text style={styles.logoOrange}>REBO</Text> PARTNER */}
      </Text>

      {/* ILLUSTRATION */}
      <Animated.View
  style={[
    styles.imageWrap,
    {
      opacity: fadeAnim,
      transform: [{ translateY: slideAnim }],
    },
  ]}
>
        <Image
          source={require("../../assets/images/application-submitted.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </Animated.View>

      {/* TEXT */}
      <Text style={styles.title}>
        Your application is submitted{"\n"}and is under review.
      </Text>

      <Text style={styles.subtitle}>
        You will be notified with application status or check the{" "}
        <Text style={{ fontWeight: "600" }}>status by going to Settings.</Text>
      </Text>

      {/* BUTTON */}
      <Pressable
        style={styles.buttonWrap}
        onPress={() => navigation.replace("Home")}
      >
        <LinearGradient
          colors={["#FF862E", "#FF6B00"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Explore the app</Text>
        </LinearGradient>
      </Pressable>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  logo: {
    marginTop: 20,
    fontSize: 18,
    // fontWeight: "700",
  },

  logoOrange: {
    color: "#FF6B00",
  },

  imageWrap: {
    marginTop: 50,
    marginBottom: 40,
  },

  image: {
    width: 260,
    height: 220,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 26,
  },

  subtitle: {
    fontSize: 13,
    color: "#8C8C8C",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 10,
  },

  buttonWrap: {
    position: "absolute",
    bottom: 30,
    left: 24,
    right: 24,
  },

  button: {
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
    logoImage: {
    width: 120,
    height: 60,
  },
});
