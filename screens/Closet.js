import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Carousel from "./Carousel";
import data from "../data/Clothes";

function Closet(props) {
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        style={styles.bg}
        source={require("../assets/loginScreen.png")}
      >
        <Carousel
          itemsPerInterval={1}
          items={[
            {
              title: "Hats",
              clothes: data.filter((item) => item.type === "hats"),
            },
            {
              title: "Tops",
              clothes: data.filter((item) => item.type === "tops"),
            },
            {
              title: "Bottoms",
              clothes: data.filter((item) => item.type === "bottoms"),
            },
            {
              title: "Shoes",
              clothes: data.filter((item) => item.type === "shoes"),
            },
            {
              title: "Bags",
              clothes: data.filter((item) => item.type === "bags"),
            },
          ]}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 32,
  },
  bg: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 160,
    paddingBottom: 64,
    paddingRight: 16,
    paddingLeft: 16,
  },
});

export default Closet;