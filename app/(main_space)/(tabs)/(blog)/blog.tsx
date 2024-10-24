import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import CarouselComponent from "../../../../components/carousel/carousel";
import CommentComponent from "../../../../components/comment_modal/comment";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const BlogPage = () => {
  const id = "blog title 1";
  return (
      <GestureHandlerRootView  style={styles.container}>
        {/* <Text style={styles.title}>BlogPage</Text>
        <Link href={`/(main_space)/blog_detail/${id}`}>
          See Detail blog_detail_demo
        </Link> */}

        {/* <CarouselComponent /> */}

        <CommentComponent />
      </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
export default BlogPage;
