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
import {
  deleteImage,
  getMarketDetailById,
  getMyMarket,
  MarketData,
  MyMarketData,
  sendImage,
  UpdateMarket,
  updateMarket,
} from "../../api/market/market_api";
import { Picker } from "@react-native-picker/picker";
import { useAuth } from "../../context/auth.context";

interface EditMyMarketProps {
  closeModal: () => void;
  itemData?: {
    id: string;
    product_name: string;
    price: number;
    product_type: string;
    color: string;
    origin: string;
    describe: string;
    image: string;
  };
  postId: string;
  onUpdate: () => void;
}

const EditMyMarket: React.FC<EditMyMarketProps> = ({
  closeModal,
  itemData,
  postId,
  onUpdate,
}) => {
  const [marketData, setMarketData] = useState<MarketData>();
  const [selectedImage, setSelectedImage] = useState<string>();

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await getMarketDetailById(postId as string);
        console.log(response);
        if (typeof response === "object" && response.status === 200) {
          setMarketData(response.data);
          setSelectedImage(response.data.ListImage[0]?.image_url || "");
          setFormData({
            color: response.data.color || "",
            description: response.data.description || "",
            price: response.data.price || 0,
            origin: response.data.origin || "",
            product_name: response.data.product_name || "",
            product_type: response.data.product_type || "koi",
          });
          setImages(
            response.data.ListImage.map((image) => ({
              id: image.id,
              image_url: image.image_url,
            }))
          );
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Failed to fetch market data:", error);
      }
    };
    fetchMarketData();
  }, [postId]);

  const [images, setImages] = useState<{ id: string; image_url: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<UpdateMarket>({
    color: "",
    description: "",
    price: 0,
    origin: "",
    product_name: "",
    product_type: "koi",
  });

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
      setImages([
        ...images,
        { id: new Date().toISOString(), image_url: imageUri },
      ]);
    }
  };
  const handleRemoveImage = (indexToRemove: number) => {
    const imageToRemove = images[indexToRemove];

    Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa hình ảnh này?", [
      {
        text: "Hủy",
        onPress: () => console.log("Xóa bị hủy"),
        style: "cancel",
      },
      {
        text: "Xóa",
        onPress: async () => {
          try {
            console.log(imageToRemove.id);
            const deleteResponse = await deleteImage(imageToRemove.id);
            if (typeof deleteResponse === "string") {
              throw new Error(deleteResponse);
            }
            setImages(images.filter((_, index) => index !== indexToRemove));
          } catch (error) {
            Alert.alert(
              "Error",
              error instanceof Error
                ? error.message
                : "Failed to delete the image"
            );
          }
        },
      },
    ]);
  };

  const updateField = (field: keyof UpdateMarket, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "price" ? Number(value) : value,
    }));
  };
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      console.log(formData);
      console.log(postId);
      const response = await updateMarket(formData, postId || "");
      if (typeof response === "string") {
        throw new Error(response);
      }
      for (const image of images) {
        const imageResponse = await sendImage(postId, {
          image_url: image.image_url,
        }); // Adjust according to your image data structure
        if (typeof imageResponse === "string") {
          throw new Error(imageResponse); // Handle error for image upload
        }
      }
      Alert.alert("Success", "Market post updated successfully!");
      onUpdate();
      closeModal();
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Failed to update market post"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Chỉnh Sửa Sản Phẩm</Text>

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
      <Pressable style={styles.imagePicker} onPress={handleImagePicker}>
        <Text style={styles.imagePickerText}>Chọn ảnh</Text>
      </Pressable>

      <ScrollView horizontal style={styles.imageList}>
        {images.map((img, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image
              source={{ uri: img.image_url }}
              style={styles.selectedImage}
            />
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 40,
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
  formField: {
    marginBottom: 15,
  },
});

export default EditMyMarket;
