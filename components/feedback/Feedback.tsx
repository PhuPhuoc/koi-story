import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Button,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import feedbackData from "../../dummy_data/dummny_feedback.json";
import { ScrollView } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import CommentComponent from "../comment_modal/comment";

interface Feedback {
  id: number;
  name: string;
  time: string;
  rating: number;
  comment: string;
}

const FeedbackComponent: React.FC = () => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [feedbackList, setFeedbackList] = useState<Feedback[]>(feedbackData);

  const averageRating = useMemo(() => {
    const ratings = feedbackList.map((item) => item.rating);
    return (
      ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length || 0
    );
  }, [feedbackList]);

  const filteredFeedbackData = useMemo(
    () =>
      selectedRating
        ? feedbackList.filter((item) => item.rating === selectedRating)
        : feedbackList,
    [selectedRating, feedbackList]
  );

  const limitedFeedback = filteredFeedbackData.slice(0, 3);

  const renderFeedbackItem = ({ item }: { item: Feedback }) => (
    <View style={styles.feedbackItem}>
      <View style={styles.nameAndTimeContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>

      <Text style={styles.ratingContainer}>
        {[...Array(item.rating)].map((_, index) => (
          <FontAwesome
            key={`star-filled-${item.id}-${index}`}
            name="star"
            size={15}
            color="#FFD700"
          />
        ))}
        {[...Array(5 - item.rating)].map((_, index) => (
          <FontAwesome
            key={`star-empty-${item.id}-${index}`}
            name="star-o"
            size={15}
            color="#FFD700"
          />
        ))}
      </Text>
      <Text style={styles.comment}>{item.comment}</Text>
    </View>
  );

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newId =
        feedbackList.length > 0
          ? Math.max(...feedbackList.map((item) => item.id)) + 1
          : 1;

      const newFeedback: Feedback = {
        id: newId,
        name: "New User",
        time: new Date().toLocaleString(),
        rating: selectedRating !== null ? selectedRating : 0,
        comment: newComment.trim(),
      };

      setFeedbackList((prev) => [...prev, newFeedback]);
      setNewComment("");
      setSelectedRating(null);
    }
  };

  const renderStarRating = () => (
    <View style={styles.ratingInput}>
      {[...Array(5)].map((_, index) => (
        <Pressable
          key={index}
          onPress={() => {
            if (selectedRating === index + 1) {
              setSelectedRating(null);
            } else {
              setSelectedRating(index + 1);
            }
          }}
        >
          <FontAwesome
            name={index < (selectedRating || 0) ? "star" : "star-o"}
            size={24}
            color="#FFD700"
          />
        </Pressable>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Đánh giá từ khách hàng</Text>

      <View style={styles.averageRatingContainer}>
        <Text style={styles.averageRatingText}>
          Average Rating: {averageRating.toFixed(1)}
        </Text>
        <View style={styles.starsContainer}>
          {[...Array(5)].map((_, index) => (
            <MaterialCommunityIcons
              key={index}
              name={index < averageRating ? "star" : "star-outline"}
              size={24}
              color={index < averageRating ? "#F48E48" : "#ccc"}
            />
          ))}
        </View>
      </View>

      <View style={styles.filterContainer}>
        <MaterialCommunityIcons
          name="filter-remove"
          size={18}
          onPress={() => setSelectedRating(null)}
          style={styles.clearFilterButton}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[5, 4, 3, 2, 1].map((rating) => (
            <TouchableOpacity
              key={rating}
              onPress={() => setSelectedRating(rating)}
              style={[
                styles.filterButton,
                selectedRating === rating && styles.selectedFilterButton,
              ]}
            >
              <Text style={styles.filterButtonText}>{rating} Stars</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={limitedFeedback}
        renderItem={renderFeedbackItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <View style={styles.containerButtonModal}>
        <Pressable style={styles.buttonModal} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonTextModal}>Xem tất cả bình luận</Text>
        </Pressable>
      </View>

      <CommentComponent
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        feedbackList={feedbackList}
        renderFeedbackItem={renderFeedbackItem}
        renderStarRating={renderStarRating}
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
  averageRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  averageRatingText: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  starsContainer: {
    flexDirection: "row",
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
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  time: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  ratingInput: {
    marginTop: 10,
    flexDirection: "row",
  },
  comment: {
    fontSize: 16,
    color: "#333",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  clearFilterButton: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 9,
    paddingHorizontal: 25,
    borderRadius: 20,
    marginRight: 10,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    backgroundColor: "white",
  },
  selectedFilterButton: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  filterButtonText: {
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
  },
  buttonTextModal: {
    color: "white", 
    fontSize: 16, 
    fontWeight: "bold", 
  },
});

export default FeedbackComponent;
