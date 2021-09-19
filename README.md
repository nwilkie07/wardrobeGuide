# 👕👖Match Up! A Wardrobe Guide
<img width="371" alt="logo" src="https://user-images.githubusercontent.com/77548862/133926637-f4a8597d-1cd6-4a90-85dd-c387eaaf3e8f.png">

## Inspiration
No idea of what to wear? We are here to solve it!

## What it does
Generate your outfit of the day with what's in your wardrobe.

## How we built it
React-native, Node.js, Expo.io, Firebase API, Auth0 API

## Challenges we ran into
Getting the APIs to work with our flow and putting our UI design to live.

## Accomplishments that we're proud of
We've made it! Our first Hackathon project.

## What we learned
Our first try of app development.

## What's next for Match Up!
Updates and improvements hopefully. Or maybe get abandoned :)

# Auth0 Setup

## 🚀 How to use

- Install with `npm install`.
- Create your own app on [Auth0](https://auth0.com).
- Add the `AuthSession` auth URL to `Allowed Callback URLs` on Auth0.
- Add `REACT_APP_AUTH_CLIENT_ID` (auth0ClientId) and `REACT_APP_AUTH_ENDPOINT` (auth0Domain) in your `.env` file.
- Run [`expo start`](https://docs.expo.dev/versions/latest/workflow/expo-cli/), try it out.

#### AuthSession callback URL

The AuthSession helps you with browser authentication, without the need of an additional server or website. To use this with Auth0 authentication flows, we need to tell Auth0 that the callback URLs are allowed.

Each Expo user has it's own URL for different projects, the basic structure of this URL is `https://auth.expo.io/@your-username/your-expo-app-slug`. If you are signed in as `awesome-ppl`, and your app is called `meme-explorer`, your URL looks like `https://auth.expo.io/@awesome-ppl/meme-explorer`.

> [Read more about AuthSession here](https://docs.expo.dev/versions/latest/sdk/auth-session/)

#### Create a .env file
`REACT_APP_AUTH_CLIENT_ID=auth0ClientId`

`REACT_APP_AUTH_ENDPOINT=auth0Domain`

## 📝 Notes

- [Expo AuthSession docs](https://docs.expo.dev/versions/latest/sdk/auth-session/)
- [Auth0 React/SPA quickstart guide](https://auth0.com/docs/quickstart/spa/react)
