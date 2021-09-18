import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Carousel from "./Carousel";
import data from "../data/Clothes";

function Closet(props) {
  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 32,
  },
});

export default Closet;
