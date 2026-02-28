import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Stepper from "../components/Stepper";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { LinearGradient } from "expo-linear-gradient";


export default function VehicleVerificationScreen({ navigation, route }) {
    const { accountData } = route.params || {};
  const [vehicle, setVehicle] = useState("Car");

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Document Verification</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* STEPPER */}
      <Stepper step={1} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Verify Your Vehicle</Text>
        <Text style={styles.subtitle}>
          Upload the required documents to start driving.
        </Text>

        {/* VEHICLE TYPES */}
        <View style={styles.vehicleGrid}>
          {VEHICLES.map((item) => {
            const selected = vehicle === item.label;
            return (
              <TouchableOpacity
                key={item.label}
                style={[
                  styles.vehicleCard,
                  selected && styles.vehicleSelected,
                ]}
                onPress={() => setVehicle(item.label)}
              >
                <View style={styles.checkWrap}>
                  {selected && (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#ff7a18"
                    />
                  )}
                </View>

                <Image
                  source={item.image}
                  style={styles.vehicleImage}
                  resizeMode="contain"
                />
                <Text style={styles.vehicleText}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* DOCUMENT LIST */}
      {DOCUMENTS.map((doc) => (
  <View key={doc.label} style={styles.docRow}>
    {/* LEFT */}
    <View style={styles.docLeft}>
      <Ionicons name="location-outline" size={18} />
      <Text style={styles.docText}>{doc.label}</Text>
    </View>

    {/* RIGHT */}
    <View style={styles.docRight}>
  {/* UPLOAD / STATUS */}
  {doc.status === "Upload" ? (
    <TouchableOpacity
      style={[styles.status, styles.upload]}
      onPress={() => {
        // 1️⃣ PROFILE PHOTO → CIRCULAR SCREEN
        if (doc.type === "PROFILE_PHOTO") {
          navigation.navigate("UploadProfilePhoto", {
            documentType: doc.type,
          });
        }

        // 2️⃣ ALL OTHER DOCUMENTS → RECTANGULAR SCREEN
        else {
          navigation.navigate("UploadDocument", {
            documentType: doc.type,

            title:
              doc.type === "DRIVERS_LICENSE"
                ? "Take A Photo Of Your Driver’s License"
                : doc.type === "RC"
                ? "Take A Photo Of Your Vehicle Registration (RC)"
                : doc.type === "INSURANCE"
                ? "Take A Photo Of Your Insurance Document"
                : doc.type === "AADHAAR"
                ? "Take A Photo Of Your Aadhaar Card"
                : doc.type === "PAN"
                ? "Take A Photo Of Your PAN Card"
                : "Upload Document",

            hint:
              doc.type === "DRIVERS_LICENSE"
                ? "Make sure your license is valid and clearly readable."
                : doc.type === "RC"
                ? "Ensure the RC details are visible and not blurred."
                : doc.type === "INSURANCE"
                ? "Upload a valid insurance document without glare."
                : doc.type === "AADHAAR"
                ? "Ensure all Aadhaar details are readable."
                : doc.type === "PAN"
                ? "Avoid glare and ensure PAN text is sharp."
                : "",
          });
        }
      }}
    >
      <Text style={styles.uploadText}>Upload</Text>
    </TouchableOpacity>
  ) : (
    <View style={[styles.status, styles.verified]}>
      <Text style={styles.verifiedText}>{doc.status}</Text>
    </View>
  )}

  {/* 👁 PREVIEW ICON (Verified / Pending only) */}
  {doc.status !== "Upload" && (
    <TouchableOpacity
      style={{ marginLeft: 8 }}
      onPress={() => {
        if (doc.type === "PROFILE_PHOTO") {
          navigation.navigate("UploadProfilePhoto", {
            documentType: doc.type,
            previewOnly: true,
          });
        } else {
          navigation.navigate("UploadDocument", {
            documentType: doc.type,
            previewOnly: true,
          });
        }
      }}
    >
      <Ionicons name="eye-outline" size={18} />
    </TouchableOpacity>
  )}
</View>

  </View>
))}

      </ScrollView>

      {/* FOOTER BUTTON */}
      <View style={styles.footer}>

          {/* PREVIEW BUTTON */}
  <TouchableOpacity
    style={styles.previewButton}
    onPress={() =>
      navigation.navigate("ApplicationPreview", {
        accountData,
        vehicle,
      })
    }
  >
    <Text style={styles.previewText}>Preview your Application</Text>
  </TouchableOpacity>

        {/* <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity> */}
        <Pressable activeOpacity={0.8} android_ripple={{ color: "rgba(255,255,255,0.2)" }} onPress={() => navigation.replace("ApplicationSubmitted")}>
  <LinearGradient
    colors={["#FF862E", "#FF6B00"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }} // 180deg
    style={styles.button}
  >
    <Text style={styles.buttonText}>Submit Application</Text>
  </LinearGradient>
</Pressable>
      </View>
    </SafeAreaView>
  );
}

/* ===== DATA ===== */

const VEHICLES = [
  {
    label: "Car",
    image: require("../../assets/images/car.png"),
  },
  {
    label: "Bike",
    image: require("../../assets/images/bike.png"),
  },
  {
    label: "Auto",
    image: require("../../assets/images/auto.png"),
  },
  {
    label: "Truck",
    image: require("../../assets/images/truck.png"),
  },
];

const DOCUMENTS = [
  {
    label: "Profile Photo",
    status: "Upload",
    type: "PROFILE_PHOTO",
  },
  {
    label: "Driver's License",
    status: "Upload",
    type: "DRIVERS_LICENSE",
  },
  {
    label: "Vehicle Registration (RC)",
    status: "Verified",
    type: "RC",
  },
  {
    label: "Insurance",
    status: "Upload",
    type: "INSURANCE",
  },
   {
    label: "Aadhar Card",
    status: "Pending",
    type: "AADHAAR",
  },
  {
    label: "Pan Card",
    status: "Pending",
    type: "PAN",
  },
];


/* ===== STYLES ===== */

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

  content: {
    paddingHorizontal: 18,
    paddingBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
    marginVertical: 12,
  },

  subtitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 24,
  },

  /* Vehicle Grid */
  vehicleGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  vehicleCard: {
    width: "48%",
    backgroundColor: "#f3f3f3",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    position: "relative",
  },

  vehicleSelected: {
    backgroundColor: "#fff7ef",
    borderWidth: 1,
    borderColor: "#ff7a18",
  },

  checkWrap: {
    position: "absolute",
    top: 8,
    right: 8,
  },

  vehicleImage: {
    width: 160,
    height: 80,
    marginBottom: 6,
  },

  vehicleText: {
    fontSize: 14,
    fontWeight: "500",
  },

  /* Document Row */
  docRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E5E5E5",
    marginBottom: 10
  },

  docLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  docText: {
    marginLeft: 10,
    fontSize: 14,
  },

  docRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  status: {
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },

  upload: {
    backgroundColor: "#ff7a18",
  },

  verified: {
    backgroundColor: "#00BF40",
  },

  pending: {
    backgroundColor: "#white",
    borderWidth: 1,
    borderColor: '#19A645'
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },

  uploadText: {
    color: "#fff",
  },

  verifiedText: {
    color: "#fff",
  },

  pendingText: {
    color: "#black",
  },

  footer: {
    padding: 16,
  },

  button: {
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  previewButton: {
  height: 52,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#FF6B00",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 12,
  backgroundColor: "#fff",
},

previewText: {
  color: "#FF6B00",
  fontSize: 15,
  fontWeight: "600",
},

});
