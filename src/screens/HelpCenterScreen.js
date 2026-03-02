import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DATA = [
  "Past Trip Related Issues",
  "Payout Issues",
  "Update Profile Details",
  "Cash Deposit Issues",
  "Incentive/Offers Issue",
  "App Issues",
  "PAN Aadhaar Linkage Issue",
  "Others",
  "About Insurance Policy",
  "Insurance Reimbursement Claims",
  "Insurance Cashless Claims",
  "Policies And Guidelines",
  "Gig Related Issues",
  "Pocket Related Issues",
];

export default function HelpCenterScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.row} activeOpacity={0.7}>
      <Text style={styles.rowText}>{item}</Text>
      <Ionicons name="chevron-forward" size={18} color="#000000" />
    </TouchableOpacity>
  );

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
        <Text style={styles.headerTitle}>Help center</Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={styles.sectionTitle}>
        What Issue Do You Need Help With?
      </Text>

      <FlatList
        data={DATA}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    // backgroundColor: "#fff",
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginVertical: 10
    // backgroundColor: "#fff",
  },

  row: {
    // backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  rowText: {
    fontSize: 14,
    color: "#000",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginLeft: 16,
  },
});