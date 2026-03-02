import React, { createContext, useContext, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

const AlertContext = createContext();

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used inside AlertProvider");
  }
  return context;
};

export const AlertProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState({});

  const showAlert = (opts) => {
    setOptions(opts || {});
    setVisible(true);
  };

  const closeAlert = () => {
    setVisible(false);
    if (options.onCancel) options.onCancel();
  };

  const confirmAction = () => {
    setVisible(false);
    if (options.onConfirm) options.onConfirm();
  };

  const type = options.type || "confirm";

  const isConfirm = type === "confirm";
  const isSuccess = type === "success";
  const isError = type === "error";

  const getIcon = () => {
    if (isSuccess) return require("../../assets/images/success.png");
    if (isError) return require("../../assets/images/error.png");
    return require("../../assets/images/confirm.png");
  };

  const getBgColor = () => {
    if (isSuccess) return "#159640";
    if (isError) return "#FF3838";
    return "#FF7A00";
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      <Modal transparent visible={visible} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.container}>
            {/* Close */}
            <TouchableOpacity style={styles.closeIcon} onPress={closeAlert}>
              <Text style={{ fontSize: 18 }}>✕</Text>
            </TouchableOpacity>

            {/* Image Icon */}
            <View
              style={[
                styles.iconWrapper,
                // { backgroundColor: getBgColor() },
              ]}
            >
              <Image
                source={getIcon()}
                style={styles.iconImage}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.title}>{options.title || "Alert"}</Text>

            <Text style={styles.message}>{options.message || ""}</Text>

            {isConfirm ? (
              <View style={styles.row}>
                <TouchableOpacity style={styles.noButton} onPress={closeAlert}>
                  <Text style={styles.noText}>No</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.yesButton}
                  onPress={confirmAction}
                >
                  <Text style={styles.yesText}>Yes</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={[styles.okButton, { backgroundColor: getBgColor() }]}
                onPress={closeAlert}
              >
                <Text style={styles.okText}>Ok</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </AlertContext.Provider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: 320,
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    elevation: 8,
  },

  closeIcon: {
    position: "absolute",
    top: 12,
    right: 12,
  },

  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  iconImage: {
    width: 70,
    height: 70,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    color: "#000",
  },

  message: {
    fontSize: 13,
    color: "#777",
    textAlign: "center",
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  noButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },

  yesButton: {
    flex: 1,
    backgroundColor: "#000",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },

  okButton: {
    width: "100%",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },

  noText: {
    color: "#000",
    fontWeight: "500",
  },

  yesText: {
    color: "#fff",
    fontWeight: "500",
  },

  okText: {
    color: "#fff",
    fontWeight: "600",
  },
});
