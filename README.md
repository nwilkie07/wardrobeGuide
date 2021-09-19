# 👕👖Match Up! A Wardrobe Guide
![icon](https://user-images.githubusercontent.com/77548862/133927664-d3952ad1-7574-4bdb-ab17-8cc4d0c50cc7.png)

### Inspiration
**No idea of what to wear? We are here to solve it! **   
✨A flash of spiritual light! We thought of weather-music generators and personal closet recording application, so why don't we make an app that generates outfit based on the weather?   
Already tired of struggling to choose what to wear today in front of the closet, you always forget that you have some clothes sitting in the corner that you haven't had time to take out yet and have missed the right season. What is the weather today? Should I dress cooler or is it best to keep warm?    

### What it does
📷 You can keep track of your clothes in your Match Up wardrobe by taking pictures of them.  
🪄 Generate your outfit of the day based on today's weather with what's in your wardrobe.  
🕺 Easily browse and manage the clothes you have now in Match Up.  

### How we built it
React-native, Node.js, Expo.io, Firebase API, Auth0 API

### Challenges we ran into
- Getting the APIs to work with our flow and putting our UI design to live. 
- The team members have different time zones around the globe, but we overcome this well: there is always someone who is continuing to work at any given time.

### Accomplishments that we're proud of
- We've made it! Our first Hackathon project! We finally finished the project!
- We succeeded in accomplishing the functionality we originally envisioned.
- We have a good looking UI in the end.  

### What we learned
Our skills were further enhanced by working together and learning from each other. This was the first time we completed a project in such a short period of time that we were not able to perfect every detail. We couldn't think too much, but we had to do those things that we could accomplish. We learned more about how to work with different functional team members to complete the project, and this experience will help us collaborate better when we do more complex projects.   

### What's next for Match Up!
- Updates and improvements hopefully. Or maybe get abandoned :)
- Optimize it's prototype and make a smoother user experience - it might be in our future portfolio!

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
