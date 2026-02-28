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

const STATES = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Maharashtra",
  "Pune",
  "Madhya Pradesh",
  "Odisha",
];

export default function StatePickerModal({ visible, onSelect, onClose }) {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={22} onPress={onClose} />
        <Text style={styles.headerTitle}>Search your state</Text>
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} />
        <TextInput placeholder="Search your state" />
      </View>

      <ScrollView>
        {STATES.map((state) => (
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
    height: 200,
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
