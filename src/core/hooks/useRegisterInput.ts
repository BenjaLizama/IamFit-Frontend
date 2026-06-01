import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { RegisterData, useRegisterForm } from "../context/RegisterContext";

export function useRegisterInput(
  fieldKey: keyof RegisterData,
  nextRoute: string,
) {
  const { formData, updateData } = useRegisterForm();
  const router = useRouter();

  // Estado local para el texto del input
  const [value, setValue] = useState(() => String(formData[fieldKey] || ""));

  // Sincronizar el valor si el contexto cambia por fuera
  useEffect(() => {
    setValue(String(formData[fieldKey] || ""));
  }, [formData[fieldKey]]);

  // Memorizamos el cambio de texto para que mantenga siempre la misma referencia física
  const onChangeText = useCallback(
    (text: string) => {
      setValue(text);
      updateData({ [fieldKey]: text });
    },
    [fieldKey, updateData],
  );

  // Memorizamos la navegación
  const handleContinue = useCallback(
    (customAction?: () => void) => {
      if (customAction) {
        customAction();
      } else {
        router.push(nextRoute as any);
      }
    },
    [nextRoute, router],
  );

  return {
    value,
    onChangeText,
    handleContinue,
  };
}
