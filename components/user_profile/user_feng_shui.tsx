import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import dataUserFengShui from "../../dummy_data/dummy_user_feng_shui.json";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { THEME_COLOR } from "../../constants/const";

interface Koi {
  koi_id: number;
  type: string;
  color: string;
  size: string;
  old: string;
  image: string;
}

interface FengShui {
  recommended_koi: Koi[];
}

interface UserFengShuiProps {
  openModal: () => void;
}

const UserFengShui: React.FC<UserFengShuiProps> = ({ openModal }) => {
  const { recommended_koi } = dataUserFengShui as FengShui;

  const formatAge = (age: string) => {
    if (age.toLowerCase().includes("month")) {
      return `${age.split(" ")[0]} M`;
    } else if (age.toLowerCase().includes("year")) {
      return `${age.split(" ")[0]} Y`;
    } else if (age.toLowerCase().includes("days")) {
      return `${age.split(" ")[0]} D`;
    }
    return age;
  };

  const renderKoiInfo = (koi: Koi) => (
    <View style={styles.koiInfoContainer}>
      <Image
        source={{
          uri: koi.image,
        }}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.infoRow}>
        <MaterialCommunityIcons name="palette" size={18} color="#666" />
        <Text style={styles.infoLabel}>Color:</Text>
        <Text style={styles.infoValue} numberOfLines={1} ellipsizeMode="tail">
          {koi.color}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <MaterialCommunityIcons name="ruler" size={18} color="#666" />
        <Text style={styles.infoLabel}>Size:</Text>
        <Text style={styles.infoValue} numberOfLines={1} ellipsizeMode="tail">
          {koi.size}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <MaterialCommunityIcons name="fish" size={18} color="#666" />
        <Text style={styles.infoLabel}>Type:</Text>
        <Text style={styles.infoValue} numberOfLines={1} ellipsizeMode="tail">
          {koi.type}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <MaterialCommunityIcons name="calendar" size={18} color="#666" />
        <Text style={styles.infoLabel}>Old:</Text>
        <Text style={styles.infoValue} numberOfLines={1} ellipsizeMode="tail">
          {formatAge(koi.old)}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subTitle}>Đề xuất cá Koi hợp mệnh:</Text>
        <TouchableOpacity style={styles.button} onPress={openModal}>
          <Text style={styles.buttonText}>Tính mệnh</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={recommended_koi}
        keyExtractor={(item) => item.koi_id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.koiContainer}>{renderKoiInfo(item)}</View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    margin: 10,
    elevation: 10,
    borderRadius: 25,
    borderColor: "black",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: THEME_COLOR,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  koiContainer: {
    flex: 1,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#fff",
    margin: 5,
    maxWidth: "48%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    height: 100,
    width: "100%",
    borderRadius: 10,
    marginBottom: 8,
  },
  koiInfoContainer: {
    paddingHorizontal: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 16,
    color: "#666",
    marginLeft: 4,
    width: 60,
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
    flex: 1,
  },
});

export default UserFengShui;
