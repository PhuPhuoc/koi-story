import React from 'react';
import { View, Image, StyleSheet, FlatList } from 'react-native';

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  return (
    <FlatList
      data={images}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <View style={styles.imageContainer}>
          <Image source={{ uri: item }} style={styles.image} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: 10,
  },
});

export default ImageCarousel;
