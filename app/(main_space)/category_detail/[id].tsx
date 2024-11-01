import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const CategoryDetail = () => {
  const { id } = useLocalSearchParams();
  const route = useRouter();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://api.koistory.site/api/v1/post-blog/category/${id}`
        );
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const renderItem = ({
    item,
  }: {
    item: {
      post_id: string;
      title: string;
      author_name: string;
      image: string;
    };
  }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => route.navigate(`blog_detail/${item.post_id}`)}
    >
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_sJtZ9r_VRYrLeAxARsC5icePZPNBZnv-4w&s",
        }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.artName}>{item.title}</Text>
        <Text style={styles.author}>{item.author_name}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ title: "List Blog" }} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.post_id}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
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
});

export default CategoryDetail;
