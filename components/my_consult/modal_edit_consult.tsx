import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // Import thư viện ImagePicker
import { THEME_COLOR } from "../../constants/const";

type Consult = {
  id: number;
  name: string;
  avatar: string;
  created_at: string;
  post_type: string;
  title: string;
  question: string;
  content: string;
  image_url: string[];
};

interface ModalEditProps {
  visible: boolean;
  onClose: () => void;
  consult: Consult;
  onSave: (updatedConsult: Consult) => void;
}

const ModalEdit: React.FC<ModalEditProps> = ({
  visible,
  onClose,
  consult,
  onSave,
}) => {
  const [title, setTitle] = useState(consult.title);
  const [question, setQuestion] = useState(consult.question);
  const [content, setContent] = useState(consult.content);
  const [images, setImages] = useState<string[]>(consult.image_url);

  const handleSave = () => {
    const updatedConsult = {
      ...consult,
      title,
      question,
      content,
      image_url: images,
    };
    onSave(updatedConsult);
    onClose();
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

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Chỉnh sửa thông tin</Text>

          <Text style={styles.label}>Tiêu đề</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Tiêu đề"
          />

          <Text style={styles.label}>Câu hỏi</Text>
          <TextInput
            style={styles.input}
            value={question}
            onChangeText={setQuestion}
            placeholder="Câu hỏi"
          />

          <Text style={styles.label}>Nội dung</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            value={content}
            onChangeText={setContent}
            placeholder="Nội dung"
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
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Cập nhật</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Hủy</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 370,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
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
  imagePicker: {
    backgroundColor: THEME_COLOR,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  imagePickerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  imageList: {
    maxHeight: 100,
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
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  removeImageText: {
    color: "#fff",
    fontWeight: "bold",
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
    backgroundColor: "#F28705",
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

export default ModalEdit;
