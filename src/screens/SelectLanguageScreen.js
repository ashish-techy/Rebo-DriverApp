import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";


export default function SelectLanguageScreen({ navigation }) {
  const [selected, setSelected] = useState("English");

  return (
    <SafeAreaView style={styles.container}>
      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Language</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* ===== GLOBE ICON ===== */}
      <View style={styles.iconWrap}>
        <View style={styles.iconCircle}>
          <Ionicons name="globe-outline" size={26} color="#ff7a18" />
        </View>
      </View>

      {/* ===== TITLE ===== */}
      <Text style={styles.title}>Hi PARTNER, Select Language</Text>

      {/* ===== LANGUAGE LIST ===== */}
      {LANGUAGES.map((item) => {
        const active = selected === item.label;

        return (
          <TouchableOpacity
            key={item.label}
            activeOpacity={0.85}
            style={[styles.card, { backgroundColor: item.bg }]}
            onPress={() => setSelected(item.label)}
          >
            <Text style={styles.langText}>{item.label}</Text>

            <View
              style={[
                styles.radio,
                active && styles.radioActive,
              ]}
            >
              {active && <View style={styles.radioDot} />}
            </View>
          </TouchableOpacity>
        );
      })}

      {/* ===== BUTTON ===== */}
      <TouchableOpacity
        style={[
          styles.btn,
          selected && styles.btnActive,
        ]}
        disabled={!selected}
      >
        <Text
          style={[
            styles.btnText,
            selected && styles.btnTextActive,
          ]}
        >
          Proceed
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* ===== DATA ===== */
const LANGUAGES = [
  { label: "हिंदी", bg: "#e6f0fa" },
  { label: "English", bg: "#e6f7e6" },
  { label: "বাংলা", bg: "#e8f7f2" },
  { label: "मराठी", bg: "#fde9df" },
  { label: "తెలుగు", bg: "#fff4d6" },
  { label: "தமிழ்", bg: "#e5f6f8" },
  { label: "മലയാളം", bg: "#efe2ff" },
  { label: "ಕನ್ನಡ", bg: "#fdeee3" },
];

/* ===== STYLES ===== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 26,
  },

  /* Header */
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  /* Icon */
  iconWrap: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 12,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: "#ff7a18",
    justifyContent: "center",
    alignItems: "center",
  },

  /* Title */
  title: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 14,
  },

  /* Cards */
  card: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  langText: {
    fontSize: 14,
    fontWeight: "500",
  },

  /* Radio */
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: "#999",
    justifyContent: "center",
    alignItems: "center",
  },

  radioActive: {
    borderColor: "#ff7a18",
  },

  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ff7a18",
  },

  /* Button */
  btn: {
    height: 46,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 10,
  },

  btnActive: {
    backgroundColor: "#ff7a18",
  },

  btnText: {
    color: "#999",
    fontWeight: "600",
  },

  btnTextActive: {
    color: "#fff",
  },
});
