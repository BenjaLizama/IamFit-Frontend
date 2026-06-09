import React from "react";
import { Pressable, TextInput, View } from "react-native";
import CustomText from "../CustomText";
import { OTPInputStyles as styles } from "./OTPInput.styles";
import { OTPInputProps } from "./OTPInput.types";
import { useOTPInput } from "./useOTPInput";

export default function OTPInput(props: OTPInputProps) {
  const { inputRef, cells, handlePress, handleChange } = useOTPInput(props);

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      {cells.map((cell) => (
        <View
          key={cell.index}
          style={[
            styles.cell,
            cell.isActive && styles.cellActive,
            cell.isFilled && styles.cellFilled,
          ]}
        >
          <CustomText type="body" style={styles.cellText}>
            {cell.char}
          </CustomText>
        </View>
      ))}

      <TextInput
        ref={inputRef}
        value={props.value}
        onChangeText={handleChange}
        keyboardType="number-pad"
        maxLength={props.length ?? 5}
        autoFocus={props.autoFocus}
        style={styles.hiddenInput}
        caretHidden
      />
    </Pressable>
  );
}
