// import React, { useEffect, useState } from "react";
// import { View, Text, Image, StyleSheet, ScrollView, Pressable } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import dummy from "../../dummy_data/dummy_mymarket.json"; 

// interface ItemData {
//   id: number;
//   product_name: string;
//   price: number;
//   product_type: string;
//   color: string;
//   origin: string;
//   describe: string;
//   image: string;
// }

// const MarketDetailScreen: React.FC = () => {
//   const router = useRouter();
//   const { id } = useLocalSearchParams();
//   const [itemData, setItemData] = useState<ItemData | null>(null);

//   useEffect(() => {
//     const marketItem = dummy.find((item) => item.id === Number(id));
//     setItemData(marketItem || null);
//   }, [id]);

//   if (!itemData) {
//     return (
//       <View style={styles.container}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <Image source={{ uri: itemData.image }} style={styles.productImage} />
//       <Text style={styles.productName}>{itemData.product_name}</Text>
//       <Text style={styles.productPrice}>{`Price: $${itemData.price}`}</Text>
//       <Text style={styles.productDescription}>{itemData.describe}</Text>
//       <Pressable style={styles.closeButton} onPress={() => router.back()}>
//         <Text style={styles.closeButtonText}>Go Back</Text>
//       </Pressable>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   productImage: {
//     width: "100%",
//     height: 250,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   productName: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   productPrice: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 10,
//   },
//   productDescription: {
//     fontSize: 16,
//     marginBottom: 20,
//   },
//   closeButton: {
//     backgroundColor: "#2196F3",
//     padding: 10,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   closeButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });

// export default MarketDetailScreen;
