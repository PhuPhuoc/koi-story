import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../../context/auth.context";

interface FengShuiModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
}

const FengShuiModal: React.FC<FengShuiModalProps> = ({ visible, onClose,onSave }) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [gender, setGender] = useState("male");
  const { userData } = useAuth();
  const handleSave = async () => {
    const user_id = userData?.id;
    if (!user_id || !selectedYear) {
      return;
    }
    try {
      const response = await fetch(
        "http://api.koistory.site/api/v1/fates/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user_id,
            year_of_birth: selectedYear,
            gender: gender,
          }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        onClose();
        onSave();
      } else {
        console.error("Server Error:", result);
      }
    } catch (error) {
      console.error("Request Error:", error);
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
              showsVerticalScrollIndicator={false}
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

          <Text style={styles.subtitle}>Chọn giới tính</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={gender}
              onValueChange={(value) => setGender(value)}
            >
              <Picker.Item label="Nam" value="male" />
              <Picker.Item label="Nữ" value="female" />
            </Picker>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.pressableButton, styles.button]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Tính</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.cancelButton, styles.button]}
              onPress={onClose}
            >
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
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "gray",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
  scrollContainer: {
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
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
  },
  yearText: {
    fontSize: 16,
  },
  selectedYearText: {
    color: "#000",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginTop: 15,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  pressableButton: {
    backgroundColor: "#00E5EE",
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
    fontWeight: "bold",
  },
});

export default FengShuiModal;
