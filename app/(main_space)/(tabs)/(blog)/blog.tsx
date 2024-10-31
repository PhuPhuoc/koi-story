import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import dummy from "../../../../dummy_data/dummy_blog.json";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CarouselComponent from "../../../../components/carousel/carousel";
import { MaterialIcons } from "@expo/vector-icons";
import { THEME_COLOR } from "../../../../constants/const";

const typeBlog = Array.from(new Set(dummy.map((item) => item.type_blog)));

import { useRouter } from "expo-router";
import { getCategory } from "../../../../api/blog/blog_api";
interface CategoryItem {
  id: string;
  name: string;
}
const BlogPage = () => {
  const [selectedTypeBlog, setSelectedTypeBlog] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [uniqueTitles, setUniqueTitles] = useState<CategoryItem[]>([]);
  const route = useRouter();

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await getCategory();
        if (typeof response === "object" && response.status === 200) {
          const titles = response.data.map((item) => ({
            id: item.id,
            name: item.name,
          }));
          setUniqueTitles(titles);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Failed to fetch market data:", error);
      }
    };
    fetchMarketData();
  }, []);

  const filteredData = selectedTypeBlog
  ? dummy.filter((item) => item.type_blog === selectedTypeBlog)
  : dummy;

  const renderFilterItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.filterCard,
        selectedTypeBlog === item && styles.selectedFilterCard,
      ]}
      onPress={() => setSelectedTypeBlog(item === selectedTypeBlog ? null : item)}
    >
      <MaterialIcons
        name="filter-list"
        size={24}
        color="black"
        style={styles.icon}
      />
      <Text style={styles.filterText} numberOfLines={1} ellipsizeMode="tail">
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({
    item,
  }: {
    item: {
      id: number;
      title: string;
      author: string;
      content: string;
      image: string;
    };
  }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => route.navigate("blog_detail/1")}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.artName}>{item.title}</Text>
        <Text style={styles.author}>{item.author}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.content}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const handleRefresh = async () => {
    setLoading(false);
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <Text style={styles.title1}>Tư vấn cá Koi phong thuỷ</Text>
        </View>

        <View style={styles.iconContainer}>
          <Text style={styles.title1}>𓆝 𓆟 𓆞 𓆝 𓆟</Text>
        </View>

        <CarouselComponent />

        <FlatList
          data={typeBlog}
          renderItem={renderFilterItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        />

        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          contentContainerStyle={styles.container}
          onRefresh={handleRefresh}
          refreshing={loading}
        />
      </ScrollView>
      
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
  },
  container: {
    padding: 10,
    paddingBottom: 100,
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
    height: 150,
    borderRadius: 8,
  },
  textContainer: {
    marginTop: 10,
  },
  artName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  author: {
    marginTop: 5,
    fontSize: 15,
  },
  description: {
    marginTop: 5,
    fontSize: 14,
    color: "#666",
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
  filterContainer: {
    paddingVertical: 10,
    paddingLeft: 20,
  },
  filterCard: {
    backgroundColor: THEME_COLOR,
    borderRadius: 8,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  selectedFilterCard: {
    backgroundColor: "#cceeff",
  },
  filterText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
    maxWidth: "100%",
  },

  icon: {
    color: "white",
    marginBottom: 5,
  },
});

export default BlogPage;
