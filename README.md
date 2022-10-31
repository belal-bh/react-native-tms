# react-native-tms

React Native App for Task Management System (TMS).

## Instructions to Getting Started

To use successfully run this react-native app, you also need the rest-api up and running in development server. The required repository and it's instruction can be found in link ([https://github.com/belal-bh/tms-api](https://github.com/belal-bh/tms-api)). Follow the instruction there and come back here again.

Clone this repository:

```
git clone git@github.com:belal-bh/react-native-tms.git
```

Then:

```shell
# go to the projects root directory and run

npm start
```

After that open another terminal and run:

```shell
npm run android
```

Now, the build android app will be launce in your android virtual device or your connected devices (If there already right configuration. Otherwise follow the react-native documentation).

Note yet ready!?. You should see an network error message. Because your app is trying to access the local development server and it is failing.
We have to run the folowing command to fix this.

Let's say our rest-api is running on development server on port `9001`. That means similar to this URL (`http://127.0.0.1:9001`).

So we will map the port:

```shell
adb reverse tcp:9001 tcp:9001
```

Now, everything should work properly.

## Welcome

Happy coding :)
