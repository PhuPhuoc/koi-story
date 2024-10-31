import React, { useEffect, useState } from "react";
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
import InfoRegisterModal from "./info_register_modal";
import { useAuth } from "../../context/auth.context";
import { getSellers } from "../../api/authen/auth_api";

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

interface SellerData {
  user_id: string;
  address: string;
  location: string;
  phone_number: string;
}

const UserFengShui: React.FC<UserFengShuiProps> = ({ openModal }) => {
  const { recommended_koi } = dataUserFengShui as FengShui;
  const [modalVisible, setModalVisible] = useState(false);
  const [sellers, setSellers] = useState<SellerData[]>([]);
  const { userData } = useAuth();
  const user_id = userData?.id;

  const fetchSellersData = async (id: string) => {
    try {
      const response = await getSellers(id);
      if (response && "data" in response && Array.isArray(response.data)) {
        setSellers(response.data);
      } else {
        console.error(
          "Error fetching sellers or invalid data format:",
          response
        );
      }
    } catch (error) {
      console.error("Failed to fetch sellers:", error);
    }
  };

  useEffect(() => {
    if (user_id) {
      fetchSellersData(user_id);
    }
  }, [user_id]);

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
    <View>
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

      <View style={styles.inforSellerContainer}>
        {sellers.length > 0 ? (
          <FlatList
            data={sellers}
            keyExtractor={(item) => item.user_id}
            renderItem={({ item }) => (
              <View style={styles.sellerItem}>
                <Text style={styles.subTitle}>Thông tin người bán</Text>
                <Text style={styles.sellerInfo}>
                  <Text style={styles.sellerInfoLabel}>Địa chỉ:</Text>{" "}
                  {item.address}
                </Text>
                <Text style={styles.sellerInfo}>
                  <Text style={styles.sellerInfoLabel}>Thành phố:</Text>{" "}
                  {item.location}
                </Text>
                <Text style={styles.sellerInfo}>
                  <Text style={styles.sellerInfoLabel}>SĐT:</Text>{" "}
                  {item.phone_number}
                </Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noSellerText}>Chưa có thông tin người bán</Text>
        )}

        <TouchableOpacity
          style={styles.inforSellerButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.inforSellerText}>
            Đăng ký thông tin người bán
          </Text>
        </TouchableOpacity>
      </View>

      <InfoRegisterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        user_id={user_id ?? ""}
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
  inforSellerContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    margin: 10,
    elevation: 10,
    borderRadius: 25,
    borderColor: "black",
    alignItems: "center",
  },
  sellerItem: {
    marginBottom: 15,
  },
  sellerInfo: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
    marginTop: 10,
  },
  sellerInfoLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  noSellerText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  inforSellerButton: {
    backgroundColor: THEME_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  inforSellerText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UserFengShui;
