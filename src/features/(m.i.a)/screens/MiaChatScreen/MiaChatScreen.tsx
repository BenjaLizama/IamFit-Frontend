import { hp, wp } from "@/src/core/utils";
import MessageInputText from "@/src/features/(m.i.a)/components/MessageInputText";
import MessageUserBox from "@/src/features/(m.i.a)/components/MessageUserBox";
import {
  getMiaResponseText,
  sendPromptToMia,
} from "@/src/services/mia/mia.service";
import { COLOR } from "@/src/theme";
import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import MessageResponseBox from "../../components/MessageResponseBox";

type ChatMessage = {
  id: string;
  type: "user" | "bot";
  text: string;
};

const createMessageId = () => `${Date.now()}-${Math.random()}`;

export default function MiaChatScreen() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = React.useState(false);

  const handleSendMessage = async (message: string) => {
    const userMessage: ChatMessage = {
      id: createMessageId(),
      type: "user",
      text: message,
    };

    setMessages((currentMessages) => [userMessage, ...currentMessages]);
    setIsSending(true);

    try {
      const response = await sendPromptToMia(message);
      const botMessage: ChatMessage = {
        id: createMessageId(),
        type: "bot",
        text: getMiaResponseText(response),
      };

      setMessages((currentMessages) => [botMessage, ...currentMessages]);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "No se pudo obtener respuesta de M.I.A.";

      setMessages((currentMessages) => [
        {
          id: createMessageId(),
          type: "bot",
          text: errorMessage,
        },
        ...currentMessages,
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLOR.SIN_COLOR,
        position: "relative",
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        data={messages}
        inverted={true}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingTop: hp(80),
        }}
        renderItem={({ item }) =>
          item.type === "user" ? (
            <MessageUserBox message={item.text} />
          ) : (
            <MessageResponseBox response={item.text} />
          )
        }
      />
      <View
        style={{
          position: "absolute",
          bottom: hp(12),
          left: wp(0),
          right: wp(0),
          zIndex: 10,
        }}
      >
        <MessageInputText disabled={isSending} onSend={handleSendMessage} />
      </View>
    </View>
  );
}
