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
import { GestureHandlerRootView } from "react-native-gesture-handler";
import dummy from "../../../../dummy_data/dummy_blog.json";
import CarouselComponent from "../../../../components/carousel/carousel";
import { useAuth } from "../../../../context/auth.context";
import { useRouter } from "expo-router";

const Recommend = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState();
  const { userData } = useAuth();
  const route = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://api.koistory.site/api/v1/post-blog/recommend/${userData?.id}`
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
  }, [userData?.id]);

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

  const handleRefresh = async () => {
    setLoading(false);
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <ScrollView>
        <View style={styles.titleContainer}>
          <Text style={styles.title1}>Cá koi hợp mệnh</Text>
        </View>

        <View style={styles.iconContainer}>
          <Text style={styles.title1}>𓆝 𓆟 𓆞 𓆝 𓆟</Text>
        </View>

        <CarouselComponent />
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.post_id}
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
    padding: 20,
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
  price: {
    fontSize: 16,
    color: "#888",
    marginVertical: 5,
  },
  description: {
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
  author: {
    marginTop: 5,
    fontSize: 15,
  },
});
export default Recommend;
