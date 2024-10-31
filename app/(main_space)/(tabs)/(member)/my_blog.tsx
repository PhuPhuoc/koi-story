import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
} from "react-native";
import { THEME_COLOR } from "../../../../constants/const";
import dummy from "../../../../dummy_data/dummy_blog.json";
import AddMyMarket from "../../../../components/my_market/AddMyMarketModal";
import { useRouter } from "expo-router";
import { getMyMarket, MyMarketData } from "../../../../api/market/market_api";
import { useAuth } from "../../../../context/auth.context";

export default function CreateProductForm() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const route = useRouter();
  const [marketData, setMarketData] = useState<MyMarketData>();
  const user_id = useAuth().userData?.id ?? "";

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await getMyMarket(user_id);
        if (typeof response === "object" && response.status === 200) {
          setMarketData(response.data); 
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Failed to fetch market data:", error);
      }
    };
    fetchMarketData();
  }, []);

  const handleRefresh = async () => {
    setLoading(false);
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={marketData}
        keyExtractor={(item) => item.post_id.toString()} // Ensure `post_id` is a string
        contentContainerStyle={styles.listContainer}
        onRefresh={handleRefresh}
        refreshing={loading}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => route.navigate(`post_market_detail/${item.post_id}`)} // Dynamically pass item.post_id
          >
            <View>
              <View style={styles.imageContainer}>
                <View
                  style={[
                    styles.ribbonContainer,
                    { backgroundColor: THEME_COLOR },
                  ]}
                >
                  <Text style={styles.ribbonText}>{item.product_type}</Text>
                </View>
                <Image
                  source={{ uri: item.image_url }}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
              <View>
                <Text style={styles.artName}>{item.product_name}</Text>
                <Text style={styles.price}>{(item.price)}đ</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

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
            <AddMyMarket closeModal={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContentContainer: {
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  textArea: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: THEME_COLOR,
    padding: 10,
    borderRadius: 99,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#999",
    padding: 10,
    borderRadius: 99,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 100,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
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
  floatingButtonText: {
    color: "#fff",
    fontSize: 14,
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
    height: 700,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  textContainer: {
    marginTop: 10,
  },
  artName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "#888",
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  buttonText: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },
  listContainer: {
    padding: 8,
    paddingBottom: 100,
  },
  imageContainer: {
    position: "relative",
    aspectRatio: 1,
    marginBottom: 8,
  },
  ribbonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderTopRightRadius: 8,
    zIndex: 1,
  },
  ribbonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
