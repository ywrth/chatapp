import React, { useEffect, useState } from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat"; // importing gifted chat
import { StyleSheet, KeyboardAvoidingView } from "react-native";
import * as Font from "expo-font";
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
  const { name, backgroundColor, userID } = route.params;
  console.log(route.params);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesQuery = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(messagesQuery, (Snapshot) => {
      const fetchedMessages = Snapshot.docs.map((doc) => {
        const data = doc.data();
        const createdAt = new Date(data.createdAt.seconds * 1000);
        return {
          ...data,
          createdAt,
        };
      });
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [db]);

  const onSend = (newMessages = []) => {
    const messageToSave = {
      ...newMessages[0],
      user: {
        _id: userID,
        name: name,
      },
    };
    addDoc(collection(db, "messages"), messageToSave);
  };

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, [name, navigation]);

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: backgroundColor }}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name: name,
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
