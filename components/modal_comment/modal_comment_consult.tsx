import React from "react";
import {
  Modal,
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Comment {
  id: number;
  name: string;
  time: string;
  comment: string;
  avatar: string;
}

interface CommentModalProps {
  visible: boolean;
  onClose: () => void;
  commentList: Comment[];
  newComment: string;
  setNewComment: (comment: string) => void;
  handleAddComment: () => void;
}

const CommentConsult: React.FC<CommentModalProps> = ({
  visible,
  onClose,
  commentList,
  newComment,
  setNewComment,
  handleAddComment,
}) => {
  const renderCommentItem = ({ item }: { item: Comment }) => (
    <View style={styles.commentItem}>
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
          data={commentList}
          renderItem={renderCommentItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Thêm bình luận..."
            value={newComment}
            onChangeText={setNewComment}
            onSubmitEditing={handleAddComment} 
            returnKeyType="send" 
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
  commentItem: {
    marginBottom: 35,
  },
  nameAndTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // marginBottom: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  nameContainer: {
    flex: 1,
    flexDirection: "column",
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

export default CommentConsult;
