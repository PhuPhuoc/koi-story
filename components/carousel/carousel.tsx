import { Dimensions, Image, StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const CarouselComponent = () => {
  const width = Dimensions.get("window").width;

  const list = [
    {
      id: 1,
      title: "Koi",
      image: require("../../assets/koi.jpg"),
    },
    {
      id: 2,
      title: "Koi 2",
      image: require("../../assets/koi2.jpg"),
    },
    {
      id: 3,
      title: "Koi 3",
      image: require("../../assets/koi3.jpg"),
    },
  ];

  return (
    <View style={styles.container}>
      <Carousel
        width={width}
        height={width / 2}
        data={list}
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
              <Image style={styles.img} source={item.image} />
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
    paddingVertical: 20,
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
