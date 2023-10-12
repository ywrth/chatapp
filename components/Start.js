import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import * as Font from "expo-font"; // Import this if you are using Expo
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [fontLoaded, setFontLoaded] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        "Poppins-Regular": require("/Users/ywrth/Documents/PROJECTS/chatdemo/assets/Poppins/Poppins-Regular.ttf"),
      });
      setFontLoaded(true);
    }
    loadFont();
  }, []);

  const signInUser = () => {
    if (!name) {
      Alert.alert("Name is required!");
      return;
    }
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          name: name,
          userID: result.user.uid,
          backgroundColor: selectedColor,
        });
        Alert.alert("You have successfully signed in!");
      })
      .catch((error) => {
        Alert.alert("There was an error signing in.");
      });
  };

  if (!fontLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/Background.png")}
        style={styles.backgroundImage}
      >
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <View style={styles.container}>
            <Text style={styles.title}>Welcome to GossipGrove!</Text>

            <View style={styles.contentBox}>
              <TextInput
                style={styles.textInput}
                value={name}
                onChangeText={setName}
                placeholder="Your name..."
                placeholderTextColor="rgba(117, 112, 131, 0.5)"
              />
              <Text style={styles.chooseColorText}>
                Choose background color:
              </Text>
              <View style={styles.colorsContainer}>
                {["#090C08", "#474056", "#8A95A5", "#B9C6AE"].map(
                  (color, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.colorChoice,
                        { backgroundColor: color },
                        selectedColor === color && styles.selectedColor,
                      ]}
                      onPress={() => setSelectedColor(color)}
                    />
                  )
                )}
              </View>
              <TouchableOpacity style={styles.startButton} onPress={signInUser}>
                <Text style={styles.buttonText}>Start Chatting</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    fontFamily: "Poppins-Regular",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
  },
  colorsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  colorCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "Poppins-Regular", // added this here if you want the title to use the font
  },
  chooseColorText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
  },
  colorChoice: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  startButton: {
    backgroundColor: "#757083",
    padding: 15,
    borderRadius: 10,
    width: "60%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  contentBox: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    width: "88%",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  text: {
    fontFamily: "Poppins-Regular",
  },
});

export default Start;
