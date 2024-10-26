import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

interface FengShuiModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (yearOfBirth: number) => void;
}

const FengShuiModal: React.FC<FengShuiModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  const handleSave = () => {
    if (selectedYear) {
      onSave(selectedYear);
      onClose();
    }
  };

  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>TÍNH MỆNH</Text>

          <Text style={styles.subtitle}>Chọn ngày sinh</Text>
          <View style={styles.scrollContainer}>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollViewContent}
            >
              {years.map((year) => (
                <TouchableOpacity
                  key={year}
                  onPress={() => setSelectedYear(year)}
                  style={[
                    styles.yearItem,
                    selectedYear === year && styles.selectedYearItem,
                  ]}
                >
                  <Text
                    style={[
                      styles.yearText,
                      selectedYear === year && styles.selectedYearText,
                    ]}
                  >
                    {year}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.pressableButton}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Tính</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
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
    elevation: 300,
  },
  modalContent: {
    width: 350,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  scrollContainer: {
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#000",
  },
  scrollView: {
    maxHeight: 200,
    width: "100%",
  },
  scrollViewContent: {
    width: "100%",
    alignItems: "center",
  },
  yearItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
  },
  selectedYearItem: {
    backgroundColor: "#CDC1FF",
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
  },
  yearText: {
    fontSize: 16,
  },
  selectedYearText: {
    color: "#000",
    fontWeight: "bold",
  },
  buttonContainer: {
    marginVertical: 10,
  },
  pressableButton: {
    backgroundColor: "#8EACCD",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default FengShuiModal;
