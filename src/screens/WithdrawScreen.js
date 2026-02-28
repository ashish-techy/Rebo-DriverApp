import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function WithdrawScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pocket Balance</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* MAIN */}
      <View style={styles.content}>
        <Text style={styles.label}>Withdraw amount</Text>
        <Text style={styles.amount}>₹1500</Text>

        <TouchableOpacity style={styles.withdrawBtn}>
          <Text style={styles.withdrawText}>Withdraw</Text>
        </TouchableOpacity>

        {/* DATE RANGE */}
        <Text style={styles.range}>POCKET DETAILS 24 NOV - 30 NOV</Text>

        {/* DETAILS */}
        <View style={styles.row}>
          <Text style={styles.left}>Earnings</Text>
          <Text style={styles.right}>₹1500</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.left}>Amount Withdrawn</Text>
          <Text style={[styles.right, styles.negative]}>-₹162</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.left}>Cash Collected</Text>
          <Text style={[styles.right, styles.negative]}>-₹500</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.left}>Deductions</Text>
          <Text style={styles.right}>₹0</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.boldLeft}>Pocket Balance</Text>
          <Text style={styles.boldRight}>₹1500</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoText}>
            Min. Balance Required{"\n"}
            <Text style={styles.infoSub}>
              Resets every Monday and increases with earnings
            </Text>
          </Text>
          <Text style={styles.infoAmount}>₹300</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.boldLeft}>Withdrawable Amount</Text>
          <Text style={styles.boldRight}>₹500</Text>
        </View>
      </View>
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
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },

  content: {
    padding: 20,
  },

  label: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
  },

  amount: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
    marginTop: 6,
  },

  withdrawBtn: {
    backgroundColor: "#FF6B00",
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 20,
    marginBottom: 24,
  },

  withdrawText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },

  range: {
    textAlign: "center",
    fontSize: 12,
    color: "#999",
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },

  left: {
    fontSize: 14,
    color: "#444",
  },

  right: {
    fontSize: 14,
    color: "#000",
  },

  negative: {
    color: "#E53935",
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 12,
  },

  boldLeft: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },

  boldRight: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },

  infoText: {
    fontSize: 13,
    color: "#444",
    maxWidth: "75%",
  },

  infoSub: {
    fontSize: 11,
    color: "#999",
  },

  infoAmount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
});
