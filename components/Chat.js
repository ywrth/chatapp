import React, { useEffect, useState } from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat"; // importing gifted chat
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import * as Font from "expo-font";

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
      {
        _id: 2,
        text: "YOU JOINED THE CHAT",
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: backgroundColor }}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </KeyboardAvoidingView>
  );
};

const renderBubble = (props) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#06B",
        },
        left: {
          backgroundColor: "#FFF",
        },
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
