import CustomButton from "@/src/core/components/CustomButton";
import FilterSelector from "@/src/core/components/FilterSelector";
import { useActiveFilter } from "@/src/core/hooks/useActiveFilter";
import { hp, wp } from "@/src/core/utils";
import FoodSummaryCard from "@/src/features/Feeding/components/FoodSummaryCard";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function FeedingScreen() {
  const router = useRouter();
  const filterList = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
  ];
  const { handleFilterChange } = useActiveFilter();

  return (
    <ScrollView
      style={{
        paddingHorizontal: wp(12),
        gap: wp(12),
        flex: 1,
      }}
    >
      <View style={{ marginTop: hp(24) }}>
        <FilterSelector
          filterList={filterList}
          onFilterChange={handleFilterChange}
        />
      </View>
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
      <CustomButton
        type="primary"
        onPress={() => {
          router.push("/feeding_addfood" as const);
        }}
      >
        Agregar comida
      </CustomButton>
    </ScrollView>
  );
}
