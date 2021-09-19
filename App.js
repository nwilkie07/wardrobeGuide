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
import firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import Closet from "./screens/Closet";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

let username = "";

const auth0ClientId = REACT_APP_AUTH_CLIENT_ID;
const authorizationEndpoint = REACT_APP_AUTH_ENDPOINT;

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

const Tab = createMaterialBottomTabNavigator();

// Initialize Firebase
const firebaseConfig = {
  apiKey: REACT_APP_FB_API_KEY,
  authDomain: REACT_APP_FB_AUTH_DOMAIN,
  databaseURL: REACT_APP_FB_DB,
  projectId: REACT_APP_FB_PID,
  storageBucket: REACT_APP_FB_SB,
  messagingSenderId: REACT_APP_FB_MSG_ID,
  appId: REACT_APP_FB_APP_ID,
  measurementId: REACT_APP_FB_M_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
LogBox.ignoreLogs([`Setting a timer for a long period`]);

async function uploadImageAsync(uri) {
  console.log(uri);
  console.log(username);
    
  const response = await fetch(uri);
  const blob = await response.blob();
  const ref = firebase
      .storage()
      .ref()
      .child(`userUpload/${username}/`+uuidv4());

  await ref.put(blob)
      .then(snapshot => {
          return snapshot.ref.getDownloadURL(); 
      })
      .then(downloadURL => {
          console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
          return downloadURL;
  });
}

function CameraTab() {
  const [image, setImage] = useState(null);
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result);
    }
    console.log('Image URL:'+ result.uri);

    let downloadURL = uploadImageAsync(result.uri);
    console.log(downloadURL);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isFocused && (
        <Camera
          style={{ flex: 1 }}
          type={type}
          ref={(ref) => {
            this.camera = ref;
          }}
        >
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Text style={styles.text}> Flip Camera </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.camera.takePictureAsync();
              }}
            >
              <Text style={styles.text}> Capture </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={pickImage}
            >
              <Text style={styles.text}> Choose and Upload </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </SafeAreaView>
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
      //inactiveColor="#D0C8CE"
      labelStyle={{ fontSize: 12 }}
      barStyle={{ backgroundColor: "#D0C8CE" }}
    >
      <Tab.Screen
        name="CameraTab"
        component={CameraTab}
        options={{
          tabBarLabel: "Camera",
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
        username = decoded.nickname;
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
