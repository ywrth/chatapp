// Import necessary libraries and components.
import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  // Initialize Firebase authentication.
  const auth = getAuth();
  // Background image for the Start screen.
  const backgroundImage = require("../assets/Background.png");

  // Function to sign in user anonymously.
  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          userID: result.user.uid,
          name: name,
          color: color,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try again later.", error);
      });
  };

  // Pre-defined background colors for the chat screen.
  const backgroundColors = {
    a: "#090C08",
    b: "#474056",
    c: "#8A95A5",
    d: "#B9C6AE",
  };

  // Local states for user's name and chosen background color.
  const [name, setName] = useState("");
  const [color, setColor] = useState(backgroundColors.a);

  // Component rendering starts here.
  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={styles.bgImage}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.container}
      >
        <Text style={styles.chatTitle}>ChatApp</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Your Name"
            accessible={true}
            accessibilityLabel="Name inputbox"
            accessibilityHint="Enter your name here"
            accessibilityRole="text"
          />
          <Text style={styles.colorSelectorTitle}>
            Choose a background color:
          </Text>
          <View
            style={styles.bgColorWrapper}
            accessible={true}
            accessibilityLabel="Background color selection"
            accessibilityRole="menu"
          >
            {/* Color selectors for background colors. */}
            {/* Each button allows the user to select one of the pre-defined colors. */}
            {Object.keys(backgroundColors).map((key) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.colorCircle,
                  color === backgroundColors[key] && styles.activeColorCircle,
                  { backgroundColor: backgroundColors[key] },
                ]}
                onPress={() => setColor(backgroundColors[key])}
                accessible={true}
                accessibilityLabel={`Color - ${backgroundColors[key]}`}
                accessibilityRole="menuitem"
              ></TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={signInUser}
            accessible={true}
            accessibilityLabel="Get chatting Button"
            accessibilityHint="Navigates to the chat screen."
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>Get chatting!</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

// Styling for the Start component.

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bgImage: {
    flex: 1,
    justifyContent: "space-between",
    padding: "6%",
  },
  chatTitle: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    alignSelf: "center",
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    padding: "6%",
    paddingBottom: 20,
  },
  textInput: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    padding: 15,
    borderWidth: 1,
    borderColor: "#757083",
    marginTop: 15,
    marginBottom: 15,
  },
  colorSelectorTitle: {
    fontSize: 16,
    fontWeight: "300",
    color: "#8A95A5",
    marginBottom: 10,
  },
  bgColorWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  colorCircle: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  activeColorCircle: {
    borderWidth: 2,
    borderColor: "#FCE205",
  },
  button: {
    backgroundColor: "#000",
    padding: 10,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Start;
