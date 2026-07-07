import CustomText from "@/src/core/components/CustomText";
import { COLOR } from "@/src/theme";
import React from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { MessageResponseBoxStyles as styles } from "./MessageResponseBox.styles";
import { MessageResponseBoxProps } from "./MessageResponseText.types";

export default function MessageResponseBox({
  activeActionKey,
  actions = [],
  disabledActions = false,
  getActionKey,
  getActionLoadingLabel,
  onActionPress,
  response,
}: MessageResponseBoxProps) {
  return (
    <View style={styles.messageContainer}>
      <CustomText style={styles.responseText} type="body">
        {response}
      </CustomText>
      {actions.length > 0 ? (
        <View style={styles.actionList}>
          {actions.map((action, index) => {
            const actionKey = getActionKey?.(action, index);
            const isLoading = Boolean(
              activeActionKey && actionKey === activeActionKey,
            );

            return (
              <Pressable
                disabled={disabledActions}
                key={`${action.type}-${index}`}
                onPress={() => onActionPress?.(action, index)}
                style={[
                  styles.actionButton,
                  disabledActions && !isLoading && styles.actionButtonDisabled,
                ]}
              >
                {isLoading ? (
                  <ActivityIndicator
                    color={COLOR.TEXTO_BOTON_PRIMARIO}
                    size="small"
                  />
                ) : null}
                <CustomText
                  style={styles.actionButtonText}
                  type="button_primary"
                >
                  {isLoading
                    ? getActionLoadingLabel?.(action) || "Cargando..."
                    : action.label || action.type}
                </CustomText>
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}
