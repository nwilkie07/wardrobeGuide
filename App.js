import * as AuthSession from "expo-auth-session";
import jwtDecode from "jwt-decode";
import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Platform,
  StyleSheet,
  Text,
  View,
  Pressable,
  LogBox,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageBackground,
} from "react-native";
import {
  REACT_APP_AUTH_CLIENT_ID,
  REACT_APP_AUTH_ENDPOINT,
  REACT_APP_FB_API_KEY,
  REACT_APP_FB_AUTH_DOMAIN,
  REACT_APP_FB_DB,
  REACT_APP_FB_PID,
  REACT_APP_FB_SB,
  REACT_APP_FB_MSG_ID,
  REACT_APP_FB_APP_ID,
  REACT_APP_FB_M_ID,
} from "@env";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import firebase from "firebase/app";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Closet from "./screens/Closet";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

let username = "";

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

const Tab = createMaterialBottomTabNavigator();

// Initialize Firebase
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
LogBox.ignoreLogs([`Setting a timer for a long period`]);

const onSelectImagePress = () =>
  launchImageLibrary({ mediaType: "image" }, onMediaSelect);

const onMediaSelect = async (media) => {
  //INSERT YOUR CODE FOR TAKING PHOTO HERE
  //img to be uploaded is assumed to be a variable called file

  // Create a ref in Firebase (user's ID)
  const ref = firebase.storage().ref().child(`uploads/${username}`);

  // Upload Base64 image to Firebase
  const snapshot = await ref.putString(file, "base64");

  // Create a download URL
  const remoteURL = await snapshot.ref.getDownloadURL();

  // Return the URL
  return remoteURL;
};

function CameraTab() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}
    >
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Button title="Upload to Wardrobe"></Button>
    </View>
  );
}

function Wardrobe() {
  return <Closet />;
}

function Outfits() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Notifications!</Text>
    </View>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="white"
      inactiveColor="#D0C8CE"
      labelStyle={{ fontSize: 12 }}
      barStyle={{ backgroundColor: "#A228FF" }}
    >
      <Tab.Screen
        name="CameraTab"
        component={CameraTab}
        options={{
          tabBarLabel: "CameraTab",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="camera" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Outfits"
        component={Outfits}
        options={{
          tabBarLabel: "Outfits",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="tshirt-crew"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Wardrobe"
        component={Wardrobe}
        options={{
          tabBarLabel: "Wardrobe",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="wardrobe" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [name, setName] = React.useState(null);

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: auth0ClientId,
      // id_token will return a JWT token
      responseType: "id_token",
      // retrieve the user's profile
      scopes: ["openid", "profile"],
      extraParams: {
        // ideally, this will be a random value
        nonce: "nonce",
      },
    },
    { authorizationEndpoint }
  );

  // Retrieve the redirect URL, add this to the callback URL list
  // of your Auth0 application.
  console.log(`Redirect URL: ${redirectUri}`);

  React.useEffect(() => {
    if (result) {
      if (result.error) {
        Alert.alert(
          "Authentication error",
          result.params.error_description || "something went wrong"
        );
        return;
      }
      if (result.type === "success") {
        // Retrieve the JWT token and decode it
        const jwtToken = result.params.id_token;
        const decoded = jwtDecode(jwtToken);

        console.log(decoded);
        const { name } = decoded;
        const { nickname } = decoded;
        const { picture } = decoded;
        setName(nickname);
        user = { nickname };
      }
    }
  }, [result]);

  return (
    <>
      {name ? (
        <NavigationContainer>
          <MyTabs />
        </NavigationContainer>
      ) : (
        <View style={styles.container}>
          <ImageBackground
            source={require("./assets/loginScreen.png")}
            style={{ flex: 1 }}
            resizeMode="cover"
          ></ImageBackground>
          <Pressable
            style={styles.button}
            disabled={!request}
            onPress={() => promptAsync({ useProxy })}
          >
            <Text style={styles.text}>Log In</Text>
          </Pressable>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    resizeMode: "stretch",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    marginTop: 0,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#D0C8CE",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
