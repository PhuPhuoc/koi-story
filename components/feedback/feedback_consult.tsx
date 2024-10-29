import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import CommentConsult from "../modal_comment/modal_comment_consult";

interface FeedbackConsultProps {
  visible: boolean;
  onClose: () => void;
  commentList: FeedbackConsult[]; 
  newComment: string;
  setNewComment: (comment: string) => void;
  handleAddComment: () => void;
}

interface FeedbackConsult {
  id: number;
  name: string;
  time: string;
  comment: string;
  avatar: string;
}

const FeedbackConsult: React.FC<FeedbackConsultProps> = ({
  commentList,
  newComment,
  setNewComment,
  handleAddComment,
}) => {
  const limitedFeedback = useMemo(() => commentList.slice(0, 3), [commentList]);
  const [isCommentModalVisible, setCommentModalVisible] = useState(false); // State for comment modal

  const renderFeedbackItem = ({ item }: { item: FeedbackConsult }) => (
    <View style={styles.feedbackItem}>
      <View style={styles.nameAndTimeContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
      <Text style={styles.comment}>{item.comment}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bình luận</Text>

      <FlatList
        data={limitedFeedback}
        renderItem={renderFeedbackItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <View style={styles.containerButtonModal}>
        <Pressable
          style={styles.buttonModal}
          onPress={() => setCommentModalVisible(true)} // Open comment modal
        >
          <Text style={styles.buttonTextModal}>Xem tất cả bình luận</Text>
        </Pressable>
      </View>

      <CommentConsult
        visible={isCommentModalVisible}
        onClose={() => setCommentModalVisible(false)} 
        commentList={commentList}
        newComment={newComment}
        setNewComment={setNewComment}
        handleAddComment={handleAddComment}
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
    marginVertical: 5,
  },
  buttonTextModal: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FeedbackConsult;
