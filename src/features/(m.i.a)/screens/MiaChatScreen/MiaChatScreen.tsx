import MessageInputText from "@/src/features/(m.i.a)/components/MessageInputText";
import MessageUserBox from "@/src/features/(m.i.a)/components/MessageUserBox";
import { COLOR } from "@/src/theme";
import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import MessageResponseBox from "../../components/MessageResponseBox";
import { hp, wp } from "@/src/core/utils";

const CHAT_DATA = [
  {
    id: "9",
    type: "user",
    text: "JAJAJA eres muy graciosa M.I.A JAJAJAJAJA no paro de reir que emocion",
  },
  { id: "8", type: "bot", text: "Agua y paja" },
  { id: "7", type: "user", text: "Y cual es la dieta del caballo?" },
  {
    id: "6",
    type: "bot",
    text: "En ese caso comenzaremos con la dieta del caballo!",
  },
  { id: "5", type: "user", text: "Quiero quedar como lucciano martinez porfa" },
  { id: "4", type: "bot", text: "No hay problema, ese es mi trabajo!" },
  {
    id: "3",
    type: "user",
    text: "Necesito que me ayudes a generar mi plan de alimentacion y entrenamiento",
  },
  {
    id: "2",
    type: "bot",
    text: "Hola, estoy muy bien, gracias ¿en que te puedo ayudar?",
  },
  { id: "1", type: "user", text: "Hola M.I.A como estas?" },
];

export default function MiaChatScreen() {
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
        data={CHAT_DATA}
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
        <MessageInputText />
      </View>
    </View>
  );
}
