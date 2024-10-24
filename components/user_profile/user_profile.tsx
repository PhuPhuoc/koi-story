import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import dataProfile from '../../dummy_data/dummy_user_profile.json';
import UserFengShui from './user_feng_shui';
import FengShuiModal from './feng_shui_modal';

interface UserProfile {
  id: number;
  display_name: string;
  profile_picture_url: string;
  user_type: string;
  create_add: string;
}

const UserProfileScreen = () => {
  const { display_name, profile_picture_url, user_type } = dataProfile as UserProfile;
  
  const [yearOfBirth, setYearOfBirth] = useState<number | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const saveYearOfBirth = (year: number) => {
    setYearOfBirth(year); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Image
        source={{ uri: profile_picture_url }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>{display_name}</Text>
      <Text style={styles.userType}>{user_type}</Text>
      <UserFengShui/>

      <Button title="Feng Shui Calculator" onPress={openModal} />

      <FengShuiModal
        visible={modalVisible}
        onClose={closeModal}
        onSave={saveYearOfBirth}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 100,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 30, 
    fontWeight: 'bold', 
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  userType: {
    fontSize: 18,
    color: '#666',
  },
});

export default UserProfileScreen;
