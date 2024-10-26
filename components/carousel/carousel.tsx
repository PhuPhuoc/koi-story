import { Dimensions, Image, StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import data from "../../dummy_data/dummy_carousel_img.json"
const CarouselComponent = () => {
  const width = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <Carousel
        width={width}
        height={width / 2}
        data={data}
        autoPlay={true}
        autoPlayInterval={3000}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        renderItem={({ item }) => {
          return (
            <View style={styles.carouselItem}>
            <Image style={styles.img} source={{ uri: item.image }} />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carouselItem: {
    borderRadius: 15,
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
});

export default CarouselComponent;