import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  Alert,
  ActivityIndicator,
  TextInput,
} from "react-native";
import ConsultData from "../../dummy_data/dummy_post_consult.json";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ImageModal from "../image_modal/image_modal";
import CommentData from "../../dummy_data/dummy_comment_consult.json";
import { useAuth } from "../../context/auth.context";

type images = {
  id: string;
  image_url: string;
};

type Consult = {
  post_id: string;
  title: string;
  content: string;
  avatar: string;
  created_at: string;
  post_type: string;
  images: images[];
};

type Comment = {
  id: string;
  name: string;
  created_at: string;
  content: string;
  avatar: string;
  user_id: string;
};

const ConsultCard = ({ consult }: { consult: Consult }) => {
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [newComment, setNewComment] = useState("");
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const { userData } = useAuth();

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `http://api.koistory.site/api/v1/posts/${consult.post_id}/comments`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // console.log("Fetched comment consult data:", data);

      const comments = data.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        created_at: item.created_at,
        content: item.content,
        avatar: item.avatar || "https://i.pravatar.cc/150?img=1",
        user_id: item.user_id,
      }));
      setCommentList(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [consult.post_id]);

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setImageModalVisible(true);
  };

  const handleAddComment = async () => {
    if (!userData?.id) return; 

    if (newComment.trim()) {
      try {
        const response = await fetch(`http://api.koistory.site/api/v1/posts/${consult.post_id}/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: newComment.trim(),
            user_id: userData.id,
            post_id: consult.post_id,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error adding comment:", errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const newCommentData = await response.json();
        console.log("Comment added successfully:", newCommentData);

        setCommentList((prev) => [
          ...prev,
          {
            id: newCommentData.id,
            name: newCommentData.name,
            created_at: new Date().toLocaleString(),
            content: newComment.trim(),
            avatar: newCommentData.avatar,
            user_id: newCommentData.user_id,
          },
        ]);
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  // Hàm xử lý chỉnh sửa bình luận
  const handleEditComment = async (comment_id: string, updatedContent: string) => {
    if (!updatedContent.trim()) {
      Alert.alert("Error", "Comment content cannot be empty.");
      return;
    }

    try {
      const response = await fetch(`http://api.koistory.site/api/v1/comments/${comment_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: updatedContent.trim() }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error editing comment:", errorText);
        Alert.alert("Error", "Unable to edit comment.");
        return;
      }

      setCommentList((prev) =>
        prev.map((item) =>
          item.id === comment_id ? { ...item, content: updatedContent } : item
        )
      );

      // console.log("Bình luận cập nhật thành công");
      Alert.alert("Thành công", "Bình luận cập nhật thành công");
      setNewComment("");
      setEditingCommentId(null); 
    } catch (error) {
      console.error("Error updating comment:", error);
      Alert.alert("Error", "An error occurred while editing the comment.");
    }
  };

  const handleDeleteComment = (comment_id: string) => {
    fetch(`http://api.koistory.site/api/v1/comments/${comment_id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Comment with id ${comment_id} deleted successfully.`);
          setCommentList((prevList) =>
            prevList.filter((item) => item.id !== comment_id)
          );
        } else {
          console.error("Failed to delete comment");
        }
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  };

  // Confirm deletion of a comment
  const confirmDeleteComment = (comment_id: string) => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa bình luận này?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xóa",
          onPress: () => handleDeleteComment(comment_id),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const renderCommentItem = ({ item }: { item: Comment }) => (
    <View style={styles.commentItem}>
      <View style={styles.nameAndTimeContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.created_at}</Text>
        </View>
      </View>
      <Text style={styles.comment}>{item.content}</Text>

      {item.user_id === userData?.id && (
        <View style={styles.actionsContainer}>
          <Pressable
            style={styles.editButton}
            onPress={() => {
              setEditingCommentId(item.id);
              setNewComment(item.content);
            }}
          >
            <Text style={styles.actionText}>Sửa</Text>
          </Pressable>

          <Pressable
            onPress={() => confirmDeleteComment(item.id)}
            style={styles.deleteButton}
          >
            <Text style={styles.actionText}>Xoá</Text>
          </Pressable>
        </View>
      )}
    </View>
  );

   return (
    <View style={styles.container}>
      <Text style={styles.title}>{consult.title}</Text>
      <Text style={styles.content} numberOfLines={2}>
        {consult.content}
      </Text>
      {consult.images && consult.images.length > 0 && (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imageContainer}
          data={consult.images}
          renderItem={({ item }) => (
            <Pressable onPress={() => openImageModal(item.image_url)}>
              <Image source={{ uri: item.image_url }} style={styles.postImage} />
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      <View style={styles.commentsSection}>
        <FlatList
          data={commentList}
          renderItem={renderCommentItem}
          // keyExtractor={(item) => item.id.toString()}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add a comment..."
            value={newComment}
            onChangeText={setNewComment}
            onSubmitEditing={() => {
              if (editingCommentId) {
                handleEditComment(editingCommentId, newComment);
              } else {
                handleAddComment();
              }
            }}
            returnKeyType="send"
          />
          <Pressable
            onPress={() => {
              if (editingCommentId) {
                handleEditComment(editingCommentId, newComment);
              } else {
                handleAddComment();
              }
            }}
            style={styles.sendButton}
          >
            <MaterialCommunityIcons name="send" size={24} color="#000" />
          </Pressable>
        </View>
      </View>
      <ImageModal
        isVisible={isImageModalVisible}
        onClose={() => setImageModalVisible(false)}
        image_url={selectedImage}
      />
    </View>
  );
};

const ConsultPostBlog = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [consultData, setConsultData] = useState<Consult[]>([]);

  const fetchConsults = async () => {
    try {
      const response = await fetch(
        "http://api.koistory.site/api/v1/post-consult"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched consult data:", data);

      if (data && data.data && Array.isArray(data.data)) {
        return data.data.map((item: any) => ({
          post_id: item.post_id,
          title: item.title,
          content: item.content,
          post_type: item.post_type,
          images: item.images
            ? item.images.map((image: { id: string; image_url: string }) => ({
                id: image.id,
                image_url: image.image_url,
              }))
            : [],
        }));
      } else {
        console.warn("No valid data found in response");
        return [];
      }
    } catch (error) {
      console.error("Error fetching consults:", error);
      return [];
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    const data = await fetchConsults();
    setConsultData(data);
    setLoading(false);
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={consultData}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <ConsultCard consult={item} />}
          onRefresh={handleRefresh}
          refreshing={loading}
          ListEmptyComponent={<Text>No consults available.</Text>}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    // borderRadius: 8,
    // margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#888",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
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

  title: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 20,
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
  commentsSection: {
    marginTop: 16,
  },

  commentItem: {
    marginBottom: 35,
  },
  nameAndTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // marginBottom: 5,
  },
  nameContainer: {
    flex: 1,
    flexDirection: "column",
  },
  time: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  comment: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 5,
  },
  editButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  actionText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    padding: 5,
  },
});

export default ConsultPostBlog;
