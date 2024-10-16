import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';

interface FengShuiModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (yearOfBirth: number) => void;
}

const FengShuiModal: React.FC<FengShuiModalProps> = ({ visible, onClose, onSave }) => {
  const [yearOfBirth, setYearOfBirth] = useState<string>(''); 

  const handleSave = () => {
    const year = parseInt(yearOfBirth, 10);
    if (!isNaN(year)) {
      onSave(year); 
      onClose(); 
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
 
          <Text style={styles.title}>Feng Shui Calculator</Text>

    
          <TextInput
            style={styles.input}
            placeholder="Enter Year of Birth"
            keyboardType="numeric"
            value={yearOfBirth}
            onChangeText={setYearOfBirth}
          />

  
          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={handleSave} />
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Cancel" color="red" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 10, 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonContainer: {
    marginBottom: 10,
  },
});

export default FengShuiModal;
