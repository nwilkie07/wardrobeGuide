import * as AuthSession from 'expo-auth-session';
import jwtDecode from 'jwt-decode';
import * as React from 'react';
import { Alert, Button, Platform, StyleSheet, Text, View, Pressable } from 'react-native';
import { REACT_APP_AUTH_CLIENT_ID, REACT_APP_AUTH_ENDPOINT } from '@env';

// You need to swap out the Auth0 client id and domain with the one from your Auth0 client.
// In your Auth0 client, you need to also add a url to your authorized redirect urls.
//
// For example https://auth.expo.io/@abcdef/wardrobeGuide because I am
// signed in as the 'abcdef' account on Expo and the name/slug for this app is 'wardrobeGuide'.
//
// You can open this app in the Expo client and check your logs to find out your redirect URL.

const auth0ClientId = REACT_APP_AUTH_CLIENT_ID;
const authorizationEndpoint = REACT_APP_AUTH_ENDPOINT;

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

export default function App() {
  const [name, setName] = React.useState(null);

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: auth0ClientId,
      // id_token will return a JWT token
      responseType: 'id_token',
      // retrieve the user's profile
      scopes: ['openid', 'profile'],
      extraParams: {
        // ideally, this will be a random value
        nonce: 'nonce',
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
          'Authentication error',
          result.params.error_description || 'something went wrong'
        );
        return;
      }
      if (result.type === 'success') {
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
    <View style={styles.container}>
      {name ? (
        <>
          <Text style={styles.title}>Hello {name}!</Text>
          <Pressable style={styles.button} onPress={() => setName(null)} >
            <Text style={styles.text}>Log Out</Text>
          </Pressable>
        </>
      ) : (
        <Pressable style={styles.button} disabled={!request} onPress={() => promptAsync({ useProxy })}>
          <Text style={styles.text}>Log In</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});