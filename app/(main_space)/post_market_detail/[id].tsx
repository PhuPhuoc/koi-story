import {
  Text,
  Image,
  StyleSheet,
  ScrollView,
  View,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import DUMMY_DATA from "../../../dummy_data/dummy_market_detail.json";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const PostMarketDetail = () => {
  const [selectedImage, setSelectedImage] = useState<string>(
    DUMMY_DATA.image[0]
  );
  const [liked, setLiked] = useState<boolean>(false);
  const route = useRouter();

  const handleImagePress = (image: string) => {
    setSelectedImage(image);
  };

  const handlePhonePress = () => {
    Linking.openURL(`tel:${DUMMY_DATA.phone_number}`);
  };

  const renderKoiInfo = () => (
    <View style={styles.koiInfoContainer}>
      <View style={styles.infoRow}>
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
          <Text style={styles.title}>{DUMMY_DATA.product_name}</Text>
          <View style={styles.typeChip}>
            <Text style={styles.typeText}>{DUMMY_DATA.product_type}</Text>
          </View>
          <Text style={styles.price}>
            {DUMMY_DATA.price.toLocaleString()} VND
          </Text>
          <Text style={styles.description}>{DUMMY_DATA.describe}</Text>
          <Text style={styles.address}>
            Address: {DUMMY_DATA.seller_address}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handlePhonePress}>
              <Feather name="phone-call" size={20} color="white" />
              <Text style={styles.buttonText}>Gọi điện</Text>
            </TouchableOpacity>
          </View>
        </View>

        {DUMMY_DATA.product_type === "koi"
          ? renderKoiInfo()
          : renderOtherInfo()}

        <View style={styles.fishContainer}>
          <FontAwesome6 name="fish-fins" size={24} color="#6499E9" />
          <FontAwesome6 name="fish-fins" size={24} color="#6499E9" />
          <FontAwesome6 name="fish-fins" size={24} color="#6499E9" />
          <FontAwesome6 name="fish-fins" size={24} color="#6499E9" />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  },
  selectedThumbnailContainer: {
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  thumbnail: {
    width: 80,
    height: 80,
    backgroundColor: "white",
  },
  infoContainer: {
    padding: 20,
    marginTop: 20,
    backgroundColor: "white",
    marginHorizontal: 10,
    borderRadius: 25,
    shadowColor: "#000",
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: "red",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: "#a69f9f",
  },
  address: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 16,
  },
  buyButton: {
    backgroundColor: "#34C759",
    marginRight: 0,
  },
  typeChip: {
    backgroundColor: "#E0E0E0",
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  typeText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "600",
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
    marginTop: 20,
    padding: 20, // Increased padding for better spacing
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
    marginBottom: 16, // Even spacing between rows
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0", // Light border for visual separation
    paddingBottom: 16, // Padding at bottom of each row
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
