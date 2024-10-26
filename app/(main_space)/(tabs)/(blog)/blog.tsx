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
import GradientText from "../../../../components/gradient_text/gradient_text";

const BlogPage = () => {
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
    <TouchableOpacity style={styles.card} onPress={() => console.log()}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.artName}>{item.title}</Text>
        <Text>{item.author}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.content}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView style={styles.root}>
      <ScrollView>
        <View style={styles.titleContainer}>
          <Text style={styles.title1}>Tư vấn cá Koi phong thuỷ</Text>
        </View>

        <View style={styles.iconContainer}>
          <Text style={styles.title1}>𓆝 𓆟 𓆞 𓆝 𓆟</Text>
        </View>

        <CarouselComponent />

        <FlatList
          data={dummy}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          contentContainerStyle={styles.container}
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
    alignItems: "center",  },
});

export default BlogPage;
