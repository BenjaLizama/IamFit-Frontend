import Firework from "@/assets/images/Icons/firework.svg";
import SendMessage from "@/assets/images/Icons/send-message.svg";
import { COLOR } from "@/src/theme";
import React from "react";
import { Pressable, TextInput, View } from "react-native";
import { MessageInputTextStyles as styles } from "./MessageInputText.styles";

export default function MessageInputText() {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Firework />
        <TextInput
          selectionColor={COLOR.FONDO}
          placeholder="Escribe tu mensaje..."
          placeholderTextColor={COLOR.FILTER_INFORMATION_BOX}
          style={styles.input}
        />
        <Pressable onPress={() => console.log("Hola Mundo!")}>
          <SendMessage />
        </Pressable>
      </View>
    </View>
  );
}
