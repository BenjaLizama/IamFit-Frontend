import CustomText from "@/src/core/components/CustomText";
import React from "react";
import { Pressable, View } from "react-native";
import { MessageResponseBoxStyles as styles } from "./MessageResponseBox.styles";
import { MessageResponseBoxProps } from "./MessageResponseText.types";

export default function MessageResponseBox({
  actions = [],
  disabledActions = false,
  onActionPress,
  response,
}: MessageResponseBoxProps) {
  return (
    <View style={styles.messageContainer}>
      <CustomText type="body">{response}</CustomText>
      {actions.length > 0 ? (
        <View style={styles.actionList}>
          {actions.map((action, index) => (
            <Pressable
              disabled={disabledActions}
              key={`${action.type}-${index}`}
              onPress={() => onActionPress?.(action)}
              style={[
                styles.actionButton,
                disabledActions && styles.actionButtonDisabled,
              ]}
            >
              <CustomText style={styles.actionButtonText} type="body">
                {action.label || action.type}
              </CustomText>
            </Pressable>
          ))}
        </View>
      ) : null}
      <View style={styles.extra}></View>
    </View>
  );
}
