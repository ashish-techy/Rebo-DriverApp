import React from "react";
import {
  Modal,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ImagePreviewModal({
  visible,
  uri,
  onClose,
}) {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.close}
          onPress={onClose}
        >
          <Ionicons name="close" size={26} color="#fff" />
        </TouchableOpacity>

        <Image source={{ uri }} style={styles.image} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  close: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  image: {
    width: "90%",
    height: "60%",
    resizeMode: "contain",
  },
});
