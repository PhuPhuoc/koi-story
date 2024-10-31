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
import { CreateMarket, createMarket } from "../../api/market/market_api";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";
import { useAuth } from "../../context/auth.context";
import { Picker } from "@react-native-picker/picker";

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
interface AddMyMarketProps {
  closeModal: () => void;
}

const AddMyMarket: React.FC<AddMyMarketProps> = ({ closeModal }) => {
  const { userData } = useAuth();
  const [formData, setFormData] = useState<CreateMarket>({
    color: "",
    description: "",
    price: 0,
    origin: "",
    product_name: "",
    product_type: "koi",
    user_id: "",
    listImageUrls: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const updateField = (field: keyof CreateMarket, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "price" ? Number(value) : value,
    }));
  };

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

  const validateForm = (): boolean => {
    const requiredFields: (keyof CreateMarket)[] = [
      "color",
      "description",
      "price",
      "origin",
      "product_name",
      "product_type",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        Alert.alert(
          "Validation Error",
          `${field.replace(/_/g, " ")} is required.`
        );
        return false;
      }
    }

    if (images.length === 0) {
      Alert.alert("Validation Error", "At least one image is required.");
      return false;
    }

    if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      Alert.alert("Validation Error", "Price must be a valid positive number.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    console.log("Submitting form with data:", formData);

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      formData.listImageUrls = [];

      for (const image of images) {
        const url = await uploadImageToFirebase(image);
        if (url) {
          formData.listImageUrls.push(url);
        } else {
          Alert.alert("Upload Error", "Failed to upload some images.");
        }
      }

      formData.user_id = userData?.id ?? "";
      const response = await createMarket(formData);
      if (typeof response === "string") {
        throw new Error(response);
      }
      Alert.alert("Success", "Market post created successfully!");
      closeModal();
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Failed to create market post"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.formTitle}>Thêm bài đăng</Text>

      {/* Form Fields */}
      <View style={styles.formField}>
        <Text style={styles.label}>Tên sản phẩm</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên sản phẩm"
          value={formData.product_name}
          onChangeText={(value) => updateField("product_name", value)}
        />
      </View>

      <View style={styles.formField}>
        <Text style={styles.label}>Giá</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập giá sản phẩm"
          value={formData.price.toString()}
          onChangeText={(value) => updateField("price", value)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formField}>
        <Text style={styles.label}>Màu sắc</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập màu sắc"
          value={formData.color}
          onChangeText={(value) => updateField("color", value)}
        />
      </View>

      <View style={styles.formField}>
        <Text style={styles.label}>Loại sản phẩm</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.product_type}
            onValueChange={(value) => updateField("product_type", value)}
            style={styles.picker}
          >
            <Picker.Item label="Koi" value="koi" />
            <Picker.Item label="Decoration" value="decoration" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>
      </View>

      <View style={styles.formField}>
        <Text style={styles.label}>Xuất xứ</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập xuất xứ"
          value={formData.origin}
          onChangeText={(value) => updateField("origin", value)}
        />
      </View>

      <View style={styles.formField}>
        <Text style={styles.label}>Mô tả</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Nhập mô tả"
          value={formData.description}
          onChangeText={(value) => updateField("description", value)}
          multiline
          numberOfLines={4}
        />
      </View>

      <Text style={styles.label}>Hình ảnh</Text>
      <Pressable
        style={[
          styles.imagePicker,
          formData.listImageUrls.length === 0 && styles.required,
        ]}
        onPress={handleImagePicker}
      >
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
          style={[
            styles.button,
            styles.submitButton,
            isSubmitting && styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              Tạo
            </Text>
          )}
        </Pressable>
        <Pressable
          style={[styles.button, styles.cancelButton]}
          onPress={closeModal}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>Hủy</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    height: 40,
    overflow: "hidden",
    justifyContent: "center",
  },
  picker: {
    fontSize: 14,
    height: 40,
  },
  container: {
    padding: 15,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  formField: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
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
  required: {
    borderWidth: 1,
    borderColor: "red",
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
    top: -8,
    right: -8,
    backgroundColor: "#e1e1e1",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
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
    marginBottom: 50,
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
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AddMyMarket;
