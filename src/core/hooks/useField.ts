import { useRef, useState } from "react";
import { TextInput } from "react-native";

interface FieldOptions {
  initialValue?: string;
  validate?: (value: string) => string;
}

export const useField = ({
  initialValue = "",
  validate,
}: FieldOptions = {}) => {
  const [value, setValue] = useState<string>(initialValue);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const ref = useRef<TextInput>(null);

  const onChangeText = (newValue: string) => {
    setValue(newValue);
    if (!isDirty) setIsDirty(true);
  };

  const reset = () => {
    setValue(initialValue);
    setIsDirty(false);
  };

  const errorMessage = validate && isDirty ? validate(value) : "";

  return {
    inputProps: {
      value,
      ref,
      onChangeText,
    },
    errorMessage,
    ref,
    reset,
    setValue,
  };
};
