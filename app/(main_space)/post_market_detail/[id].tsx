import {
  Text,
  Image,
  StyleSheet,
  ScrollView,
  View,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import DUMMY_DATA from "../../../dummy_data/dummy_market_detail.json";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feedback from "../../../components/feedback/feedback_market";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const PostMarketDetail = () => {
  const [selectedImage, setSelectedImage] = useState<string>(
    DUMMY_DATA.image[0]
  );
  const [liked, setLiked] = useState<boolean>(false);
  const route = useRouter();
  const [showAddressTooltip, setShowAddressTooltip] = useState(false);

  const handlePressIn = () => {
    setShowAddressTooltip(true);
  };

  const handlePressOut = () => {
    setShowAddressTooltip(false);
  };

  const handleImagePress = (image: string) => {
    setSelectedImage(image);
  };

  const handlePhonePress = () => {
    Linking.openURL(`tel:${DUMMY_DATA.phone_number}`);
  };

  const renderKoiInfo = () => (
    <View style={styles.koiInfoContainer}>
      <View style={styles.infoRow}>
        <Text style={styles.title3}>Thông tin chi tiết </Text>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="palette" size={24} color="#666" />
          <Text style={styles.infoLabel}>Màu sắc:</Text>
          <Text style={styles.infoValue}>Kohaku</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="ruler" size={24} color="#666" />
          <Text style={styles.infoLabel}>Kích thước:</Text>
          <Text style={styles.infoValue}>45-50cm</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="fish" size={24} color="#666" />
          <Text style={styles.infoLabel}>Loại:</Text>
          <Text style={styles.infoValue}>Jumbo Tosai</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="calendar" size={24} color="#666" />
          <Text style={styles.infoLabel}>Tuổi:</Text>
          <Text style={styles.infoValue}>5 tuổi</Text>
        </View>
      </View>
    </View>
  );

  const renderOtherInfo = () => (
    <View style={styles.koiInfoContainer}>
      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="palette" size={24} color="#666" />
          <Text style={styles.infoLabel}>Loại:</Text>
          <Text style={styles.infoValue}>Thức ăn</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="ruler" size={24} color="#666" />
          <Text style={styles.infoLabel}>Kích thước:</Text>
          <Text style={styles.infoValue}>40 - 50 cm</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="fish" size={24} color="#666" />
          <Text style={styles.infoLabel}>Loại:</Text>
          <Text style={styles.infoValue}>Jumbo Tosai</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="calendar" size={24} color="#666" />
          <Text style={styles.infoLabel}>Sử dụng:</Text>
          <Text style={styles.infoValue}>1 năm</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <Stack.Screen options={{ headerShown: false }} />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => route.back()}
        >
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            style={styles.mainImage}
            source={{ uri: selectedImage }}
          />
        </View>
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
          data={DUMMY_DATA.image}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: image }) => (
            <TouchableOpacity
              onPress={() => handleImagePress(image)}
              style={[
                styles.thumbnailContainer,
                selectedImage === image && styles.selectedThumbnailContainer,
              ]}
            >
              <Image
                resizeMode="contain"
                style={styles.thumbnail}
                source={{ uri: image }}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.thumbnailList}
        />

        <View style={styles.infoContainer}>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <View style={styles.typeChip}>
              <FontAwesome5 name="fish" size={20} color="white" />
              <Text style={styles.typeText}>{DUMMY_DATA.product_type}</Text>
            </View>
            <Text style={styles.price}>
              {DUMMY_DATA.price.toLocaleString()} VND
            </Text>
          </View>
          <Text style={styles.title}>{DUMMY_DATA.product_name}</Text>

          <Text style={styles.title2}>Giới thiệu</Text>
          <Text style={styles.description}>{DUMMY_DATA.describe}</Text>

          <View
            style={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={handlePhonePress}
              >
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
                  <Text style={styles.tooltipText}>
                    {DUMMY_DATA.seller_address}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {DUMMY_DATA.product_type === "koi"
          ? renderKoiInfo()
          : renderOtherInfo()}

        <GestureHandlerRootView style={styles.container}>
          <Feedback />
        </GestureHandlerRootView>

        {/* <View style={styles.fishContainer}>
          <FontAwesome6 name="fish-fins" size={24} color="#6499E9" />
          <FontAwesome6 name="fish-fins" size={24} color="#6499E9" />
          <FontAwesome6 name="fish-fins" size={24} color="#6499E9" />
          <FontAwesome6 name="fish-fins" size={24} color="#6499E9" />
        </View> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
