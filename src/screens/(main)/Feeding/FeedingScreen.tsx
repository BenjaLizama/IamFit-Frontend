import FoodSummaryCard from "@/src/features/Feeding/components/FoodSummaryCard";
import React from "react";
import { View } from "react-native";

export default function FeedingScreen() {
  return (
    <View style={{ paddingHorizontal: 12, gap: 12 }}>
      <FoodSummaryCard
        tipoComida="Desayuno"
        calorias={350}
        descripcion="Tazon de yogurt griego con granola, platano y miel."
        dato1={22}
        dato2={48}
        dato3={8}
      />
      <FoodSummaryCard
        tipoComida="Almuerzo"
        calorias={500}
        descripcion="Ensalada de pollo a la parrilla con vegetales asados."
        dato1={35}
        dato2={10}
        dato3={25}
      />
      <FoodSummaryCard
        tipoComida="Cena"
        calorias={400}
        descripcion="Pescado al horno con arroz integral y brócoli."
        dato1={30}
        dato2={5}
        dato3={20}
      />
    </View>
  );
}
