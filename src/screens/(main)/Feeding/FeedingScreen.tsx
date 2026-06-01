import { BottomSheet, useBottomSheet } from "@/src/core/components/BottomSheet";
import CustomButton from "@/src/core/components/CustomButton";
import FilterSelector from "@/src/core/components/FilterSelector";
import { useActiveFilter } from "@/src/core/hooks/useActiveFilter";
import FoodSummaryCard from "@/src/features/Feeding/components/FoodSummaryCard";
import React from "react";
import { View } from "react-native";
import FeedingScreenAddFood from "./FeedingScreen.addfood";
import { FeedingScreenStyles as styles } from "./FeedingScreen.styles";

export default function FeedingScreen() {
  const filterList = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
  const { handleFilterChange } = useActiveFilter(filterList[0]);
  const { openSheet, sheetRef } = useBottomSheet();

  return (
    <>
      <View style={styles.container}>
        <FilterSelector
          filterList={filterList}
          onFilterChange={handleFilterChange}
        ></FilterSelector>
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
        <View style={styles.buttonContainer}>
          <CustomButton type="primary" onPress={openSheet}>
            Añadir alimento
          </CustomButton>
        </View>
      </View>

      <BottomSheet ref={sheetRef}>
        <FeedingScreenAddFood />
      </BottomSheet>
    </>
  );
}
