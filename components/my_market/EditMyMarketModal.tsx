import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { THEME_COLOR } from "../../constants/const";

interface EditMyMarketProps {
  closeModal: () => void;
  itemData?: {
    id: number;
    product_name: string;
    price: number;
    product_type: string;
    color: string;
    origin: string;
    describe: string;
    image: string;
  };
}

const EditMyMarket: React.FC<EditMyMarketProps> = ({
  closeModal,
  itemData,
}) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [productType, setProductType] = useState("");
  const [color, setColor] = useState("");
  const [origin, setOrigin] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (itemData) {
      setTitle(itemData.product_name);
      setPrice(itemData.price.toString());
      setProductType(itemData.product_type);
      setColor(itemData.color);
      setOrigin(itemData.origin);
      setDescription(itemData.describe);
      setImages([itemData.image]);
    }
  }, [itemData]);

  const handleImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        "Quyền truy cập bị từ chối",
        "Vui lòng cho phép quyền truy cập ảnh."
      );
      return;
    }

    const result: ImagePicker.ImagePickerResult =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      setImages([...images, imageUri]);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = () => {
    console.log("Nút Tạo được nhấn");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Chỉnh Sửa Sản Phẩm</Text>

      <Text style={styles.label}>Tên sản phẩm</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên sản phẩm"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Giá</Text>
      <TextInput
        style={styles.input}
        placeholder="Giá"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Loại sản phẩm</Text>
      <TextInput
        style={styles.input}
        placeholder="Loại sản phẩm"
        value={productType}
        onChangeText={setProductType}
      />

      <Text style={styles.label}>Màu sắc</Text>
      <TextInput
        style={styles.input}
        placeholder="Màu sắc"
        value={color}
        onChangeText={setColor}
      />

      <Text style={styles.label}>Xuất xứ</Text>
      <TextInput
        style={styles.input}
        placeholder="Xuất xứ"
        value={origin}
        onChangeText={setOrigin}
      />

      <Text style={styles.label}>Mô tả</Text>
      <TextInput
        style={styles.descriptionInput}
        placeholder="Mô tả"
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
          <Text style={styles.buttonText}>Sửa</Text>
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
  container: { padding: 20 },
  title: {
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
    borderRadius: 8,
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: "top",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 8,
  },
  imagePicker: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 10,
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
    marginRight: 10,
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
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
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 30,
  },
  submitButton: {
    borderRadius: 25,
    paddingHorizontal: 50,
    backgroundColor: THEME_COLOR,
  },
  cancelButton: {
    borderRadius: 25,
    paddingHorizontal: 50,
    backgroundColor: "#999",
  },
});

export default EditMyMarket;
