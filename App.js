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
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { REACT_APP_AUTH_CLIENT_ID, REACT_APP_AUTH_ENDPOINT } from "@env";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";

const auth0ClientId = "lwLIMn3PErALFA3LM6aculLTIuZwqIxd";
const authorizationEndpoint = "https://dev-zvi726ys.us.auth0.com/authorize";

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

const Tab = createMaterialBottomTabNavigator();

function CameraTab() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
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
              <Text style={styles.text}> Flip </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.camera.takePictureAsync();
              }}
            >
              <Text style={styles.text}> Capture </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </SafeAreaView>
  );
}

function Wardrobe() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile!</Text>
    </View>
  );
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
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
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
