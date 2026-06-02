import { hp } from "@/src/core/utils";
import MessageInputText from "@/src/features/(m.i.a)/components/MessageInputText";
import MessageUserBox from "@/src/features/(m.i.a)/components/MessageUserBox";
import { getMiaResponseText, sendPromptToMia } from "@/src/services/mia/mia.service";
import {
  getStoredMiaMessages,
  saveMiaMessages,
} from "@/src/services/mia/mia.chat.storage";
import { MiaChatMessage } from "@/src/services/mia/mia.dtos";
import { COLOR } from "@/src/theme";
import React from "react";
import { FlatList, View } from "react-native";
import MessageResponseBox from "../../components/MessageResponseBox";

const createMessageId = () => `${Date.now()}-${Math.random()}`;
const loadingMessage: MiaChatMessage = {
  id: "mia-loading",
  type: "bot",
  text: "M.I.A. esta escribiendo...",
};
const MIA_CHAT_DEBUG = true;
const COMPOSER_SPACE = hp(96);

export default function MiaChatScreen() {
  const hasLoadedStoredMessages = React.useRef(false);
  const [messages, setMessages] = React.useState<MiaChatMessage[]>([]);
  const [isSending, setIsSending] = React.useState(false);
  const visibleMessages = React.useMemo(
    () => (isSending ? [loadingMessage, ...messages] : messages),
    [isSending, messages],
  );

  React.useEffect(() => {
    let isMounted = true;

    const loadStoredMessages = async () => {
      const storedMessages = await getStoredMiaMessages();

      if (!isMounted) {
        return;
      }

      setMessages(storedMessages);
      hasLoadedStoredMessages.current = true;

      if (MIA_CHAT_DEBUG) {
        console.log("[MIA screen] restored messages:", storedMessages);
      }
    };

    void loadStoredMessages();

    return () => {
      isMounted = false;
    };
  }, []);

  React.useEffect(() => {
    if (!hasLoadedStoredMessages.current) {
      return;
    }

    void saveMiaMessages(messages);
  }, [messages]);

  React.useEffect(() => {
    if (!MIA_CHAT_DEBUG) return;

    console.log("[MIA screen] messages count:", messages.length);
    console.log("[MIA screen] is sending:", isSending);
    console.log("[MIA screen] visible messages:", visibleMessages);
  }, [isSending, messages, visibleMessages]);

  const handleSendMessage = async (message: string) => {
    if (MIA_CHAT_DEBUG) {
      console.log("[MIA screen] send pressed:", message);
    }

    const userMessage: MiaChatMessage = {
      id: createMessageId(),
      type: "user",
      text: message,
    };

    setMessages((currentMessages) => [userMessage, ...currentMessages]);
    setIsSending(true);

    try {
      const response = await sendPromptToMia(message);
      const responseText = getMiaResponseText(response);

      if (MIA_CHAT_DEBUG) {
        console.log("[MIA screen] service response:", response);
        console.log("[MIA screen] extracted response text:", responseText);
      }

      const botMessage: MiaChatMessage = {
        id: createMessageId(),
        type: "bot",
        text: responseText,
      };

      setMessages((currentMessages) => [botMessage, ...currentMessages]);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "No se pudo obtener respuesta de M.I.A.";

      if (MIA_CHAT_DEBUG) {
        console.log("[MIA screen] error:", error);
        console.log("[MIA screen] error message:", errorMessage);
      }

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
        data={visibleMessages}
        style={{ flex: 1 }}
        inverted={true}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={<View style={{ height: COMPOSER_SPACE }} />}
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: hp(12),
        }}
        renderItem={({ item }) => {
          if (MIA_CHAT_DEBUG) {
            console.log("[MIA screen] render message:", item);
          }

          return item.type === "user" ? (
            <MessageUserBox message={item.text} />
          ) : (
            <MessageResponseBox response={item.text} />
          );
        }}
      />
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: hp(12),
          zIndex: 10,
        }}
      >
        <MessageInputText disabled={isSending} onSend={handleSendMessage} />
      </View>
    </View>
  );
}
