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

interface Feedback {
  id: number;
  name: string;
  time: string;
  rating: number;
  comment: string;
  avatar: string;
}

interface CommentModalProps {
  visible: boolean;
  onClose: () => void;
  feedbackList: Feedback[];
  renderFeedbackItem: (item: { item: Feedback }) => JSX.Element;
  renderStarRating: () => JSX.Element;
  newComment: string;
  setNewComment: (comment: string) => void;
  handleAddComment: () => void;
}

const CommentMarket: React.FC<CommentModalProps> = ({
  visible,
  onClose,
  feedbackList,
  renderFeedbackItem,
  renderStarRating,
  newComment,
  setNewComment,
  handleAddComment,
}) => {
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
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />

        {renderStarRating()}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Thêm bình luận..."
            value={newComment}
            onChangeText={setNewComment}
          />
          <Pressable onPress={handleAddComment} style={styles.sendButton}>
            <MaterialCommunityIcons name="send" size={24} color="#000" />
          </Pressable>
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
});

export default CommentMarket;
