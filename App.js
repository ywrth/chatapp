import React, { useState, useEffect } from "react";
import Start from "./components/Start";
import Chat from "./components/Chat";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View, Text } from "react-native";

const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          "Poppins-Regular": require("/Users/ywrth/Documents/PROJECTS/chatdemo/assets/Poppins/Poppins-Regular.ttf"),

          // Add other font variants if needed
        });
        setFontLoaded(true);
      } catch (error) {
        console.log("Error loading fonts", error);
      }
    }
    loadFonts();
  }, []);

  const firebaseConfig = {
    apiKey: "AIzaSyBiKks1xBaPvbIHOc-fuWiVDY_uU2aeecE",
    authDomain: "chat-app-b5d54.firebaseapp.com",
    projectId: "chat-app-b5d54",
    storageBucket: "chat-app-b5d54.appspot.com",
    messagingSenderId: "191214536655",
    appId: "1:191214536655:web:4ab0db725522ba2c48f4ba",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  if (!fontLoaded) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat {...props} db={db} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Poppins-Regular",
  },
});

export default App;
