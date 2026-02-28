import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TripDetailsScreen({ navigation }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Trip details</Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={styles.date}>Jan 4, SUN</Text>

      {/* Total Earnings Card */}
      <View style={styles.earningCard}>
        <Text style={styles.earningTitle}>Total Earnings</Text>
        <Text style={styles.earningAmount}>₹360</Text>
      </View>

      {/* Trip Pay */}
      <View style={styles.tripPayCard}>
        <Text style={styles.tripPayText}>Trip Pay</Text>
        <Text style={styles.tripPayAmount}>₹360</Text>
      </View>

      {/* Expandable Trip Section */}
      <View style={styles.tripContainer}>
        <TouchableOpacity
          style={styles.tripHeader}
          onPress={() => setExpanded(!expanded)}
          activeOpacity={0.8}
        >
          <Text style={styles.tripId}>Trip: 7736851714</Text>
          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={18}
          />
        </TouchableOpacity>

        {expanded && (
          <View style={styles.tripDetails}>
            {/* PICKUP */}
            <Text style={styles.sectionTitle}>PICKUP</Text>

            <Text style={styles.locationTitle}>Vanaz</Text>
            <DetailRow label="Trip Assigned" value="9:57 Pm" />
            <DetailRow label="Reached Pickup" value="10:05 Pm" />
            <DetailRow label="Distance Travelled" value="1.4 Km" />

            <View style={styles.divider} />

            {/* DROP */}
            <Text style={styles.sectionTitle}>Drop</Text>

            <Text style={styles.locationTitle}>Kasbapeth</Text>
            <DetailRow label="Picked" value="10:09 Pm" />
            <DetailRow label="Drop" value="10:19 Pm" />
            <DetailRow label="Distance Travelled" value="3.6Km" />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

/* Reusable Row */
const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    paddingHorizontal: 16,
    margin: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  date: {
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 14,
  },

  /* Orange Earnings Card */
  earningCard: {
    backgroundColor: "#FF6B00",
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: "center",
  },

  earningTitle: {
    color: "#fff",
    fontSize: 14,
  },

  earningAmount: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 6,
  },

  /* Trip Pay */
  tripPayCard: {
    backgroundColor: "#EAEAEA",
    borderRadius: 10,
    padding: 14,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  tripPayText: {
    fontSize: 14,
    fontWeight: "500",
  },

  tripPayAmount: {
    fontSize: 14,
    fontWeight: "600",
  },

  /* Trip Expandable */
  tripContainer: {
    marginTop: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },

  tripHeader: {
    backgroundColor: "#FFB482",
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  tripId: {
    fontWeight: "600",
  },

  tripDetails: {
    padding: 16,
  },

  sectionTitle: {
    fontSize: 12,
    color: "#8E8E93",
    marginBottom: 6,
    marginTop: 8,
  },

  locationTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },

  detailLabel: {
    fontSize: 12,
    color: "#8E8E93",
  },

  detailValue: {
    fontSize: 12,
    color: "#333",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 12,
  },
});