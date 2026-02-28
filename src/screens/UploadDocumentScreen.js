import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Stepper from "../components/Stepper";
import ImagePreviewModal from "../components/ImagePreviewModal";

export default function UploadDocumentScreen({ navigation, route }) {
  const {
    title = "Take A Photo Of Your Vehicle Registration (RC)",
    hint = "Make sure your document is clearly visible and readable.",
  } = route.params || {};

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [uploading, setUploading] = useState(false);

  /* ===== PICK IMAGE ===== */
const pickImage = async (fromCamera = false) => {
  setShowPicker(false);

  // ⏳ WAIT for modal to close
  setTimeout(async () => {
    const permission = fromCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission required");
      return;
    }

    const result = fromCamera
      ? await ImagePicker.launchCameraAsync({
          allowsEditing: false,
          quality: 1,
        })
      : await ImagePicker.launchImageLibraryAsync({
          allowsEditing: false,
          quality: 1,
        });

    if (!result.canceled) {
      simulateUpload(result.assets[0].uri);
    }
  }, 300); // 🔥 THIS DELAY FIXES IT
};


  /* ===== FAKE UPLOAD (ANIMATION) ===== */
  const simulateUpload = (uri) => {
    setUploading(true);
    setTimeout(() => {
      setImage(uri);
      setUploading(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Document Verification</Text>
        <View style={{ width: 22 }} />
      </View>

      <Stepper step={1} />

      <Text style={styles.title}>{title}</Text>

      {/* CENTER */}
      <View style={styles.centerArea}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => image && setPreview(true)}
        >
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.dashedBox} />
          )}
        </TouchableOpacity>

        {/* UPLOAD BUTTON */}
        {!image && !uploading && (
          <TouchableOpacity
            style={styles.uploadBtn}
            onPress={() => setShowPicker(true)}
          >
            <Ionicons name="cloud-upload-outline" size={18} color="#fff" />
            <Text style={styles.uploadText}>Upload</Text>
          </TouchableOpacity>
        )}

        {/* UPLOADING */}
        {uploading && (
          <View style={styles.uploading}>
            <ActivityIndicator size="large" color="#ff7a18" />
            <Text style={{ marginTop: 10 }}>Uploading...</Text>
          </View>
        )}
      </View>

      {/* BOTTOM ACTIONS */}
      {image && !uploading && (
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.reuploadBtn}
            onPress={() => setShowPicker(true)}
          >
            <Text style={styles.reuploadText}>Re-upload</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitBtn}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.hint}>{hint}</Text>

      {/* IMAGE PREVIEW */}
      <ImagePreviewModal
        visible={preview}
        uri={image}
        onClose={() => setPreview(false)}
      />

      {/* CAMERA / GALLERY PICKER */}
      <Modal transparent animationType="slide" visible={showPicker}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setShowPicker(false)}
        >
          <View style={styles.pickerSheet}>
            <TouchableOpacity
              style={styles.pickerBtn}
              onPress={() => pickImage(true)}
            >
              <Ionicons name="camera-outline" size={20} />
              <Text style={styles.pickerText}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.pickerBtn}
              onPress={() => pickImage(false)}
            >
              <Ionicons name="image-outline" size={20} />
              <Text style={styles.pickerText}>
                Upload from Gallery
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 16,
    paddingHorizontal: 20,
  },

  centerArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  dashedBox: {
    width: 300,
    height: 220,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "dashed",
    marginBottom: 20,
  },

  image: {
    width: 300,
    height: 220,
    borderRadius: 12,
  },

  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff7a18",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
  },

  uploadText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },

  bottomBar: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },

  reuploadBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ff7a18",
    paddingVertical: 12,
    borderRadius: 10,
    marginRight: 8,
    alignItems: "center",
  },

  reuploadText: {
    color: "#ff7a18",
    fontWeight: "600",
  },

  submitBtn: {
    flex: 1,
    backgroundColor: "#ff7a18",
    paddingVertical: 12,
    borderRadius: 10,
    marginLeft: 8,
    alignItems: "center",
  },

  submitText: {
    color: "#fff",
    fontWeight: "600",
  },

  hint: {
    fontSize: 11,
    color: "#777",
    textAlign: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  uploading: {
  alignItems: "center",
  marginTop: 20,
},

modalOverlay: {
  flex: 1,
  justifyContent: "flex-end",
  backgroundColor: "rgba(0,0,0,0.4)",
},

pickerSheet: {
  backgroundColor: "#fff",
  padding: 20,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
},

pickerBtn: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 14,
},

pickerText: {
  fontSize: 16,
  marginLeft: 12,
},

});
