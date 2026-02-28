import { useEffect, useState } from "react";
import { 
  View, Text, StyleSheet, TextInput, Image, TouchableOpacity, 
  ScrollView, ImageBackground, Alert 
} from "react-native";
import useReq from "../hooks/useReq";

export default function LoginScreen({ navigation }) {

  const { requestData, response, error, loading } = useReq();
  const [phone, setPhone] = useState("");

  const handleNext = () => {
    if (!phone) {
      Alert.alert("Error", "Please enter your mobile number");
      return;
    }

    if (phone.length !== 10) {
      Alert.alert("Invalid", "Mobile number must be 10 digits");
      return;
    }

    console.log("API CALLED")

    // If valid → go to OTP screen
    // navigation.navigate("Otp", { mobile: phone });
    requestData("POST","/auth/send-otp", { phone });
  };

  useEffect(() => {
  if (response ) {
    Alert.alert("Success", response.message || "OTP Sent");
    console.log("OTP sent", response)
    navigation.navigate("Otp", {
      mobile: phone
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
    console.log('LOADING')
  }
}, [loading]);





  return (
    <ImageBackground
      source={require("../../assets/Login/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView 
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <Text style={styles.title}>REBO</Text>

          {/* White Card */}
          <View style={styles.card}>
            <Text style={styles.heading}>
              Enter Your Phone{"\n"}Number for Verification
            </Text>

            {/* Phone Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.countryCode}>+91</Text>

              <TextInput
                style={styles.phoneInput}
                placeholder="0000000000"
                keyboardType="numeric"
                placeholderTextColor="#aaa"
                maxLength={10}
                value={phone}
                onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ""))}
              />
            </View>

            {/* Next Button */}
         <TouchableOpacity
  style={[styles.button, loading && { opacity: 0.6 }]}
  onPress={handleNext}
  disabled={loading}
>
  <Text style={styles.buttonText}>
    {loading ? "Sending OTP..." : "Next"}
  </Text>
</TouchableOpacity>


            {/* Terms */}
            <Text style={styles.termsText}>
              By continuing, you agree to the <Text style={styles.link}>T&C</Text> and{" "}
              <Text style={styles.link}>Privacy Policy</Text>
            </Text>
          </View>
        </ScrollView>

        {/* Bottom Illustration */}
        <Image
          source={require("../../assets/Login/Login-rebo.png")}
          style={styles.bottomImage}
          resizeMode="contain"
        />
      </View>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    // backgroundColor: "rgba(255,255,255,0.85)", // Optional white transparent overlay
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 70,
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
    color: "#000",
  },

  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 40,
  },

  heading: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 30,
    lineHeight: 32,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
  },

  countryCode: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 10,
  },

  phoneInput: {
    flex: 1,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#FF7A00",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 25,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  termsText: {
    textAlign: "center",
    color: "#777",
    marginTop: 15,
  },

  link: {
    color: "#FF7A00",
    fontWeight: "600",
  },

  bottomImage: {
    width: "100%",
    height: 180,
    marginBottom: 60,
  },
});