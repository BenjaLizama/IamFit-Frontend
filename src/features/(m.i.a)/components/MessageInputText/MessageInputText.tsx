import Firework from "@/assets/images/Icons/firework.svg";
import SendMessage from "@/assets/images/Icons/send-message.svg";
import { COLOR } from "@/src/theme";
import React from "react";
import { ActivityIndicator, Pressable, TextInput, View } from "react-native";
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

  const canSend = Boolean(message.trim()) && !disabled;

  return (
    <View style={[styles.container, disabled && styles.containerDisabled]}>
      <View style={styles.inputContainer}>
        <View style={styles.leadingIcon}>
          <Firework />
        </View>
        <TextInput
          editable={!disabled}
          maxLength={800}
          multiline
          onChangeText={setMessage}
          onSubmitEditing={handleSend}
          placeholder={
            disabled ? "M.I.A. esta respondiendo..." : "Preguntale a M.I.A."
          }
          placeholderTextColor={COLOR.TEXTO_TENUE}
          returnKeyType="send"
          selectionColor={COLOR.AZUL_PRIMARIO}
          style={styles.input}
          textAlignVertical="top"
          value={message}
        />
        <Pressable
          accessibilityLabel="Enviar mensaje"
          disabled={!canSend}
          hitSlop={8}
          onPress={handleSend}
          style={[styles.sendButton, !canSend && styles.sendButtonDisabled]}
        >
          {disabled ? (
            <ActivityIndicator color={COLOR.FONDO} size="small" />
          ) : (
            <SendMessage />
          )}
        </Pressable>
      </View>
    </View>
  );
}
