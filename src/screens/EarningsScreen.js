import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function EarningsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack?.()}>
          <Ionicons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Earnings</Text>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>🧑</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* TOP EARNINGS CARD */}
        <Pressable onPress={() => navigation.navigate("EarningDetails")} >

        <View style={styles.topCard}>
          <Text style={styles.topSmall}>Earnings: 24 Nov - 30 Nov</Text>
          <Text style={styles.topAmount}>₹1500</Text>
        </View>
        </Pressable>

        {/* POCKET */}
        <Text style={styles.sectionTitle}>Pocket</Text>

        <View style={styles.whiteCard}>
          <TouchableOpacity style={styles.rowItem} activeOpacity={0.8}  onPress={() => navigation.navigate("Balance")} >
            <Text style={styles.rowLabel}>Pocket Balance</Text>
            <View style={styles.rowRight}>
              <Text style={styles.rowValue}>₹1500</Text>
              <Ionicons name="chevron-forward" size={18} color="#000" />
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity onPress={() => navigation.navigate("EarningDetails")} style={styles.rowItem} activeOpacity={0.8}>
            <Text style={styles.rowLabel}>Available Cash Limit</Text>
            <View style={styles.rowRight}>
              <Text style={styles.rowValue}>₹800</Text>
              <Ionicons name="chevron-forward" size={18} color="#000" />
            </View>
          </TouchableOpacity>

          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.outlineBtn}>
              <Text style={styles.outlineBtnText}>Deposit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.fillBtn}>
              <Text style={styles.fillBtnText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* CUSTOMER TIPS */}
        <View style={[styles.whiteCard, { marginTop: 12 }]}>
          <TouchableOpacity style={styles.rowItem} activeOpacity={0.8}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="payments" size={18} color="#000" />
              <Text style={[styles.rowLabel, { marginLeft: 10 }]}>
                Customer Tips Balance
              </Text>
            </View>

            <View style={styles.rowRight}>
              <Text style={styles.rowValue}>₹80</Text>
              <Ionicons name="chevron-forward" size={18} color="#000" />
            </View>
          </TouchableOpacity>
        </View>

        {/* MORE SERVICE */}
        <Text style={[styles.sectionTitle, { textAlign: "center", marginTop: 16 }]}>
          More service
        </Text>

        <View style={styles.grid}>
          <ServiceCard
            amount="₹1500"
            title="Payout"
            subtitle="02Nov - 07Nov"
            icon={<Ionicons name="wallet-outline" size={18} color="#000" />}
          />
          <ServiceCard
            title="Customer Tips Statement"
            icon={<MaterialIcons name="receipt-long" size={18} color="#000" />}
          />
          <ServiceCard
            title="Deduction Statement"
            icon={<Ionicons name="document-text-outline" size={18} color="#000" />}
          />
          <ServiceCard
            title="Pocket Statement"
            icon={<Ionicons name="reader-outline" size={18} color="#000" />}
          />
        </View>

        {/* Spacer so bottom bar doesn't overlap */}
        <View style={{ height: 110 }} />
      </ScrollView>

      {/* GO ONLINE BUTTON */}
      <View style={styles.goOnlineWrap}>
        <TouchableOpacity style={styles.goOnlineBtn} activeOpacity={0.9}>
          <Text style={styles.goOnlineText}>Go Online</Text>
        </TouchableOpacity>
      </View>

      {/* BOTTOM NAV (VISUAL) */}
      <View style={styles.bottomNav}>
        <View style={styles.navItem}>
          <Ionicons name="car-outline" size={18} color="#999" />
          <Text style={styles.navText}>Drive</Text>
        </View>

        <View style={styles.navItem}>
          <Ionicons name="cash-outline" size={18} color="#ff7a18" />
          <Text style={[styles.navText, { color: "#ff7a18" }]}>Earnings</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

/* ---------- Components ---------- */
function ServiceCard({ amount, title, subtitle, icon }) {
  return (
    <TouchableOpacity style={styles.serviceCard} activeOpacity={0.9}>
      <View style={styles.serviceTopRow}>
        {amount ? <Text style={styles.serviceAmount}>{amount}</Text> : <View />}
        {icon}
      </View>

      <Text style={styles.serviceTitle}>{title}</Text>
      {!!subtitle && <Text style={styles.serviceSub}>{subtitle}</Text>}
    </TouchableOpacity>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },

  header: {
    height: 52,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 13, fontWeight: "600", color: "#000" },

  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 14 },

  content: { paddingHorizontal: 14, paddingBottom: 10 },

  topCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginTop: 8,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    alignItems: "center",
  },
  topSmall: { fontSize: 10.5, color: "#666", fontWeight: "500" },
  topAmount: { marginTop: 6, fontSize: 20, fontWeight: "700", color: "#000" },

  sectionTitle: {
    marginTop: 14,
    marginBottom: 8,
    fontSize: 11,
    fontWeight: "600",
    color: "#666",
  },

  whiteCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  rowItem: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowLabel: { fontSize: 12, color: "#000", fontWeight: "500" },
  rowRight: { flexDirection: "row", alignItems: "center" },
  rowValue: { fontSize: 12, fontWeight: "600", marginRight: 6 },

  divider: { height: 1, backgroundColor: "#eee" },

  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 6,
  },

  outlineBtn: {
    flex: 1,
    borderWidth: 1.2,
    borderColor: "#ff7a18",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    marginRight: 8,
  },
  outlineBtnText: { color: "#ff7a18", fontWeight: "600", fontSize: 12 },

  fillBtn: {
    flex: 1,
    backgroundColor: "#ff7a18",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    marginLeft: 8,
  },
  fillBtnText: { color: "#fff", fontWeight: "600", fontSize: 12 },

  grid: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  serviceCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    minHeight: 78,
  },
  serviceTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  serviceAmount: { fontSize: 12, fontWeight: "700", color: "#000" },
  serviceTitle: { marginTop: 8, fontSize: 11.5, fontWeight: "600", color: "#000" },
  serviceSub: { marginTop: 2, fontSize: 10, color: "#999" },

  goOnlineWrap: {
    position: "absolute",
    bottom: 52,
    left: 0,
    right: 0,
    paddingHorizontal: 60,
  },
  goOnlineBtn: {
    backgroundColor: "#ff1f1f",
    borderRadius: 16,
    paddingVertical: 10,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  goOnlineText: { color: "#fff", fontWeight: "700", fontSize: 12 },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 52,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navItem: { alignItems: "center", justifyContent: "center" },
  navText: { fontSize: 10, color: "#999", marginTop: 2 },
});
