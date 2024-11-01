import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import dataProfile from "../../dummy_data/dummy_user_profile.json";
import UserFengShui from "./user_feng_shui";
import FengShuiModal from "./feng_shui_modal";
import { router } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import { useAuth } from "../../context/auth.context";
interface UserProfile {
  id: number;
  display_name: string;
  profile_picture_url: string;
  user_type: string;
  create_add: string;
  year_of_birth: number;
  feng_shui: string;
}

const UserProfileScreen = () => {
  const {
    display_name,
    profile_picture_url,
    user_type,
    year_of_birth,
    feng_shui,
  } = dataProfile as UserProfile;

  const handleLogOut = () => {
    while (router.canGoBack()) {
      router.back();
    }
    router.replace("/");
  };

  const { userData } = useAuth();

  const [yearOfBirth, setYearOfBirth] = useState<number | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const saveYearOfBirth = (year: number) => {
    setYearOfBirth(year);
  };

  const getFengShuiStyles = (fengShuiElement: string) => {
    switch (fengShuiElement) {
      case "Wood":
        return {
          backgroundColor: "#4CAF50",
          icon: "tree",
          text: "Mộc",
        };
      case "Fire":
        return {
          backgroundColor: "#FF5722",
          icon: "fire",
          text: "Hỏa",
        };
      case "Earth":
        return {
          backgroundColor: "#795548",
          icon: "globe",
          text: "Thổ",
        };
      case "Metal":
        return {
          backgroundColor: "#9E9E9E",
          icon: "circle",
          text: "Kim",
        };
      case "Water":
        return {
          backgroundColor: "#2196F3",
          icon: "water",
          text: "Thủy",
        };
      default:
        return {
          backgroundColor: "#F95454",
          icon: "question",
          text: fengShuiElement,
        };
    }
  };

  const fengShuiStyle = getFengShuiStyles(feng_shui);

  return (
    <ImageBackground
      source={{
        uri: "https://t4.ftcdn.net/jpg/06/74/36/01/360_F_674360149_vI8QdJ3Zw3NakDQrLoJ99MxWuCM1ZYsC.jpg",
      }}
      style={styles.backgroundImage}
    >
      <FlatList
        data={[{ key: "1" }]}
        renderItem={() => (
          <View style={{ marginBottom: 20 }}>
            <View style={styles.container}>
              <View style={{ width: "100%" }}>
                <Image
                  source={{
                    uri: "https://i.redd.it/yxvtrkc3crfz.jpg",
                  }}
                  resizeMode="cover"
                  style={{ height: 240, width: "100%", backgroundColor: "red" }}
                />
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Image
                    source={{ uri: userData?.avatar }}
                    style={styles.profileImage}
                  />
                </View>
              </View>
              <Text style={styles.name}>{userData?.user_name}</Text>
              <Text style={styles.userType}>{user_type}</Text>
              <View style={styles.row}>
                <View style={[styles.ageChip, { backgroundColor: "#00E5EE" }]}>
                  <Text style={styles.ageText}>Sinh năm: {year_of_birth}</Text>
                </View>
                <View
                  style={[
                    styles.typeChip,
                    { backgroundColor: fengShuiStyle.backgroundColor },
                  ]}
                >
                  <FontAwesome5
                    name={fengShuiStyle.icon}
                    size={20}
                    color="white"
                  />
                  <Text style={styles.typeText}>{fengShuiStyle.text}</Text>
                </View>
              </View>
            </View>
            
            <UserFengShui openModal={openModal} />

            <View style={{ padding: 20, marginBottom: 90 }}>
              <TouchableOpacity style={styles.button} onPress={handleLogOut}>
                <Text style={styles.buttonText}>
                  <Entypo name="log-out" size={24} color="white" style={{alignItems:"center"}} />{" "}
                  ĐĂNG XUẤT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
      <FengShuiModal
        visible={modalVisible}
        onClose={closeModal}
        onSave={saveYearOfBirth}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF0000",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  profileImage: {
    width: 155,
    height: 155,
    borderRadius: 999,
    borderWidth: 2,
    marginBottom: 20,
    marginTop: -90,
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
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 14,
  },
  typeChip: {
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  typeText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "800",
    marginLeft: 7,
  },
  ageChip: {
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  ageText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
});

export default UserProfileScreen;
