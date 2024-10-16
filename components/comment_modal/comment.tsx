import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { FlatList } from "react-native-gesture-handler";
import Entypo from "@expo/vector-icons/Entypo";
import { SafeAreaView } from "react-native-safe-area-context";

interface Comment {
  id: string;
  username: string;
  content: string;
  time: string;
  avatar: string;
}

const CommentComponent = () => {
  const [newComment, setNewComment] = useState("");
  const [currentSnapPoint, setCurrentSnapPoint] = useState(0);
  const [replyTo, setReplyTo] = useState<Comment | null>(null);

  const snapPoints = useMemo(() => ["50%", "100%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleOpenPress = () => bottomSheetRef.current?.snapToIndex(0);

  const handleSheetChanges = (index: number) => {
    setCurrentSnapPoint(index);
  };

  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      username: "Nguyen Van A",
      content: "Đây là bình luận 1",
      time: "11h",
      avatar: "https://cdn-icons-png.flaticon.com/512/6858/6858504.png",
    },
    {
      id: "2",
      username: "Nguyen Van b",
      content: "Hay quá 💚💜🔥",
      time: "12h",
      avatar: "https://cdn-icons-png.flaticon.com/512/6858/6858504.png",
    },
  ]);

  const handleSend = () => {
    if (newComment.trim()) {
      const now = new Date();
      const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setComments([
        ...comments,
        {
          id: String(comments.length + 1),
          username: "Anonymous",
          content: replyTo
            ? `Trả lời @${replyTo.username}: ${newComment}`
            : newComment,
          time: time,
          avatar: "https://example.com/default-avatar.png",
        },
      ]);
      setNewComment("");
      setReplyTo(null);
    }
  };

  const handleReply = (comment: any) => {
    setReplyTo(comment);
    setCurrentSnapPoint(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Open" onPress={handleOpenPress} />

      <BottomSheet
        index={-1}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text style={styles.title}>Bình luận</Text>

          {comments.length === 0 ? (
            <View style={styles.noCommentContainer}>
              <Text style={styles.noCommentText}>Chưa có bình luận nào</Text>
              <Text style={styles.tryNowText}>
                Bắt đầu bình luận cho bài đăng này.
                <Text style={styles.tryNowLink}>Thử ngay</Text>
              </Text>
            </View>
          ) : (
            <FlatList
              data={comments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <View style={styles.commentContainer}>
                    <Image
                      source={{ uri: item.avatar }}
                      style={styles.avatar}
                    />
                    <View style={styles.commentContent}>
                      <View style={styles.commentHeader}>
                        <Text style={styles.username}>{item.username}</Text>
                        <Text style={styles.commentTime}>{item.time}</Text>
                      </View>
                      <Text style={styles.commentText}>{item.content}</Text>

                      <Pressable
                        onPress={() => handleReply(item)}
                        style={styles.replyButton}
                      >
                        <Text style={styles.replyText}>Trả lời</Text>
                      </Pressable>
                    </View>
                  </View>
                );
              }}
              style={styles.commentList}
            />
          )}

          {replyTo && (
            <View style={styles.replyingToContainer}>
              <Text style={styles.replyingToText}>
                Đang trả lời @{replyTo.username}: {replyTo.content}
              </Text>
              <Pressable
                onPress={() => setReplyTo(null)}
                style={styles.cancelReplyButton}
              >
                <Text style={styles.cancelReplyText}>Hủy</Text>
              </Pressable>
            </View>
          )}

          <View
            style={[
              styles.inputContainer,
              currentSnapPoint === 0
                ? { marginBottom: 470 }
                : { marginBottom: 100 },
            ]}
          >
            <TextInput
              value={newComment}
              onChangeText={setNewComment}
              placeholder="Nhập bình luận..."
              style={styles.textInput}
            />
            <Pressable onPress={handleSend} style={styles.sendButton}>
              <Entypo
                name="paper-plane"
                size={24}
                color={newComment.trim() ? "blue" : "gray"}
              />
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
  },
  commentList: {
    marginVertical: 5,
  },
  replyingToContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    marginBottom: 5,
  },
  replyingToText: {
    flex: 1,
    color: "#333",
  },
  cancelReplyButton: {
    marginLeft: 10,
  },
  cancelReplyText: {
    color: "red",
    fontWeight: "bold",
  },
  replyButton: {
    marginTop: 5,
  },
  replyText: {
    color: "#007bff",
  },
  commentContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontWeight: "bold",
    marginRight: 5,
    fontSize: 16,
  },
  commentTime: {
    color: "#8e8e8e",
    fontSize: 13,
    marginLeft: 5,
  },
  commentText: {
    fontSize: 15,
    marginTop: 2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    marginLeft: 8,
    height: 35,
  },
  sendButton: {
    marginLeft: 8,
  },
  noCommentContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  noCommentText: {
    fontSize: 16,
    color: "#333",
    marginTop: 8,
  },
  tryNowText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  tryNowLink: {
    color: "blue",
    fontWeight: "bold",
  },
});

export default CommentComponent;
