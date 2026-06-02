import Firework from "@/assets/images/Icons/firework.svg";
import SendMessage from "@/assets/images/Icons/send-message.svg";
import { COLOR } from "@/src/theme";
import React from "react";
import { Pressable, TextInput, View } from "react-native";
import { MessageInputTextStyles as styles } from "./MessageInputText.styles";
import { MessageInputTextProps } from "./MessageInputText.types";

export default function MessageInputText({
  disabled,
  onSend,
}: MessageInputTextProps) {
  const [message, setMessage] = React.useState("");

  const handleSend = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || disabled) {
      return;
    }

    onSend(trimmedMessage);
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.hiddenContent}>
        <View></View>
      </View>
      <View style={styles.inputContainer}>
        <Firework />
        <TextInput
          editable={!disabled}
          onChangeText={setMessage}
          onSubmitEditing={handleSend}
          placeholder="Escribe tu mensaje..."
          placeholderTextColor={COLOR.FILTER_INFORMATION_BOX}
          returnKeyType="send"
          selectionColor={COLOR.FONDO}
          style={styles.input}
          value={message}
        />
        <Pressable disabled={disabled} onPress={handleSend}>
          <SendMessage />
        </Pressable>
      </View>
    </View>
  );
}
