import {
  Text,
  Image,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Linking,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feedback from "../../../components/feedback/feedback_market";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  getMarketDetailById,
  MarketData,
} from "../../../api/market/market_api";
import ImageModal from "../../../components/image_modal/image_modal";

const PostMarketDetail = () => {
  const { id } = useLocalSearchParams();
  const route = useRouter();
  const [selectedImage, setSelectedImage] = useState<string>();
  const [liked, setLiked] = useState<boolean>(false);
  const [showAddressTooltip, setShowAddressTooltip] = useState(false);
  const [marketData, setMarketData] = useState<MarketData>();
  const [isImageModalVisible, setImageModalVisible] = useState(false);

  const openImageModal = () => {
    setImageModalVisible(true);
  };

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await getMarketDetailById(id as string);

        if (typeof response === "object" && response.status === 200) {
          setMarketData(response.data);
          setSelectedImage(response.data.ListImage[0]?.image_url || "");
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Failed to fetch market data:", error);
      }
    };
    fetchMarketData();
  }, [id]);

  const handlePressIn = () => setShowAddressTooltip(true);
  const handlePressOut = () => setShowAddressTooltip(false);
  const handleImagePress = (image: string) => setSelectedImage(image);
  const handlePhonePress = () => {
    if (marketData?.phone_number) {
      Linking.openURL(`tel:${marketData.phone_number}`);
    }
  };

  const renderKoiInfo = (color: string, origin: string) => (
    <View style={styles.koiInfoContainer}>
      <View style={styles.infoRow}>
        <Text style={styles.title3}>Thông tin chi tiết </Text>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="palette" size={24} color="#666" />
          <Text style={styles.infoLabel}>Màu sắc:</Text>
          <Text style={styles.infoValue}>{color}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="calendar" size={24} color="#666" />
          <Text style={styles.infoLabel}>Nguồn gốc:</Text>
          <Text style={styles.infoValue}>{origin}</Text>
        </View>
      </View>
    </View>
  );

  const renderHeader = () => (
    <>
      <TouchableOpacity style={styles.backButton} onPress={() => route.back()}>
        <AntDesign name="left" size={24} color="black" />
      </TouchableOpacity>

      <Pressable style={styles.imageContainer} onPress={() => openImageModal()}>
        <Image
          resizeMode="contain"
          style={styles.mainImage}
          source={{ uri: selectedImage }}
        />
      </Pressable>

      <TouchableOpacity
        style={styles.likeButton}
        onPress={() => setLiked(!liked)}
      >
        {liked ? (
          <AntDesign name="heart" size={24} color="red" />
        ) : (
          <AntDesign name="hearto" size={24} color="red" />
        )}
      </TouchableOpacity>

      <FlatList
        horizontal
        data={marketData?.ListImage}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleImagePress(item.image_url)}
            style={[
              styles.thumbnailContainer,
              selectedImage === item.image_url &&
                styles.selectedThumbnailContainer,
            ]}
          >
            <Image
              resizeMode="contain"
              style={styles.thumbnail}
              source={{ uri: item.image_url }}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.thumbnailList}
      />

      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <View style={styles.typeChip}>
            <FontAwesome5 name="fish" size={20} color="white" />
            <Text style={styles.typeText}>{marketData?.product_type}</Text>
          </View>
          <Text style={styles.price}>
            {marketData?.price.toLocaleString()} VND
          </Text>
        </View>
        <Text style={styles.title}>{marketData?.product_name}</Text>

        <Text style={styles.title2}>Giới thiệu</Text>
        <Text style={styles.description}>{marketData?.description}</Text>

        <View style={styles.actionContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handlePhonePress}>
              <Feather name="phone-call" size={20} color="#FFFFFF" />
              <Text style={styles.buttonText}>GỌI ĐIỆN</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.addressContainer}>
            <TouchableOpacity
              style={styles.circularIconBackground}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              <FontAwesome name="map-marker" size={32} color="white" />
            </TouchableOpacity>
            {showAddressTooltip && (
              <View style={styles.tooltip}>
                <Text style={styles.tooltipText}>{marketData?.address}</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {marketData && renderKoiInfo(marketData.color, marketData.origin)}

      <GestureHandlerRootView style={styles.container}>
        <Feedback post_id={id as string} />
      </GestureHandlerRootView>
      <ImageModal
        isVisible={isImageModalVisible}
        image_url={selectedImage ?? ""}
        onClose={() => setImageModalVisible(false)}
      />
    </>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <FlatList
        data={[{ key: "content" }]}
        renderItem={() => renderHeader()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  addressContainer: {
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  addressLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  circularIconBackground: {
    backgroundColor: "red",
    borderRadius: 20,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  tooltip: {
    position: "absolute",
    top: -40,
    left: -120,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    zIndex: 10,
    width: 150,
  },
  tooltipText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "left",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 10,
    zIndex: 1,
    padding: 10,
  },
  likeButton: {
    position: "absolute",
    top: 40,
    right: 10,
    zIndex: 1,
    padding: 10,
  },
  imageContainer: {
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 60,
  },
  mainImage: {
    width: "100%",
    height: 300,
  },
  thumbnailList: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  thumbnailContainer: {
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  selectedThumbnailContainer: {
    borderWidth: 2,
    borderColor: "#6499E9",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  thumbnail: {
    width: 80,
    height: 80,
    backgroundColor: "white",
  },
  infoContainer: {
    gap: 3,
    padding: 20,
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#000",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 10,
    fontStyle: "italic",
  },
  title2: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "600",
    color: "#a69f9f",
    marginBottom: 10,
  },
  title3: {
    fontSize: 20,
    fontWeight: "600",
    color: "#a69f9f",
    marginBottom: 20,
  },
  price: {
    fontSize: 18,
    padding: 4,
    color: "#000",
    marginBottom: 7,
    fontWeight: "900",
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "700",
    lineHeight: 40,
  },
  address: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#89CFF0",
    padding: 12,
    borderRadius: 15,
    flex: 1,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 16,
  },
  buyButton: {
    backgroundColor: "#34C759",
    marginRight: 0,
  },
  typeChip: {
    backgroundColor: "#F95454",
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
    marginBottom: 10,
    flexDirection: "row",
  },
  typeText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "800",
    marginLeft: 7,
  },
  nguHanhContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  nguHanhTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  nguHanhImage: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  nguHanhDescription1: {
    fontSize: 16,
    fontWeight: "semibold",
    color: "#333",
    marginBottom: 20,
    lineHeight: 30,
  },
  nguHanhDescription2: {
    fontSize: 16,
    color: "#666464af",
    lineHeight: 30,
    marginBottom: 20,
    textAlign: "center",
  },
  fishContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  koiInfoContainer: {
    backgroundColor: "white",
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoRow: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingBottom: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  infoLabel: {
    fontSize: 16, // Increased font size
    color: "#666",
    marginLeft: 12, // Increased spacing after icon
    marginRight: 8, // Increased spacing before value
    width: 100, // Fixed width for labels to align values
  },
  infoValue: {
    fontSize: 16, // Increased font size
    color: "#333",
    fontWeight: "600",
    flex: 1, // Allow value to take remaining space
  },
});

export default PostMarketDetail;
