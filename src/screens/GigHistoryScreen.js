import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DATA = [
  { id: "1", status: "Completed", rating: 3, amount: 360 },
  { id: "2", status: "Completed", rating: 0, amount: 360 },
  { id: "3", status: "Completed", rating: 0, amount: 360 },
  { id: "4", status: "Completed", rating: 0, amount: 360 },
  { id: "5", status: "Completed", rating: 3, amount: 360 },
  { id: "6", status: "Completed", rating: 2, amount: 360 },
  { id: "7", status: "Incomplete", rating: 2, amount: 100 },
  { id: "8", status: "Incomplete", rating: 0, amount: 0 },
];

export default function GigHistoryScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* Top Row */}
      <View style={styles.rowBetween}>
        <View style={styles.row}>
          <View
            style={[
              styles.statusBadge,
              item.status === "Incomplete" && styles.incompleteBadge,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                item.status === "Incomplete" && styles.incompleteText,
              ]}
            >
              {item.status}
            </Text>
          </View>

          {item.rating > 0 && (
            <View style={styles.ratingBadge}>
              <Text style={styles.starText}>
                {"★".repeat(item.rating)}
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.amount}>
          ₹{item.amount}
        </Text>
      </View>

      {/* Bottom Text */}
      <Text style={styles.title}>Trips Earning</Text>
      <Text style={styles.subText}>1 trips 0d 15h</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} />
        <Text style={styles.headerTitle}>Gig History</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Date */}
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
    backgroundColor: "#F6F7FB",
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: StatusBar.currentHeight + 10 || 40,
    margin: 10
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  date: {
    fontSize: 14,
    color: "#888",
    marginVertical: 10,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    // margin: 10
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  statusBadge: {
    backgroundColor: "#E6F4EA",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },

  incompleteBadge: {
    backgroundColor: "#FDECEA",
  },

  statusText: {
    fontSize: 12,
    color: "#45817F",
    fontWeight: "500",
  },

  incompleteText: {
    color: "#FF710B",
  },

  ratingBadge: {
    backgroundColor: "#FFF3E0",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    marginLeft: 6,
  },

  starText: {
    fontSize: 12,
    color: "#F57C00",
  },

  amount: {
    fontSize: 16,
    fontWeight: "600",
  },

  title: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
  },

  subText: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
});