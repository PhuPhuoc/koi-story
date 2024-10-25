import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  FlatList,
  ScrollView,
} from "react-native";
import dataProfile from "../../dummy_data/dummy_user_profile.json";
import UserFengShui from "./user_feng_shui";
import FengShuiModal from "./feng_shui_modal";
import { router } from "expo-router";

interface UserProfile {
  id: number;
  display_name: string;
  profile_picture_url: string;
  user_type: string;
  create_add: string;
}

const UserProfileScreen = () => {
  const { display_name, profile_picture_url, user_type } =
    dataProfile as UserProfile;

  const handleLogOut = () => {
    while (router.canGoBack()) {
      router.back();
    }
    router.replace("/");
  };
  
  const [yearOfBirth, setYearOfBirth] = useState<number | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const saveYearOfBirth = (year: number) => {
    setYearOfBirth(year);
  };

  return (
    <FlatList
      data={[{ key: "1" }]}
      renderItem={() => (
        <View style={{ marginBottom: 20 }}>
          <View style={styles.container}>
            <View style={{ width: "100%" }}>
              <Image
                source={{
                  uri: "https://media.istockphoto.com/id/944812540/photo/mountain-landscape-ponta-delgada-island-azores.jpg?s=612x612&w=0&k=20&c=mbS8X4gtJki3gGDjfC0sG3rsz7D0nls53a0b4OPXLnE=",
                }}
                resizeMode="cover"
                style={{ height: 240, width: "100%", backgroundColor: "red" }}
              />
              <View style={{ flex: 1, alignItems: "center" }}>
                <Image
                  source={{ uri: profile_picture_url }}
                  style={styles.profileImage}
                />
              </View>
            </View>
            <Text style={styles.name}>{display_name}</Text>
            <Text style={styles.userType}>{user_type}</Text>
          </View>
          <UserFengShui />
          <Button title="Feng Shui Calculator" onPress={openModal} />
          <FengShuiModal
            visible={modalVisible}
            onClose={closeModal}
            onSave={saveYearOfBirth}
          />
          <View style={{ padding: 20, marginBottom: 90 }}>
            <Button title="Logout" onPress={handleLogOut}></Button>
          </View>
        </View>
      )}
      keyExtractor={(item) => item.key}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileImage: {
    width: 155,
    height: 155,
    borderRadius: 999,
    borderWidth: 2,
    marginBottom: 20,
    marginTop: -100,
    backgroundColor: "#e1e1e1",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  userType: {
    fontSize: 18,
    color: "#666",
  },
});

export default UserProfileScreen;
