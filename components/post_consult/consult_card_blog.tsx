import React, { useState } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import ConsultData from "../../dummy_data/dummy_post_consult.json";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useRouter } from "expo-router";

type Consult = {
  id: number;
  name: string;
  avatar: string;
  created_at: string;
  post_type: string;
  title: string;
  question: string;
  content: string;
  image_url: string[];
};

const ConsultCard = ({ consult }: { consult: Consult }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: consult.avatar }} style={styles.avatar} />
        <View style={styles.infoContainer}>
          <View style={styles.nameTopicContainer}>
            <Text style={styles.name}>{consult.name}</Text>
            <Text style={styles.topicContainer}>
              <Text style={styles.topicText}>Chủ đề: {consult.post_type}</Text>
            </Text>
          </View>
          <Text style={styles.date}>Ngày: {consult.created_at}</Text>
        </View>
      </View>
      <Text style={styles.title}>{consult.title}</Text>

      <Text style={styles.question}>{consult.question}</Text>

      {consult.image_url && consult.image_url.length > 0 ? (
        <Image
          source={{ uri: consult.image_url[0] }}
          style={styles.postImage}
        />
      ) : (
        <Image
          source={require("../../assets/placeholder.jpg")}
          style={styles.postImage}
        />
      )}

      <Text style={styles.content} numberOfLines={2}>
        {consult.content}
      </Text>
    </View>
  );
};

const ConsultPostBlog = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const handleRefresh = async () => {
    setLoading(false);
  };

  return (
    <FlatList
      data={ConsultData}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => router.navigate(`post_consult_detail/${item.id}`)}
          >
            <ConsultCard consult={item} />
          </TouchableOpacity>
        </GestureHandlerRootView>
      )}
      onRefresh={handleRefresh}
      refreshing={loading}
    />
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
    color: "#333",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 8,
  },
  question: {
    color: "#666",
    fontSize: 14,
    marginBottom: 8,
  },
  postImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginVertical: 8,
  },
  content: {
    color: "#333",
    fontSize: 16,
    marginBottom: 16,
  },
});

export default ConsultPostBlog;
