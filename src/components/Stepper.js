import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Stepper({ step }) {
  const steps = ["Account", "Vehicle"];

  return (
    <View style={styles.container}>
      {steps.map((label, index) => (
        <React.Fragment key={index}>
          <View style={styles.step}>
            <View
              style={[
                styles.circle,
                index <= step && styles.activeCircle,
              ]}
            >
              <Text
                style={[
                  styles.number,
                  index <= step && styles.activeText,
                ]}
              >
                {index + 1}
              </Text>
            </View>
            <Text style={styles.label}>{label}</Text>
          </View>

          {index !== steps.length - 1 && (
            <View
              style={[
                styles.line,
                index < step && styles.activeLine,
              ]}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
  },

  step: {
    alignItems: "center",
  },

  circle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },

  activeCircle: {
    backgroundColor: "#ff7a18",
  },

  number: {
    fontSize: 12,
    color: "#999",
  },

  activeText: {
    color: "#fff",
    fontWeight: "600",
  },

  label: {
    fontSize: 11,
    marginTop: 4,
    color: "#666",
  },

  line: {
    width: 40,
    height: 2,
    backgroundColor: "#eee",
    marginHorizontal: 6,
  },

  activeLine: {
    backgroundColor: "#ff7a18",
  },
});

