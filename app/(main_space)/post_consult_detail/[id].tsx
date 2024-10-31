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
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import ImageModal from "../../../components/image_modal/image_modal";
import FeedbackConsult from "../../../components/feedback/feedback_consult";
import { useAuth } from "../../../context/auth.context";

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

  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

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
          avatar: "https://i.pravatar.cc/150?img=1",
        },
      ]);
      setNewComment("");
    }
  };

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setImageModalVisible(true);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.containerAll}>
          <View style={styles.header}>
            <Image source={{ uri: consult.avatar }} style={styles.avatar} />

            <View style={styles.infoContainer}>
              <View style={styles.nameTopicContainer}>
                <Text style={styles.name}>{consult.name}</Text>
                <Text style={styles.topicContainer}>
                  <Text style={styles.topicText}>
                    Chủ đề: {consult.post_type}
                  </Text>
                </Text>
              </View>
              <Text style={styles.date}>Ngày: {consult.created_at}</Text>
            </View>
          </View>

          <Text style={styles.title}>{consult.title}</Text>

          <Text style={styles.question}>{consult.question}</Text>

            {/* Horizontal Image Carousel using FlatList */}
            {consult.image_url && consult.image_url.length > 0 && (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.imageContainer}
              data={consult.image_url}
              renderItem={({ item }) => (
                <Pressable onPress={() => openImageModal(item)}>
                  <Image source={{ uri: item }} style={styles.postImage} />
                </Pressable>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
          <Text style={styles.content}>{consult.content}</Text>
        </View>

        <FeedbackConsult
          visible={isCommentModalVisible}
          onClose={() => setCommentModalVisible(false)}
          commentList={commentList}
          newComment={newComment}
          setNewComment={setNewComment}
          handleAddComment={handleAddComment}
        />

        <ImageModal
          isVisible={isImageModalVisible}
          image_url={selectedImage}
          onClose={() => setImageModalVisible(false)}
        />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    overflow: "scroll"
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
  nameTopicContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 8,
  },
  topicContainer: {
    backgroundColor: "#E0F7FA", 
    borderRadius: 20, 
    paddingVertical: 5, 
    paddingHorizontal: 10, 
  },
  topicText: {
    color: "#00796B",
    fontSize: 14,
    fontWeight: "bold", 
  },
  date: {
    color: "#888",
    fontSize: 14,
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
  imageContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  postImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginRight: 10,
  },
  content: {
    fontSize: 16,
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
