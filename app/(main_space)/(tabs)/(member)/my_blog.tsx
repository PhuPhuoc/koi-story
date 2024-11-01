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
import EditMyMarket from "../../../../components/my_market/EditMyMarketModal";

export default function CreateProductForm() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalEditVisible, setIsModalEditVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const route = useRouter();
  const [marketData, setMarketData] = useState<MyMarketData[]>();
  const user_id = useAuth().userData?.id ?? "";

  useEffect(() => {
    fetchMarketData();
  }, []);

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

  const handleRefresh = async () => {
    setLoading(false);
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const openEditModal = (postId: string) => {
    setSelectedPostId(postId); // Set the selected post_id here
    setIsModalEditVisible(true);
  };

  const closeEditModal = () => {
    setIsModalEditVisible(false);
    setSelectedPostId(null); // Reset selected post_id when modal is closed
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={marketData}
        keyExtractor={(item) => item.post_id.toString()}
        contentContainerStyle={styles.listContainer}
        onRefresh={handleRefresh}
        refreshing={loading}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => route.navigate(`post_market_detail/${item.post_id}`)}
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
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>{item.price.toLocaleString()}đ</Text>
                  <TouchableOpacity
                    style={styles.editButton} // Use the new style here
                    onPress={() => openEditModal(item.post_id)} // Pass item.post_id to openEditModal
                  >
                    <Text style={styles.editButtonText}>Chỉnh sửa</Text>
                  </TouchableOpacity>
                </View>
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
                <AddMyMarket  closeModal={closeModal} onUpdate={fetchMarketData}/>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalEditVisible}
        onRequestClose={closeEditModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedPostId && (
              <EditMyMarket
                postId={selectedPostId}
                closeModal={closeEditModal}
                onUpdate={fetchMarketData}
              />
            )}
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
  editButton: {
    backgroundColor: THEME_COLOR,
    padding: 6,
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 8,
  },
  editButtonText: {
    color: "#fff", // Text color
    fontSize: 16, // Font size for the button text
    fontWeight: "bold",
  },
  priceContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center", 
    justifyContent: "space-between",
    // Aligns items vertically in the center
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
    fontSize: 20,
    color: "#888",
    marginVertical: 5,
    fontWeight: "bold",
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
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderTopRightRadius: 8,
    zIndex: 1,
  },
  ribbonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
