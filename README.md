# Auth0 Example

## 🚀 How to use

- Install with `npm install`.
- Create your own app on [Auth0](https://auth0.com).
- Add the `AuthSession` auth URL to `Allowed Callback URLs` on Auth0.
- Add `auth0ClientId` and `auth0Domain` in your `.env` file.
- Run [`expo start`](https://docs.expo.dev/versions/latest/workflow/expo-cli/), try it out.

#### AuthSession callback URL

The AuthSession helps you with browser authentication, without the need of an additional server or website. To use this with Auth0 authentication flows, we need to tell Auth0 that the callback URLs are allowed.

Each Expo user has it's own URL for different projects, the basic structure of this URL is `https://auth.expo.io/@your-username/your-expo-app-slug`. If you are signed in as `awesome-ppl`, and your app is called `meme-explorer`, your URL looks like `https://auth.expo.io/@awesome-ppl/meme-explorer`.

> [Read more about AuthSession here](https://docs.expo.dev/versions/latest/sdk/auth-session/)

#### Create a .env file
`REACT_APP_AUTH_CLIENT_ID=EMPTY`

`REACT_APP_AUTH_ENDPOINT=EMPTY`

## 📝 Notes

- [Expo AuthSession docs](https://docs.expo.dev/versions/latest/sdk/auth-session/)
- [Auth0 React/SPA quickstart guide](https://auth0.com/docs/quickstart/spa/react)
