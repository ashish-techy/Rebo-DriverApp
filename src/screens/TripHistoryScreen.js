import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const DATA = [
  { id: "1", title: "Vnaz To Kasbapeth", time: "06:59", amount: 360 },
  { id: "2", title: "Vnaz To Kasbapeth", time: "06:59", amount: 360 },
  { id: "3", title: "Vnaz To Kasbapeth", time: "06:59", amount: 360 },
  { id: "4", title: "Vnaz To Kasbapeth", time: "06:59", amount: 360 },
  { id: "5", title: "Vnaz To Kasbapeth", time: "06:59", amount: 360 },
];

export default function TripHistoryScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("TripDetails", { trip: item })}
      activeOpacity={0.8}
    >
      <View style={styles.rowBetween}>
        <Text style={styles.tripTitle}>{item.title}</Text>

        <View style={styles.amountRow}>
          <Text style={styles.amount}>₹{item.amount}</Text>
          <Ionicons name="chevron-forward" size={18} color="#999" />
        </View>
      </View>

      <Text style={styles.time}>{item.time}</Text>
      <Text style={styles.cash}>Cash Collected: 0</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} />
        <Text style={styles.headerTitle}>Trip History</Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={styles.date}>Jan 4, SUN</Text>

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    paddingHorizontal: 16,
    margin: 10
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
    marginVertical: 10,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  tripTitle: {
    fontSize: 14,
    fontWeight: "600",
  },

  amountRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  amount: {
    fontSize: 14,
    fontWeight: "600",
    marginRight: 4,
  },

  time: {
    fontSize: 12,
    color: "#8E8E93",
    marginTop: 6,
  },

  cash: {
    fontSize: 12,
    color: "#8E8E93",
    marginTop: 2,
  },
});