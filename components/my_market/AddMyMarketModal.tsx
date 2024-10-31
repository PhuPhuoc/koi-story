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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { THEME_COLOR } from "../../constants/const";

const AddMyMarket = ({ closeModal }: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([
    "https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/036/053/722/small/ai-generated-cat-wearing-heart-shaped-sunglasses-lying-on-a-pillow-free-photo.jpeg",
    "https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg",
  ]);

  const [isTitleFocused, setTitleFocused] = useState(false);
  const [isDescriptionFocused, setDescriptionFocused] = useState(false);

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

  const handleSubmit = () => {
    if (!title || !description || images.length === 0) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }
    closeModal();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.formTitle}>Thêm bài đăng</Text>
      <Text style={styles.label}>Tên sản phẩm</Text>
      <TextInput
        style={[styles.input, isTitleFocused && styles.inputFocused]}
        placeholder="Nhập tên sản phẩm"
        value={title}
        onChangeText={setTitle}
        onFocus={() => setTitleFocused(true)}
        onBlur={() => setTitleFocused(false)}
      />

      <Text style={styles.label}>Giá</Text>
      <TextInput
        style={[styles.input, isTitleFocused && styles.inputFocused]}
        placeholder="Nhập giá sản phẩm"
        value={title}
        onChangeText={setTitle}
        onFocus={() => setTitleFocused(true)}
        onBlur={() => setTitleFocused(false)}
      />

      <Text style={styles.label}>Địa chỉ người bán</Text>
      <TextInput
        style={[styles.input, isTitleFocused && styles.inputFocused]}
        placeholder="Nhập địa chỉ người bán"
        value={title}
        onChangeText={setTitle}
        onFocus={() => setTitleFocused(true)}
        onBlur={() => setTitleFocused(false)}
      />

      <Text style={styles.label}>SĐT</Text>
      <TextInput
        style={[styles.input, isTitleFocused && styles.inputFocused]}
        placeholder="Nhập số điện thoại"
        value={title}
        onChangeText={setTitle}
        onFocus={() => setTitleFocused(true)}
        onBlur={() => setTitleFocused(false)}
      />

      <Text style={styles.label}>Giá</Text>
      <TextInput
        style={[styles.input, isTitleFocused && styles.inputFocused]}
        placeholder="Nhập giá sản phẩm"
        value={title}
        onChangeText={setTitle}
        onFocus={() => setTitleFocused(true)}
        onBlur={() => setTitleFocused(false)}
      />

      <Text style={styles.label}>Loại sản phẩm</Text>
      <TextInput
        style={[styles.input, isTitleFocused && styles.inputFocused]}
        placeholder="Nhập loại sản phẩm"
        value={title}
        onChangeText={setTitle}
        onFocus={() => setTitleFocused(true)}
        onBlur={() => setTitleFocused(false)}
      />

      <Text style={styles.label}>Mô tả</Text>
      <TextInput
        style={[
          styles.input,
          styles.descriptionInput,
          isDescriptionFocused && styles.inputFocused,
        ]}
        placeholder="Nhập mô tả"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        onFocus={() => setDescriptionFocused(true)}
        onBlur={() => setDescriptionFocused(false)}
      />

      <Text style={styles.label}>Hỉnh ảnh</Text>
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
          <Text style={styles.buttonText}>Tạo</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.cancelButton]}
          onPress={closeModal}
        >
          <Text style={styles.buttonText}>Hủy</Text>
        </Pressable>
      </View>
    </ScrollView>
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
  inputFocused: {
    borderColor: "#80B3FF",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: "top",
    padding: 8,
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
  // Style cho nút xóa
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
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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

export default AddMyMarket;
