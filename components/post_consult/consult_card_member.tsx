import React, { useState } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import ConsultData from "../../dummy_data/dummy_post_consult.json";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons"; 
import ModalEdit from "../my_consult/modal_edit_consult";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
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

const ConsultCard = ({
  consult,
  onEdit,
}: {
  consult: Consult;
  onEdit: () => void;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.nameAndTimeContainer}>
        <Image source={{ uri: consult.avatar }} style={styles.avatar} />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{consult.name}</Text>
          <Text style={styles.time}>{consult.created_at}</Text>
        </View>
        
        {/* Nút Edit */}
        <TouchableOpacity onPress={onEdit} style={styles.editButton}>
          <FontAwesome name="edit" size={25} color="#F28705" />
        </TouchableOpacity>
      </View>

      <Text style={styles.topicContainer}>
        <Text style={styles.topicText}>Chủ đề: {consult.post_type}</Text>
      </Text>

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

const ConsultPostMember = () => {
  const router = useRouter();

  const [selectedConsult, setSelectedConsult] = useState<Consult | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleEdit = (consult: Consult) => {
    setSelectedConsult(consult); 
    setModalVisible(true); 
  };

  const handleSave = (updatedConsult: Consult) => {
    console.log("Updated consult: ", updatedConsult);
   
    setModalVisible(false); 
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FlatList
        data={ConsultData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.navigate(`post_consult_detail/${item.id}`)}
          >
            <ConsultCard
              consult={item}
              onEdit={() => handleEdit(item)} 
            />
          </TouchableOpacity>
        )}
      />
      {selectedConsult && (
        <ModalEdit
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          consult={selectedConsult}
          onSave={handleSave}
        />
      )}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#888",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
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
  topicContainer: {
    backgroundColor: "#E0F7FA",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 8,
    alignSelf: "flex-start",
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
  editButton: {
    padding: 5,
  },
});

export default ConsultPostMember;
