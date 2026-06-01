import React, { createContext, useContext, useState } from "react";

// 1. EL MOLDE DE LOS DATOS: Aquí declaras todo lo que vas a guardar
export interface RegisterData {
  age?: string;
  height?: string;
  weight?: string;
  sex?: string;
  nickname?: string;
  email?: string;
  password?: string;
}

// Los métodos que el contexto expondrá a las pantallas
interface RegisterContextType {
  formData: RegisterData;
  updateData: (newData: Partial<RegisterData>) => void;
  resetForm: () => void;
}

// 2. CREACIÓN DEL CONTEXTO
const RegisterContext = createContext<RegisterContextType | undefined>(
  undefined,
);

// 3. EL PROVIDER: Guarda el estado real en memoria
export function RegisterProvider({ children }: { children: React.ReactNode }) {
  // Inicializamos el estado vacío (o con valores por defecto)
  const [formData, setFormData] = useState<RegisterData>({});

  // Función para actualizar datos mezclando lo viejo con lo nuevo (...prev)
  const updateData = (newData: Partial<RegisterData>) => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  // Función para limpiar el formulario al terminar el registro
  const resetForm = () => setFormData({});

  return (
    <RegisterContext.Provider value={{ formData, updateData, resetForm }}>
      {children}
    </RegisterContext.Provider>
  );
}

// 4. EL HOOK: El que importas en tus pantallas para extraer "formData" o "updateData"
export function useRegisterForm() {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error(
      "useRegisterForm debe ser usado dentro de un RegisterProvider",
    );
  }
  return context;
}
