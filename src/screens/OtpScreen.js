import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";
import useReq from "../hooks/useReq";


const OTP_LENGTH = 6;
const RESEND_TIME = 15;

export default function OtpScreen({ navigation, route }) {
    const { mobile } = route.params || {};
      const { requestData, response, error: apiError, loading } = useReq();

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(RESEND_TIME);
  const [error, setError] = useState("");
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const shakeAnimation = () => {
  shakeAnim.setValue(0);
  Animated.sequence([
    Animated.timing(shakeAnim, {
      toValue: 10,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnim, {
      toValue: -10,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnim, {
      toValue: 6,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnim, {
      toValue: -6,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnim, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }),
  ]).start();
};


  const inputsRef = useRef([]);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  /* ================= AUTO SUBMIT ================= */
  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      submitOtp();
    }
  }, [otp]);

  /* ================= HANDLERS ================= */
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

//   const submitOtp = () => {
//   const code = otp.join("");

//   if (code !== "123456") {
//     setError("Invalid OTP. Please try again.");
//     shakeAnimation(); // 👈 SHAKE HERE
//     return;
//   }

//   setError("");
//   console.log("OTP Verified:", code);
//   navigation.navigate("CreateAccount", {
//       // mobile: phone
//     });
// };

  const submitOtp = () => {
    const code = otp.join("");

    if (code.length !== OTP_LENGTH) return;

    requestData("POST", "/auth/verify-otp", {
      phone: mobile,
      otp: code,
    });
  };

    useEffect(() => {
    if (response) {
      console.log("OTP Verified:", response);

      navigation.navigate("CreateAccount", {
        mobile,
      });
    }
  }, [response]);

    useEffect(() => {
    if (apiError) {
      setError(apiError.message || "Invalid OTP. Please try again.");
      shakeAnimation();
    }
  }, [apiError]);


  const resendOtp = () => {
    setOtp(Array(OTP_LENGTH).fill(""));
    setTimer(RESEND_TIME);
    setError("");
    inputsRef.current[0].focus();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* LOGO */}
      <View style={styles.logoWrap}>
        <Text style={styles.logoOrange}>REBO</Text>
        <Text style={styles.logoBlack}>PARTNER</Text>
      </View>

      {/* CARD */}
      <View style={styles.card}>
        <Text style={styles.title}>Please wait...</Text>

        <Text style={styles.subtitle}>
          Auto-verifying the OTP sent to
        </Text>

        <Text style={styles.phone}>+91 {mobile}</Text>

        {/* OTP INPUTS */}
        {/* <View style={styles.otpRow}> */}
        <Animated.View
          style={[
            styles.otpRow,
            { transform: [{ translateX: shakeAnim }] },
          ]}
        >
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputsRef.current[index] = ref)}
              value={digit}
              onChangeText={(value) =>
                handleChange(value, index)
              }
              onKeyPress={(e) =>
                handleKeyPress(e, index)
              }
              keyboardType="number-pad"
              maxLength={1}
              style={[
                styles.otpBox,
                error && styles.otpError,
              ]}
              autoFocus={index === 0}
            />
          ))}
        </Animated.View>

        {/* ERROR */}
        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : null}

        {/* BUTTON */}
        <TouchableOpacity
  style={[
    styles.button,
    loading && { opacity: 0.6 },
  ]}
  onPress={submitOtp}
  disabled={loading}
>
  <Text style={styles.buttonText}>
    {loading ? "Verifying..." : "Continue"}
  </Text>
</TouchableOpacity>


        {/* TIMER / RESEND */}
        {timer > 0 ? (
          <Text style={styles.timer}>
            Auto verifying your OTP in (
            {`00:${timer.toString().padStart(2, "0")}`})
            seconds
          </Text>
        ) : (
          <TouchableOpacity onPress={resendOtp}>
            <Text style={styles.resend}>
              Resend OTP
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  /* Logo */
  logoWrap: {
    flexDirection: "row",
    marginTop: 60,
    marginBottom: 40,
  },
  logoOrange: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ff7a18",
  },
  logoBlack: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    marginLeft: 4,
  },

  /* Card */
  card: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },

  phone: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 18,
  },

  /* OTP */
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  otpBox: {
    width: 40,
    height: 44,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 18,
  },

  otpError: {
    borderColor: "#e74c3c",
  },

  /* Button */
  button: {
    backgroundColor: "#ff7a18",
    borderRadius: 8,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  /* Timer */
  timer: {
    fontSize: 11,
    color: "#999",
    textAlign: "center",
  },

  resend: {
    fontSize: 13,
    color: "#ff7a18",
    textAlign: "center",
    fontWeight: "600",
  },

  error: {
    fontSize: 12,
    color: "#e74c3c",
    textAlign: "center",
    marginBottom: 8,
  },
});
