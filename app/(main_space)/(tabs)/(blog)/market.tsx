import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import dummy from "../../../../dummy_data/dummy_post_info.json";
import { THEME_COLOR } from "../../../../constants/const";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";

const MarketPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(dummy);
  const route = useRouter();
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = dummy.filter((item) =>
      item.artName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => {

          const ribbonText = item.post_type === 1 ? "Tư vấn" : "Hỏi Đáp";
          const ribbonColor = item.post_type === 1 ? THEME_COLOR : "yellow";

          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => route.navigate("post_market_detail/1")}
            >
              <View style={styles.imageContainer}>
                <View
                  style={[
                    styles.ribbonContainer,
                    { backgroundColor: ribbonColor },
                  ]}
                >
                  <Text style={styles.ribbonText}>{ribbonText}</Text>
                </View>
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.artName} numberOfLines={2}>
                  {item.artName}
                </Text>
                <Text style={styles.description} numberOfLines={1}>
                  {item.description}
                </Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Entypo name="clock" size={18} />
                <Text style={{ marginLeft: 5 }} numberOfLines={1}>
                  {item.created_at}-{item.place}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
  searchInput: {
    margin: 10,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    margin: 5,
    flex: 1,
    maxWidth: "48%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: "relative",
  },
  ribbonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
    zIndex: 1,
  },
  ribbonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  textContainer: {
    marginTop: 10,
    overflow: "hidden",
  },
  artName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    color: "red",
    marginVertical: 5,
    fontWeight: "bold",
  },
  description: {
    fontSize: 12,
    color: "#666",
  },
});

export default MarketPage;
