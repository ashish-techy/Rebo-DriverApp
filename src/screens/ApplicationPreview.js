import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ApplicationPreview({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Information</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* PROFILE IMAGE */}
        <Image
          source={require("../../assets/images/user-info.png")}
          style={styles.profileImage}
        />

        <View style={styles.body}>
          {/* RIDER DETAILS */}
          <Card title="Rider Details">
            <Row label="Name" value="prasad sunilrao parkarkar" />
            <Row label="Zone" value="Kothrud shivajinagar" />
            <Row label="City" value="Pune" />
            <Row label="Vehicle type" value="Bike" />
            <Row
              label="Vehicle Number"
              value="MH23BP9138"
              editable
              last
            />
          </Card>

          {/* PERSONAL DETAILS */}
          <Card title="Personal Details">
            <Row label="Phone" value="8585859657" />
            <Row
              label="Alternate Phone"
              value="1234567890"
              editable
            />
            <Row label="Rating" value="5.0" />
            <Row label="App version" value="14.8.2" last />
          </Card>

          {/* BANK DETAILS */}
          <Card title="Bank Details">
            <Row label="Bank name" value="Bank of India" />
            <Row label="Account No." value="1234567890" />
            <Row label="IFSC Code" value="BOI587523" />
            <Row label="Pan card No." value="HDEPZ6589P" last />
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- COMPONENTS ---------------- */

const Card = ({ title, children }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    {children}
  </View>
);

const Row = ({ label, value, editable, last }) => (
  <View
    style={[
      styles.row,
      last && { borderBottomWidth: 0, paddingBottom: 0 },
    ]}
  >
    <Text style={styles.label}>{label}</Text>

    <View style={styles.valueWrap}>
      <Text style={styles.value}>{value}</Text>
      {editable && (
        <Ionicons
          name="pencil"
          size={20}
          color="#0B9736"
          style={{ marginLeft: 6 }}
        />
      )}
    </View>
  </View>
);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  profileImage: {
    width: "100%",
    height: 230,
  },

  body: {
    padding: 16,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 14,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
  },

  label: {
    fontSize: 13,
    color: "#444",
  },

  valueWrap: {
    flexDirection: "row",
    alignItems: "center",
  },

  value: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000",
  },
});
