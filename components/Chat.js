import React, { useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat"; // importing gifted chat
import { StyleSheet, View, Text } from "react-native";
import * as Font from "expo-font"; // Import this if you are using Expo

const Chat = ({ route, navigation }) => {
  const { name, backgroundColor } = route.params;
  const [fontLoaded, setFontLoaded] = useState(false);
  const [messages, setMessages] = useState([]);
  const onSend = (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

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
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: 1,
        }}
      />
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
