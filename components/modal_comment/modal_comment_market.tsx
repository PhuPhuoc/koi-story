import React from "react";
import {
  Modal,
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../../context/auth.context";

interface FeedbackMarket {
  id: string;
  name: string;
  created_at: string;
  content: string;
  avatar: string;
  user_id: string;
}

interface CommentModalProps {
  visible: boolean;
  onClose: () => void;
  feedbackList: FeedbackMarket[];
  renderFeedbackItem: (item: { item: FeedbackMarket }) => JSX.Element;
  newComment: string;
  setNewComment: (comment: string) => void;
  handleAddComment: (user_id: string | undefined) => void;
  editingCommentId: string | null;
  setEditingCommentId: (id: string | null) => void;
  handleEditComment: (comment_id: string, content: string) => void;
}

const CommentMarket: React.FC<CommentModalProps> = ({
  visible,
  onClose,
  feedbackList,
  renderFeedbackItem,
  newComment,
  setNewComment,
  handleAddComment,
  editingCommentId,
  setEditingCommentId,
  handleEditComment,
}) => {
  const { userData } = useAuth();

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Bình luận</Text>
          <MaterialCommunityIcons
            name="close"
            size={24}
            onPress={onClose}
            style={styles.closeIcon}
          />
        </View>

        <FlatList
          data={feedbackList}
          renderItem={renderFeedbackItem}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Thêm bình luận..."
            value={newComment}
            onChangeText={setNewComment}
          />
          {editingCommentId ? (
            <Pressable
              onPress={() => {
                handleEditComment(editingCommentId, newComment);
                setEditingCommentId(null);
                setNewComment("");
              }}
              style={styles.sendButton}
            >
              <MaterialCommunityIcons name="send" size={24} color="#000" />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => handleAddComment(userData?.id)}
              style={styles.sendButton}
            >
              <MaterialCommunityIcons name="send" size={24} color="#000" />
            </Pressable>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeIcon: {
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
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
  saveButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CommentMarket;
