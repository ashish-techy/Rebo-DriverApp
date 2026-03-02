import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";


const CITIES = [
  "Mumbai",
  "Pune",
  "Nagpur",
  "Nashik",
  "Thane",
  "Aurangabad",
  "Solapur",
  "Amravati",
  "Kolhapur",
  "Nanded",
  "Latur",
  "Dhule",
  "Jalgaon",
  "Akola",
  "Ahmednagar",
  "Parbhani",
  "Satara",
  "Sangli",
  "Beed",
  "Buldhana",
  "Washim",
  "Osmanabad",
  "Jalna",
  "Hingoli",
];

export default function CityPickerModal({ visible, onSelect, onClose }) {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={22} onPress={onClose} />
        <Text style={styles.headerTitle}>Search your city</Text>
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} />
        <TextInput placeholder="Search your city" />
      </View>

      <ScrollView>
        {CITIES.map((state) => (
          <TouchableOpacity
            key={state}
            style={styles.item}
            onPress={() => onSelect(state)}
          >
            <Ionicons name="location-outline" size={18} />
            <Text style={styles.itemText}>{state}</Text>
            <Ionicons name="chevron-forward" size={18} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 50,
    // height: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    padding: 10,
    backgroundColor: "#f3f3f3",
    borderRadius: 8,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    justifyContent: "space-between",
  },
  itemText: {
    flex: 1,
    marginLeft: 10,
  },
});
