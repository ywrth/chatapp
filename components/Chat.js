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
    navigation.setOptions({ title: name });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
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
