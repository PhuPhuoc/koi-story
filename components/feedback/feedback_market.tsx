import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  Alert,
} from "react-native";
import CommentMarket from "../modal_comment/modal_comment_market";

interface FeedbackMarket {
  id: string;
  name: string;
  created_at: string;
  content: string;
  avatar: string;
}

interface FeedbackMarketProps {
  post_id: string;
}

const FeedbackMarket: React.FC<FeedbackMarketProps> = (post_id:string) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [feedbackList, setFeedbackList] = useState<FeedbackMarket[]>([]);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        "http://api.koistory.site/api/v1/posts/4955380d-b21f-4de5-8f1d-d1c775294909/comments"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      console.log("Fetched data:", data);

      const comments = data.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        created_at: item.created_at,
        content: item.content,
        avatar: item.avatar || "https://i.pravatar.cc/150?img=1",
      }));
      setFeedbackList(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [post_id]);

  const limitedFeedback = feedbackList.slice(0, 3);

  // Add a new comment
  const handleAddComment = async (user_id: string) => {
    if (newComment.trim()) {
      const response = await fetch(
        "http://api.koistory.site/api/v1/posts/4955380d-b21f-4de5-8f1d-d1c775294909/comments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: newComment.trim(),
            user_id: user_id,
            post_id: post_id,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error adding comment:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newCommentData = await response.json();
      console.log("Comment added successfully:", newCommentData);

      setFeedbackList((prev) => [
        ...prev,
        {
          id: newCommentData.id,
          name: newCommentData.name,
          created_at: new Date().toLocaleString(),
          content: newComment.trim(),
          avatar: newCommentData.avatar,
        },
      ]);
      setNewComment("");
      fetchComments();
    }
  };

  // Hàm xử lý chỉnh sửa bình luận
  const handleEditComment = async (
    comment_id: string,
    updatedContent: string
  ) => {
    if (!updatedContent.trim()) {
      Alert.alert("Lỗi", "Nội dung bình luận không được để trống.");
      return;
    }

    try {
      const response = await fetch(
        `http://api.koistory.site/api/v1/comments/${comment_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: updatedContent.trim(),
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Lỗi khi chỉnh sửa bình luận:", errorText);
        Alert.alert("Lỗi", "Không thể chỉnh sửa bình luận.");
        return;
      }

      setFeedbackList((prevFeedbackList) =>
        prevFeedbackList.map((item) =>
          item.id === comment_id ? { ...item, content: updatedContent } : item
        )
      );

      console.log("Chỉnh sửa bình luận thành công.");
      Alert.alert("Thành công", "Bình luận đã được chỉnh sửa.");
    } catch (error) {
      console.error("Lỗi khi gọi API chỉnh sửa bình luận:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi chỉnh sửa bình luận.");
    }
  };

  const handleDeleteComment = (comment_id: string) => {
    fetch(`http://api.koistory.site/api/v1/comments/${comment_id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Comment with id ${comment_id} deleted successfully.`);
          setFeedbackList((prevList) =>
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

  const renderFeedbackItem = ({ item }: { item: FeedbackMarket }) => (
    <View style={styles.feedbackItem}>
      <View style={styles.nameAndTimeContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.created_at}</Text>
        </View>
      </View>
      <Text style={styles.comment}>{item.content}</Text>

      <View style={styles.actionsContainer}>
        <Pressable
          style={styles.editButton}
          onPress={() => {
            setEditingCommentId(item.id);
            setNewComment(item.content);
            setModalVisible(true);
          }}
        >
          <Text style={styles.actionText}>Edit</Text>
        </Pressable>

        <Pressable
          onPress={() => confirmDeleteComment(item.id)}
          style={styles.deleteButton}
        >
          <Text style={styles.actionText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Đánh giá từ khách hàng</Text>

      <FlatList data={limitedFeedback} renderItem={renderFeedbackItem} />

      <View style={styles.containerButtonModal}>
        <Pressable
          style={styles.buttonModal}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonTextModal}>Xem tất cả bình luận</Text>
        </Pressable>
      </View>

      <CommentMarket
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        feedbackList={feedbackList}
        renderFeedbackItem={renderFeedbackItem}
        newComment={newComment}
        setNewComment={setNewComment}
        handleAddComment={handleAddComment}
        handleEditComment={handleEditComment}
        editingCommentId={editingCommentId}
        setEditingCommentId={setEditingCommentId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  feedbackItem: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  nameAndTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  nameContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  time: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  comment: {
    fontSize: 16,
    color: "#333",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
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

export default FeedbackMarket;
