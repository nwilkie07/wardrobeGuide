import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  PickerIOSComponent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

function Carousel(props) {
  const items = props.items;
  const itemsPerInterval =
    props.itemsPerInterval === undefined ? 1 : props.itemsPerInterval;

  const [intervals, setIntervals] = useState(1);
  const [width, setWidth] = useState(0);

  const init = (width) => {
    // initialise width
    setWidth(width);
    // initialise total intervals
    const totalItems = items.length;
    setIntervals(Math.ceil(totalItems / itemsPerInterval));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{ width: `${100 * items.length}%` }}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        decelerationRate="fast"
        pagingEnabled
        onContentSizeChange={(w, h) => init(w)}
      >
        {items.map((item, index) => {
          return (
            <View style={styles.item} key={index} index={index}>
              <View style={styles.contentContainer}>
                <FlatList
                  style={styles.list}
                  data={item.clothes}
                  renderItem={(article, imageIndex) => (
                    <Image
                      key={imageIndex}
                      style={styles.image}
                      source={{ uri: article.item.image }}
                      resizeMode="contain"
                    />
                  )}
                />
              </View>
              <Text style={styles.label}>{item.title.toUpperCase()}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    width: "100%",
  },
  item: {
    flex: 1,
    alignItems: "center",
  },
  contentContainer: {
    width: "100%",
    flex: 1,
  },
  image: {
    height: 600,
  },
  label: {
    height: 40,
    fontSize: 32,
    color: "white",
  },
});

export default Carousel;
