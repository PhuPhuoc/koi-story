import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  StyleSheet,
} from "react-native";
import dummy from "../../../../dummy_data/dummy_post_info.json";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import { THEME_COLOR } from "../../../../constants/const";

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Tư vấn", value: "tuvan" },
  { label: "Hỏi Đáp", value: "hoidap" },
  { label: "Under $50", value: "under50" },
  { label: "Above $50", value: "above50" },
];

const MarketPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(dummy);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const route = useRouter();

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    applyFilters(text, selectedFilter);
  };

  const handleFilterChange = (filterValue: string) => {
    setSelectedFilter(filterValue);
    applyFilters(searchQuery, filterValue);
  };

  const applyFilters = (text: string, filterValue: string) => {
    let filtered = dummy.filter((item) =>
      item.artName.toLowerCase().includes(text.toLowerCase())
    );

    if (filterValue !== "all") {
      if (filterValue === "tuvan") {
        filtered = filtered.filter((item) => item.post_type === 1);
      } else if (filterValue === "hoidap") {
        filtered = filtered.filter((item) => item.post_type === 2);
      } else if (filterValue === "under50") {
        filtered = filtered.filter((item) => item.price < 50);
      } else if (filterValue === "above50") {
        filtered = filtered.filter((item) => item.price >= 50);
      }
    }

    setFilteredData(filtered);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <View style={styles.filterWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          {filterOptions.map((filter) => (
            <TouchableOpacity
              key={filter.value}
              style={[
                styles.filterButton,
                selectedFilter === filter.value && styles.activeFilterButton,
              ]}
              onPress={() => handleFilterChange(filter.value)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedFilter === filter.value && styles.activeFilterText,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          const ribbonText = item.post_type === 1 ? "Tư vấn" : "Hỏi Đáp";
          const ribbonColor = item.post_type === 1 ? THEME_COLOR : "yellow";

          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => route.navigate("post_market_detail/1")}
            >
              <View style={styles.imageContainer}>
                <View
                  style={[styles.ribbonContainer, { backgroundColor: ribbonColor }]}
                >
                  <Text style={styles.ribbonText}>{ribbonText}</Text>
                </View>
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.artName} numberOfLines={2}>
                  {item.artName}
                </Text>
                <Text style={styles.description} numberOfLines={1}>
                  {item.description}
                </Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
              <View style={styles.timeContainer}>
                <Entypo name="clock" size={18} />
                <Text style={styles.timeText} numberOfLines={1}>
                  {item.created_at}-{item.place}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    fontSize: 16,
  },
  filterWrapper: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterContainer: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    gap: 8,
  },
  filterButton: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 0,
  },
  activeFilterButton: {
    backgroundColor: THEME_COLOR,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeFilterText: {
    color: '#fff',
  },
  listContainer: {
    padding: 8,
    paddingBottom: 100,
  },
  card: {
    flex: 1,
    margin: 4,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    maxWidth: '50%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    aspectRatio: 1,
    marginBottom: 8,
  },
  ribbonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderTopRightRadius: 8,
    zIndex: 1,
  },
  ribbonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  textContainer: {
    gap: 4,
  },
  artName: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 18,
  },
  description: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  price: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
    marginTop: 2,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  timeText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
});

export default MarketPage;