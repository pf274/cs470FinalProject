import { StyleSheet, TextInput, Button } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import * as Speech from "expo-speech";

async function convertTextToSpeech(text: string) {
  const available = (await Speech.getAvailableVoicesAsync()) || [];
  let voice = available.find(
    (v) => v.language == "en-US" && v.quality == "Enhanced"
  );
  if (!voice) {
    voice = available.find((v) => v.language == "en-US");
  }
  if (!voice && available.length > 0) {
    voice = available[0];
  }
  Speech.speak(text, { voice: voice?.identifier || undefined });
}

export default function HuggingFaceScreen() {
  const [textToSpeechValue, setTextToSpeechValue] = useState("");
  return (
    <ThemedView
      style={{
        flex: 1,
        padding: 20,
        paddingTop: 100,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">HuggingFace Tests</ThemedText>
      </ThemedView>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          color: "white",
          paddingLeft: 10,
        }}
        value={textToSpeechValue}
        onChangeText={setTextToSpeechValue}
      />
      <Button
        title="Text to Speech"
        onPress={() => convertTextToSpeech(textToSpeechValue)}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
