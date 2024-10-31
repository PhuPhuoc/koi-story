import React, { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { THEME_COLOR } from "../../constants/const";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";

const uploadImageToFirebase = async (uri: string) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = `images/${Date.now()}_${uri.split("/").pop()}`;
    const storageRef = ref(storage, filename);

    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

const AddConsult = ({ closeModal }: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [question, setQuestion] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Denied",
        "Please enable permission to access photos."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async () => {
    if (!title || !description || !question || images.length === 0) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }
    setLoading(true);
    const imageUrls: string[] = [];
    for (const image of images) {
      const url = await uploadImageToFirebase(image);
      if (url) {
        imageUrls.push(url);
      } else {
        Alert.alert("Upload Error", "Failed to upload some images.");
      }
    }

    console.log("Uploaded Image URLs:", imageUrls);
    setLoading(false);
    closeModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>Thêm bài hỏi</Text>

      <Text style={styles.label}>Tiêu đề</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập tiêu đề"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Mô tả</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Nhập mô tả"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Hình ảnh</Text>
      <Pressable style={styles.imagePicker} onPress={handleImagePicker}>
        <Text style={styles.imagePickerText}>Chọn ảnh</Text>
      </Pressable>

      <ScrollView horizontal style={styles.imageList}>
        {images.map((img, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: img }} style={styles.selectedImage} />
            <Pressable
              style={styles.removeImageButton}
              onPress={() => handleRemoveImage(index)}
            >
              <Text style={styles.removeImageText}>×</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.submitButton]}
          onPress={handleSubmit}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Tạo</Text>
          )}
        </Pressable>
        <Pressable
          style={[styles.button, styles.cancelButton]}
          onPress={closeModal}
        >
          <Text style={styles.buttonText}>Hủy</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 15,
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: "top",
    padding: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  imagePicker: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    alignItems: "center",
  },
  imagePickerText: {
    color: "#333",
    fontWeight: "bold",
  },
  imageList: {
    flexDirection: "row",
    marginBottom: 10,
  },
  imageContainer: {
    position: "relative",
    marginRight: 10,
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  removeImageButton: {
    position: "absolute",
    top: 0,
    right: -4,
    backgroundColor: "#e1e1e1",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  removeImageText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  button: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  submitButton: {
    backgroundColor: THEME_COLOR,
  },
  cancelButton: {
    backgroundColor: "#999",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AddConsult;
