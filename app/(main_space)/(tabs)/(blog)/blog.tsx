import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { THEME_COLOR } from "../../../../constants/const";
import { useRouter } from "expo-router";
import { getCategory, BlogData } from "../../../../api/blog/blog_api";
import CarouselComponent from "../../../../components/carousel/carousel";

const BlogPage = () => {
  const [categories, setCategories] = useState<BlogData[]>([]);
  const route = useRouter();

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await getCategory();
        if (typeof response === "object" && response.status === 200) {
          setCategories(response.data);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Failed to fetch market data:", error);
      }
    };
    fetchMarketData();
  }, []);

  const typeBlog = Array.from(new Set(categories.map((item) => item.name)));

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.root}>
      <View style={styles.titleContainer}>
        <Text style={styles.title1}>Tư vấn cá Koi phong thuỷ</Text>
      </View>

      <View style={styles.iconContainer}>
        <Text style={styles.title1}>𓆝 𓆟 𓆞 𓆝 𓆟</Text>
      </View>

      <CarouselComponent />

      <View style={styles.filterContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[styles.filterCard]}
            onPress={() => route.push(`category_detail/${category.id}`)}
          >
            <MaterialIcons
              name="filter-list"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Text
              style={styles.filterText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
  },
  titleContainer: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  title1: {
    fontSize: 28,
    fontWeight: "bold",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  categoryCard: {
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  categoryDescription: {
    marginTop: 5,
    fontSize: 15,
    color: "#666",
  },
  fateContainer: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  fateElement: {
    marginRight: 10,
    fontSize: 14,
    color: "#444",
  },
  filterContainer: {
    paddingVertical: 10,
    paddingLeft: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 90,
  },
  filterCard: {
    backgroundColor: THEME_COLOR,
    borderRadius: 8,
    width: "auto",
    minWidth: 80,
    height: 80,
    padding: 7,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  selectedFilterCard: {
    backgroundColor: "#cceeff",
  },
  filterText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  icon: {
    color: "white",
    marginBottom: 5,
  },
});

export default BlogPage;
