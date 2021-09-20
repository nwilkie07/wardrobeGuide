import { installWebGeolocationPolyfill } from "expo-location";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Button,
  Text,
  Pressable,
  ImageBackground,
} from "react-native";
import { API_KEY } from "../utils/WeatherApiKey";
// import {
//   TiWeatherStormy,
//   TiWeatherShower,
//   TiWeatherDownpour,
//   TiWeatherSnow,
//   TiWeatherWindyCloudy,
//   TiWeatherSunny,
//   TiWeatherCloudy,
// } from "react-icons/ti";

function Main(props) {
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState("");
  const [condition, setCondition] = useState("");

  useEffect(() => {
    installWebGeolocationPolyfill();
  }, []);

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    var crd = pos.coords;

    console.log(crd.latitude, crd.longitude);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((json) => {
        setTemperature(json.main.temp);
        setCondition(json.weather[0].main);
        setLocation(json.name);
      })
      .catch((err) => {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
        throw err;
      });
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        style={styles.bg}
        source={require("../assets/loginScreen.png")}
      >
        <View style={styles.gallery}>
          <View style={[styles.left]}>
            <View
              style={[
                styles.box,
                {
                  flex: 3,
                },
              ]}
            >
              <Image
                style={styles.image}
                source={{
                  uri: "https://static.zara.net/photos///2021/I/0/2/p/0526/330/250/2/w/750/0526330250_6_1_1.jpg?ts=1631258841709",
                }}
              />
            </View>
            <View
              style={[
                styles.box,
                {
                  flex: 4,
                },
              ]}
            >
              <Image
                style={styles.image}
                source={{
                  uri: "https://static.zara.net/photos///2021/I/0/2/p/6917/332/712/2/w/750/6917332712_6_1_1.jpg?ts=1631614281604",
                }}
              />
            </View>
          </View>
          <View style={[styles.right]}>
            <View
              style={[
                styles.box,
                {
                  flex: 1,
                },
              ]}
            >
              <Image
                style={styles.image}
                source={{
                  uri: "https://static.zara.net/photos///2021/I/0/2/p/9065/306/251/2/w/750/9065306251_6_1_1.jpg?ts=1627291859349",
                }}
              />
            </View>
            <View
              style={[
                styles.box,
                {
                  flex: 1,
                },
              ]}
            >
              <Image
                style={styles.image}
                source={{
                  uri: "https://static.zara.net/photos///2021/I/1/2/p/3626/820/040/2/w/850/3626820040_6_1_1.jpg?ts=1631627525334",
                }}
              />
            </View>
            <View
              style={[
                styles.box,
                {
                  flex: 1,
                },
              ]}
            >
              <Image
                style={styles.image}
                source={{
                  uri: "https://static.zara.net/photos///2021/I/1/2/p/2003/821/040/2/w/750/2003821040_6_1_1.jpg?ts=1628850875199",
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.info}>
          <View
            style={[
              styles.box,
              {
                flex: 3,
                alignItems: "center",
                flexDirection: "row",
                marginBottom: 0,
                marginLeft: 16,
                backgroundColor: "#fff",
              },
            ]}
          >
            <View style={{ flex: 2, marginRight: 16 }}>
              {/* <Image
                style={[styles.image, { flex: 2 }]}
                source={{
                  uri: "https://static.zara.net/photos///2021/I/1/2/p/2003/821/040/2/w/750/2003821040_6_1_1.jpg?ts=1628850875199",
                }}
              /> */}
              <Text style={styles.location}>{condition.toUpperCase()}</Text>
              {/* {(condition.toLowerCase() === "thunderstorm" && (
                // <TiWeatherStormy style={styles.icon} />
                <Text>Thunderstorm</Text>
              )) ||
                (condition.toLowerCase() === "drizzle" && (
                  // <TiWeatherShower style={styles.icon} />
                  <Text>Drizzle</Text>
                )) ||
                (condition.toLowerCase() === "rain" && (
                  // <TiWeatherDownpour style={styles.icon} />
                  <Text>Rain</Text>
                )) ||
                (condition.toLowerCase() === "snow" && (
                  // <TiWeatherSnow style={styles.icon} />
                  <Text>Snow</Text>
                )) ||
                (condition.toLowerCase() === "atmosphere" && (
                  // <TiWeatherWindyCloudy style={styles.icon} />
                  <Text>Atmosphere</Text>
                )) ||
                (condition.toLowerCase() === "clear" && (
                  // <TiWeatherSunny style={styles.icon} />
                  <Text>Clear</Text>
                )) ||
                (condition.toLowerCase() === "clouds" && (
                  // <TiWeatherCloudy style={styles.icon} />
                  <Text>Clouds</Text>
                ))} */}
              <Pressable
                onPress={() => {
                  console.log(1);
                  navigator.geolocation.getCurrentPosition(
                    success,
                    error,
                    options
                  );
                }}
              >
                <Text style={styles.location}>
                  {location ? location : "Location"}
                </Text>
              </Pressable>
            </View>
            <Text style={styles.temp}>
              {temperature ? `${Math.round(parseFloat(temperature))} C` : ""}
            </Text>
          </View>
          <View style={[styles.box, { flex: 2 }]}>
            <Button title="Match Up" color="#9E9CB6" />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  gallery: {
    flex: 8,
    width: "100%",
    flexDirection: "row",
  },
  left: {
    flex: 3,
    position: "relative",
  },
  right: {
    flex: 2,
    position: "relative",
  },
  box: {
    padding: 16,
    position: "relative",
    justifyContent: "center",
  },
  image: {
    flex: 1,
  },
  icon: {
    flex: 2,
    color: "#9E9CB6",
  },
  info: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
  },
  button: {
    width: "50%",
    height: 100,
  },
  temp: {
    flex: 1,
    fontSize: 20,
    color: "#9E9CB6",
  },
  bg: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 150,
    paddingBottom: 64,
    paddingRight: 16,
    paddingLeft: 16,
  },
  location: {
    color: "#9E9CB6",
    textAlign: "center",
    fontSize: 16,
  },
});

export default Main;