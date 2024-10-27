import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import ConsultData from "../../../dummy_data/dummy_post_consult.json";
import CommentData from "../../../dummy_data/dummy_comment_consult.json";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CommentConsult from "../../../components/comment_modal/comment_consult";

interface Comment {
  id: number;
  name: string;
  time: string;
  comment: string;
  avatar: string;
}

const DetailConsult = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const consult = ConsultData.find((item) => item.id.toString() === id);
  const [isCommentModalVisible, setCommentModalVisible] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentList, setCommentList] = useState<Comment[]>(CommentData);

  useLayoutEffect(() => {
    if (consult) {
      navigation.setOptions({ title: consult.title });
    }
  }, [navigation, consult]);

  if (!consult) return <Text>Bài viết không tồn tại.</Text>;

  const handleAddComment = () => {
    if (newComment.trim()) {
      setCommentList([
        ...commentList,
        {
          id: commentList.length + 1,
          name: "Current User",
          time: "Just now",
          comment: newComment,
          avatar: "https://example.com/avatar.jpg"
        },
      ]);
      setNewComment("");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerAll}>
        <View style={styles.header}>
          <Image source={{ uri: consult.avatar }} style={styles.avatar} />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{consult.name}</Text>
            <Text style={styles.topic}>Topic: {consult.post_type}</Text>
            <Text style={styles.date}>Ngày: {consult.created_at}</Text>
          </View>
        </View>

        <Text style={styles.title}>{consult.title}</Text>

        <Text style={styles.question}>{consult.question}</Text>

        {consult.image_url && (
          <Image source={{ uri: consult.image_url }} style={styles.postImage} />
        )}

        <Text style={styles.content}>{consult.content}</Text>
      </View>

      <View style={styles.containerButtonModal}>
        <Pressable
          style={styles.buttonModal}
          onPress={() => setCommentModalVisible(true)}
        >
          <Text style={styles.buttonTextModal}>Xem tất cả bình luận</Text>
        </Pressable>
      </View>

      <GestureHandlerRootView style={styles.containerFeedback}>
        <CommentConsult
          visible={isCommentModalVisible}
          onClose={() => setCommentModalVisible(false)}
          commentList={commentList}
          newComment={newComment}
          setNewComment={setNewComment}
          handleAddComment={handleAddComment}
        />
      </GestureHandlerRootView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerAll: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  topic: {
    color: "#888",
    fontSize: 14,
  },
  date: {
    color: "#888",
    fontSize: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  question: {
    fontSize: 16,
    marginBottom: 8,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    marginBottom: 16,
  },
  containerFeedback: {
    flex: 1,
  },
  containerButtonModal: {
    alignItems: "center", 
    marginVertical: 10,
  },
  buttonModal: {
    backgroundColor: "#007BFF", 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5, 
    elevation: 2,
    shadowColor: "#000", 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
  },
  buttonTextModal: {
    color: "white", 
    fontSize: 16, 
    fontWeight: "bold", 
  },
});

export default DetailConsult;
