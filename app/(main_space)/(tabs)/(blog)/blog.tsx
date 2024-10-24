import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import dummy from "../../../../dummy_data/dummy_blog.json";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CommentComponent from "../../../../components/comment_modal/comment";
import CarouselComponent from "../../../../components/carousel/carousel";

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
    <GestureHandlerRootView style={styles.container}>
      <CarouselComponent />
      <FlatList
        data={dummy}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.container}
      />

      <CommentComponent />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
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
  price: {
    fontSize: 16,
    color: "#888",
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
});

export default BlogPage;
