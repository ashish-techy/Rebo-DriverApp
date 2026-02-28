import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Stepper from "../components/Stepper";
import StatePickerModal from "../components/StatePickerModal";
import useReq from "../hooks/useReq";

export default function CreateAccountScreen({ navigation, route }) {
  const { mobile } = route.params || {};
    const { requestData, response, error, loading } = useReq();

  const [stateModal, setStateModal] = useState(false);
  const [cityModal, setCityModal] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(mobile || "");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [referral, setReferral] = useState("");
  const [terms, setTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneValid = phone.length >= 10;

  const formValid =
    name &&
    emailValid &&
    phoneValid &&
    state &&
    city &&
    terms;

  const showError = (condition) => submitted && !condition;


  const handleCreateAccount = () => {
  setSubmitted(true);

  if (!formValid) return;

  requestData("POST", "/driver/register/step1", {
    phone,
    name,
    email,
    city,
    state,
    pincode: "400008", // static for now
  });
};

useEffect(() => {
  if (response) {
    console.log("Step 1 Registered:", response);

    navigation.navigate("VehicleVerification", {
      accountData: {
        phone,
        name,
        email,
        city,
        state,
      },
    });
  }
}, [response]);


useEffect(() => {
  if (error) {
    Alert.alert(
      "Registration Failed",
      error.message || "Something went wrong"
    );
    console.log("Registration Error:", error);
  }
}, [error]);


  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={22} />
        <Text style={styles.headerTitle}>Create an account</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* STEPPER */}
      <Stepper step={0} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.form}
          keyboardShouldPersistTaps="handled"
        >
          {/* NAME */}
          <Label text="Name" />
          <Input
            value={name}
            onChangeText={setName}
            placeholder="prasad paralkar"
            error={showError(name)}
          />
          {showError(name) && (
            <Error text="Please enter full name." />
          )}

          {/* EMAIL */}
          <Label text="Email address" />
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="abc@gmail.com"
            error={showError(emailValid)}
          />
          {showError(emailValid) && (
            <Error text="Please enter a valid email." />
          )}

          {/* PHONE */}
          <Label text="Phone Number" />
          <View
            style={[
              styles.phoneInput,
              showError(phoneValid) && styles.inputError,
            ]}
          >
            <Text style={styles.flag}>🇮🇳</Text>
            <TextInput
  keyboardType="phone-pad"
  value={phone}
  editable={false}
  style={{ flex: 1, color: "#555" }}
/>
          </View>
          {showError(phone) && (
            <Error text="Please enter a valid mobile." />
          )}

          {/* STATE */}
          <Label text="State" />
          <Dropdown
            value={state}
            placeholder="Maharashtra"
            onPress={() => setStateModal(true)}
            error={showError(state)}
          />
          {showError(state) && (
            <Error text="Please select your state" />
          )}

          {/* CITY */}
          <Label text="City" />
          <Dropdown
            value={city}
            placeholder="Pune"
            onPress={() => setCityModal(true)}
            error={showError(city)}
          />
          {showError(city) && (
            <Error text="Please select your city" />
          )}

          {/* REFERRAL */}
          <Label text="Referral Code (Optional)" />
          <Input
            value={referral}
            onChangeText={setReferral}
            placeholder="ABD365HJ"
          />
          {referral.length > 0 && (
            <Success text="Invite code applied" />
          )}

          {/* TERMS */}
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setTerms(!terms)}
          >
            <View
              style={[
                styles.checkbox,
                terms && styles.checkboxChecked,
                showError(terms) && styles.inputError,
              ]}
            />
            <Text style={styles.checkboxText}>
              By continuing, I agree to the{" "}
              <Text style={styles.link}>terms of use</Text> &{" "}
              <Text style={styles.link}>privacy policy</Text>
            </Text>
          </TouchableOpacity>

          {/* BUTTON */}
          {/* <TouchableOpacity
            style={[
              styles.button,
              !formValid && styles.buttonDisabled,
            ]}
            // disabled={!formValid}
            onPress={() => setSubmitted(true)}
          >
            <Text
              style={[
                styles.buttonText,
                !formValid && styles.buttonTextDisabled,
              ]}
            >
              Create an account
            </Text>
          </TouchableOpacity> */}

          {/* <TouchableOpacity
  style={[
    styles.button,
    !formValid && styles.buttonDisabled,
  ]}
  disabled={!formValid}
  onPress={() => {
    setSubmitted(true);

    if (formValid) {
    //   navigation.navigate("VehicleVerification");
    navigation.navigate("VehicleVerification", {
  accountData: {
    name,
    email,
    phone,
    state,
    city,
  },
});

    }
  }}
>
  <Text style={styles.buttonText}>
    Create an account
  </Text>
</TouchableOpacity> */}

<TouchableOpacity
  style={[
    styles.button,
    (!formValid || loading) && styles.buttonDisabled,
  ]}
  disabled={!formValid || loading}
  onPress={handleCreateAccount}
>
  <Text style={styles.buttonText}>
    {loading ? "Creating account..." : "Create an account"}
  </Text>
</TouchableOpacity>



        </ScrollView>
      </KeyboardAvoidingView>

      {/* MODALS */}
      <StatePickerModal
        visible={stateModal}
        onSelect={(v) => {
          setState(v);
          setStateModal(false);
        }}
        onClose={() => setStateModal(false)}
      />
      <StatePickerModal
        visible={cityModal}
        onSelect={(v) => {
          setCity(v);
          setCityModal(false);
        }}
        onClose={() => setCityModal(false)}
      />

      {/* <CityPickerModal
        visible={cityModal}
        onSelect={(v) => {
          setCity(v);
          setCityModal(false);
        }}
        onClose={() => setCityModal(false)}
      /> */}
    </SafeAreaView>
  );
}

/* ================= REUSABLE ================= */

const Label = ({ text }) => (
  <Text style={styles.label}>{text}</Text>
);

const Input = ({ error, ...props }) => (
  <TextInput
    {...props}
    style={[
      styles.input,
      error && styles.inputError,
    ]}
  />
);

const Dropdown = ({ value, placeholder, onPress, error }) => (
  <TouchableOpacity
    style={[
      styles.dropdown,
      error && styles.inputError,
    ]}
    onPress={onPress}
  >
    <Text style={!value ? styles.placeholder : null}>
      {value || placeholder}
    </Text>
    <Ionicons name="chevron-down" size={18} />
  </TouchableOpacity>
);

const Error = ({ text }) => (
  <Text style={styles.errorText}>{text}</Text>
);

const Success = ({ text }) => (
  <Text style={styles.successText}>{text}</Text>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  headerTitle: { fontSize: 16, fontWeight: "600" },

  form: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },

  label: { fontSize: 13, marginTop: 12, marginBottom: 6 },

  input: {
    height: 42,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
  },

  phoneInput: {
    height: 42,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  dropdown: {
    height: 42,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  inputError: {
    borderColor: "#e74c3c",
  },

  errorText: {
    fontSize: 11,
    color: "#e74c3c",
    marginTop: 4,
  },

  successText: {
    fontSize: 11,
    color: "#2ecc71",
    marginTop: 4,
  },

  placeholder: { color: "#999" },

  flag: { marginRight: 8 },

  checkboxRow: {
    flexDirection: "row",
    marginTop: 14,
    alignItems: "flex-start",
  },

  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: "#ff7a18",
    marginRight: 8,
    marginTop: 2,
  },

  checkboxChecked: {
    backgroundColor: "#ff7a18",
  },

  checkboxText: {
    fontSize: 12,
    flex: 1,
  },

  link: {
    color: "#ff7a18",
    fontWeight: "500",
  },

  button: {
    backgroundColor: "#ff7a18",
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 20,
  },

  buttonDisabled: {
    backgroundColor: "#f3f3f3",
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },

  buttonTextDisabled: {
    color: "#999",
  },
});


