import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Modal } from "react-native";
import AddConsult from "../../../../components/my_consult/AddConsultModal";
import { THEME_COLOR } from "../../../../constants/const";
import ConsultPostMember from "../../../../components/post_consult/consult_card_member";

const MyConsultPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <ConsultPostMember />
      </View>
      
      <TouchableOpacity style={styles.floatingButton} onPress={openModal}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <AddConsult closeModal={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatingButton: {
    position: "absolute",
    right: 20,
    bottom: 100,
    backgroundColor: THEME_COLOR,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },
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
});

export default MyConsultPage;
