// Importing necessary libraries and components.
import { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from "./CustomActions"; // Component for custom actions in chat.
import MapView from "react-native-maps"; // For rendering location messages.

const Chat = ({ route, navigation, db, isConnected, storage }) => {
  // Extracting parameters from navigation route.
  const { name, color, userID } = route.params;

  // State for storing chat messages.
  const [messages, setMessages] = useState([]);

  let unsubMessages; // Variable to handle Firestore listener unsubscribe.

  // Set the navigation title to the user's name.
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  // Effect hook to handle fetching messages from Firestore or local cache.
  useEffect(() => {
    if (isConnected === true) {
      if (unsubMessages) unsubMessages(); // Unsubscribe any previous Firestore listener.
      unsubMessages = null;

      // Query Firestore for messages, ordered by their creation date.
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

      // Listen for real-time changes in messages collection.
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach((doc) => {
          newMessages.push({
            _id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessages(newMessages); // Cache the fetched messages.
        setMessages(newMessages); // Update state with new messages.
      });
    } else loadCachedMessages();

    // Cleanup function to unsubscribe from Firestore listener.
    return () => {
      if (unsubMessages) {
        unsubMessages();
      }
    };
  }, [isConnected]);

  // Load messages from AsyncStorage.
  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  // Cache messages in AsyncStorage.
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  // Handler to send new messages to Firestore.
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  // Custom bubble styles for chat.
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  // Input toolbar rendering conditionally based on connection status.
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  // Rendering custom actions for chat.
  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} {...props} />;
  };

  // Rendering custom view for location messages.
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
  };

  // Main chat UI rendering.
  return (
    <View style={[styles.container, { flex: 1, backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name,
        }}
        accessible={true}
        accessibilityLabel="Chat text box"
        accessibilityHint="Displays messages."
        accessibilityRole="text"
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

// Styling for the Chat component.
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
