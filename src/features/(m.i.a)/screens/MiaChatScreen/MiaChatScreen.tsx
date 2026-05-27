import MessageInputText from "@/src/features/(m.i.a)/components/MessageInputText";
import MessageUserBox from "@/src/features/(m.i.a)/components/MessageUserBox";
import MaskedView from "@react-native-masked-view/masked-view";
import React from "react";
import { ScrollView, View } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { MiaChatScreenStyles as styles } from "./MiaChatScreen.styles";

export interface MiaChatScreenProps {
  name: string;
}

const INPUT_BOTTOM_MARGIN = 12;
const FADE_HEIGHT = 30;

export default function MiaChatScreen({ name }: MiaChatScreenProps) {
  const [inputHeight, setInputHeight] = React.useState(0);
  const [hostWidth, setHostWidth] = React.useState(0);
  const [hostHeight, setHostHeight] = React.useState(0);

  const blockedHeight = inputHeight + INPUT_BOTTOM_MARGIN;

  return (
    <View style={styles.container}>
      <View style={styles.messagesHost}>
        <MaskedView
          style={styles.messagesScroll}
          maskElement={
            <View
              style={{ flex: 1 }}
              onLayout={(e) => {
                setHostWidth(e.nativeEvent.layout.width);
                setHostHeight(e.nativeEvent.layout.height);
              }}
            >
              {hostWidth > 0 && hostHeight > 0 ? (
                <Svg
                  width={hostWidth || "100%"}
                  height={hostHeight}
                  preserveAspectRatio="none"
                >
                  <Defs>
                    <LinearGradient id="fadeMask" x1="0" y1="0" x2="0" y2="1">
                      <Stop offset="0" stopColor="#000" stopOpacity={1} />
                      <Stop offset="0.35" stopColor="#000" stopOpacity={0.75} />
                      <Stop offset="0.7" stopColor="#000" stopOpacity={0.25} />
                      <Stop offset="1" stopColor="#000" stopOpacity={0} />
                    </LinearGradient>
                  </Defs>

                  {(() => {
                    const fadeTopY = Math.max(
                      0,
                      hostHeight - blockedHeight - FADE_HEIGHT,
                    );
                    const solidHeight = Math.max(0, fadeTopY);

                    return (
                      <>
                        {/* zona 100% visible */}
                        <Rect
                          x={0}
                          y={0}
                          width={hostWidth}
                          height={solidHeight}
                          fill="#000"
                        />

                        {/* fade 1 -> 0 */}
                        <Rect
                          x={0}
                          y={fadeTopY}
                          width={hostWidth}
                          height={FADE_HEIGHT}
                          fill="url(#fadeMask)"
                        />
                        {/* debajo del fade (incluye input) queda sin dibujar => alpha 0 */}
                      </>
                    );
                  })()}
                </Svg>
              ) : (
                <View style={{ flex: 1, backgroundColor: "#000" }} />
              )}
            </View>
          }
        >
          <ScrollView
            style={styles.messagesScroll}
            contentContainerStyle={[
              styles.messagesContent,
              { paddingBottom: blockedHeight },
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <MessageUserBox />
            <MessageUserBox />
            <MessageUserBox />
            <MessageUserBox />
            <MessageUserBox />
            <MessageUserBox />
            <MessageUserBox />
            <MessageUserBox />
            <MessageUserBox />
            <MessageUserBox />
            <MessageUserBox />
            <MessageUserBox />
            <MessageUserBox />
            <MessageUserBox />
            <MessageUserBox />
            <MessageUserBox />
            <MessageUserBox />
          </ScrollView>
        </MaskedView>
      </View>

      <View
        style={styles.inputHost}
        onLayout={(e) => setInputHeight(e.nativeEvent.layout.height)}
      >
        <MessageInputText />
      </View>
    </View>
  );
}
