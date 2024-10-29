import React from "react";
import { Modal, View, Image, StyleSheet, TouchableOpacity } from "react-native";

interface ImageModalProps {
    isVisible: boolean;
    image_url: string;
    onClose: () => void;
  }

const ImageModal: React.FC<ImageModalProps> = ({ isVisible, image_url, onClose }) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.modalBackground} onPress={onClose} />
        <Image source={{ uri: image_url }} style={styles.modalImage} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  modalImage: {
    width: "90%",
    height: "70%",
    borderRadius: 10,
  },
});

export default ImageModal;