import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Stepper from "../../src/components/Stepper";
import ImagePreviewModal from "../components/ImagePreviewModal";

export default function UploadProfilePhotoScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  /* ================= PICK FROM GALLERY ================= */
  const pickFromGallery = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  /* ================= CAPTURE FROM CAMERA ================= */
const captureFromCamera = async () => {
  const permission =
    await ImagePicker.requestCameraPermissionsAsync();

  if (!permission.granted) {
    alert("Camera permission is required");
    return;
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
};


  /* ================= UPLOAD SIMULATION ================= */
  const submitUpload = () => {
    setUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          navigation.goBack(); // or mark document verified
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          Document Verification
        </Text>
        <View style={{ width: 22 }} />
      </View>

      {/* STEPPER */}
      <Stepper step={1} />

      {/* TITLE */}
      <Text style={styles.title}>
        Upload Your Profile{`\n`}Photo
      </Text>

      {/* CENTER CONTENT */}
      <View style={styles.centerArea}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => image && setPreview(true)}
        >
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.dashedCircle} />
          )}
        </TouchableOpacity>

        {!image && (
          <>
            <TouchableOpacity
              style={styles.uploadBtn}
              onPress={pickFromGallery}
            >
              <Ionicons
                name="image-outline"
                size={18}
                color="#fff"
              />
              <Text style={styles.uploadText}>Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.uploadBtn, styles.cameraBtn]}
              onPress={captureFromCamera}
            >
              <Ionicons
                name="camera-outline"
                size={18}
                color="#fff"
              />
              <Text style={styles.uploadText}>Camera</Text>
            </TouchableOpacity>

            <Text style={styles.hint}>
              Make sure you show your full face and shoulders
              and take off your sunglasses or hat
            </Text>
          </>
        )}
      </View>

      {/* BOTTOM BAR */}
      {image && (
        <View style={styles.bottomBar}>
          {uploading ? (
            <View style={styles.progressWrap}>
              <View
                style={[
                  styles.progressBar,
                  { width: `${progress}%` },
                ]}
              />
              <Text style={styles.progressText}>
                Uploading {progress}%
              </Text>
            </View>
          ) : (
            <>
              <TouchableOpacity
                style={styles.reuploadBtn}
                onPress={pickFromGallery}
              >
                <Text style={styles.reuploadText}>
                  Re-upload
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.submitBtn}
                onPress={submitUpload}
              >
                <Text style={styles.submitText}>
                  Submit
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}

      {/* PREVIEW MODAL */}
      <ImagePreviewModal
        visible={preview}
        uri={image}
        onClose={() => setPreview(false)}
      />
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  headerTitle: { fontSize: 16, fontWeight: "600" },

  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 16,
  },

  centerArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  dashedCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "dashed",
    marginBottom: 24,
  },

  image: {
    width: 240,
    height: 240,
    borderRadius: 100,
  },

  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff7a18",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  cameraBtn: {
    backgroundColor: "#ff9a3c",
  },

  uploadText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },

  hint: {
    fontSize: 11,
    color: "#777",
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 8,
  },

  bottomBar: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    alignItems: "center",
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

  progressWrap: {
    flex: 1,
  },

  progressBar: {
    height: 6,
    backgroundColor: "#ff7a18",
    borderRadius: 4,
    marginBottom: 6,
  },

  progressText: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
  },
});
