import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import * as Font from "expo-font"; // Import this if you are using Expo

const Chat = ({ route, navigation }) => {
  const { name, backgroundColor } = route.params;
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: name,
    });

    async function loadFont() {
      await Font.loadAsync({
        "Poppins-Regular": require("/Users/ywrth/Documents/PROJECTS/chatdemo/assets/Poppins/Poppins-Regular.ttf"),
      });
      setFontLoaded(true);
    }

    loadFont();
  }, []);

  if (!fontLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text style={styles.text}>Welcome, {name}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#FDDA0D",
    fontFamily: "Poppins-Regular",
  },
});

export default Chat;
