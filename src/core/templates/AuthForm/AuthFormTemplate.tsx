import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { AuthFormTemplateStyles as styles } from "./AuthFormTemplate.styles";
import { AuthFormTemplateProps } from "./AuthFormTemplate.types";

export default function AuthFormTemplate({
  section1,
  section2,
  section3,
  keyboardVerticalOffset = 0,
}: AuthFormTemplateProps) {
  React.useEffect(() => {
    const keyboardShowEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const keyboardHideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSubscription = Keyboard.addListener(keyboardShowEvent, (event) => {
      Keyboard.scheduleLayoutAnimation(event);
    });
    const hideSubscription = Keyboard.addListener(keyboardHideEvent, (event) => {
      Keyboard.scheduleLayoutAnimation(event);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={styles.keyboardAvoidingView}
    >
      <ScrollView
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <View style={styles.section1}>{section1}</View>
        <View style={styles.section2}>{section2}</View>
        <View style={styles.section3}>{section3}</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
