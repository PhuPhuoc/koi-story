import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { THEME_COLOR } from '../../../../constants/const';

export default function CreateProductForm() {
  const [form, setForm] = useState({
    product_name: '',
    price: '',
    seller_address: '',
    phone_number: '',
    description: '',
    product_type: '',
  });

  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', form);
    // Add form submission logic here
  };

  const showForm = () => {
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };

  return (
    <View style={styles.container}>
      {isFormVisible ? (
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text style={styles.title}>Create a Product</Text>

          <Text style={styles.label}>Product Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter product name"
            value={form.product_name}
            onChangeText={(text) => handleChange('product_name', text)}
          />

          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter price"
            value={form.price}
            keyboardType="numeric"
            onChangeText={(text) => handleChange('price', text)}
          />

          <Text style={styles.label}>Seller Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter seller address"
            value={form.seller_address}
            onChangeText={(text) => handleChange('seller_address', text)}
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            value={form.phone_number}
            keyboardType="phone-pad"
            onChangeText={(text) => handleChange('phone_number', text)}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Enter product description"
            value={form.description}
            multiline
            numberOfLines={4}
            onChangeText={(text) => handleChange('description', text)}
          />

          <Text style={styles.label}>Product Type</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter product type"
            value={form.product_type}
            onChangeText={(text) => handleChange('product_type', text)}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={closeForm}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <TouchableOpacity style={styles.floatingButton} onPress={showForm}>
          <Text style={styles.floatingButtonText}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    position: 'relative',
  },
  formContainer: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  textArea: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: THEME_COLOR,
    padding: 10,
    borderRadius: 99,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#999',
    padding: 10,
    borderRadius: 99,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 100,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  floatingButton: {
    backgroundColor: THEME_COLOR,
    width: 50,
    height: 50,
    borderRadius: 30,
    position: 'absolute',
    bottom: 120,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
