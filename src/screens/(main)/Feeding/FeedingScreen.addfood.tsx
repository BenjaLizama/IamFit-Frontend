import CustomButton from "@/src/core/components/CustomButton";
import CustomFormInput from "@/src/core/components/CustomFormInput";
import CustomText from "@/src/core/components/CustomText";
import { COLOR } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { FeedingScreenAddFoodStyles as styles } from "./FeedingScreen.styles";

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  porcion: number;
}

const MOCK_RESULTS: FoodItem[] = [
  {
    id: "1",
    name: "Pollo entero asado",
    porcion: 100,
    calories: 165,
    protein: 27,
  },
  {
    id: "2",
    name: "Muslo de pollo",
    porcion: 100,
    calories: 209,
    protein: 24,
  },
];

export default function FeedingScreenAddFood() {
  const [searchText, setSearchText] = useState("");
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [portion, setPortion] = useState(100);

  // Constantes
  const PORTION_STEP = 50;
  const MIN_PORTION = 50;
  const MAX_PORTION = 500;

  // Handlers memorizados
  const handleIncreasePortion = useCallback(() => {
    setPortion((prev) => Math.min(prev + PORTION_STEP, MAX_PORTION));
  }, []);

  const handleDecreasePortion = useCallback(() => {
    setPortion((prev) => Math.max(prev - PORTION_STEP, MIN_PORTION));
  }, []);

  // Cálculo simple sin useMemo - evita problemas de hooks
  const caloriesCalculated = selectedFood
    ? Math.round((selectedFood.calories * portion) / 100)
    : 0;

  return (
    <ScrollView
      style={styles.addFoodContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Search Input */}
      <View style={styles.searchSection}>
        <CustomFormInput
          placeholder="Buscar alimento..."
          value={searchText}
          onChangeText={setSearchText}
          returnKeyType="done"
          submitBehavior="blurAndSubmit"
        />
      </View>

      {/* Results Section */}
      {!selectedFood && searchText && (
        <View style={styles.resultsSection}>
          <CustomText type="body_secondary" style={styles.sectionLabel}>
            Resultados
          </CustomText>

          <View style={styles.resultsList}>
            {MOCK_RESULTS.map((food) => (
              <Pressable
                key={food.id}
                style={styles.resultItem}
                onPress={() => {
                  setSelectedFood(food);
                  setSearchText("");
                }}
              >
                <View style={styles.resultItemContent}>
                  <CustomText type="body" style={{ flex: 1 }}>
                    {food.name}
                  </CustomText>
                  <CustomText type="body_secondary">
                    {food.calories} kcal
                  </CustomText>
                </View>
                <CustomText type="body_secondary">
                  Porción: {food.porcion}g - Proteína: {food.protein}g
                </CustomText>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {/* Selected Food Info */}
      {selectedFood && (
        <>
          <View style={styles.selectedFoodSection}>
            <View style={styles.selectedFoodHeader}>
              <CustomText type="h3">{selectedFood.name}</CustomText>
              <Pressable onPress={() => setSelectedFood(null)}>
                <CustomText type="body_interactive">Cambiar</CustomText>
              </Pressable>
            </View>

            {/* Portion Section */}
            <View style={styles.portionSection}>
              <CustomText type="body_secondary" style={styles.sectionLabel}>
                Porción
              </CustomText>

              <View style={styles.portionInputContainer}>
                <Pressable
                  style={styles.stepperButton}
                  onPress={handleDecreasePortion}
                  disabled={portion <= MIN_PORTION}
                >
                  <Ionicons
                    name="remove"
                    size={24}
                    color={
                      portion <= MIN_PORTION
                        ? COLOR.TEXTO_SECUNDARIO
                        : COLOR.AZUL_PRIMARIO
                    }
                  />
                </Pressable>

                <View style={styles.portionDisplay}>
                  <CustomText type="h2">{portion}</CustomText>
                  <CustomText type="body">g</CustomText>
                </View>

                <Pressable
                  style={styles.stepperButton}
                  onPress={handleIncreasePortion}
                  disabled={portion >= MAX_PORTION}
                >
                  <Ionicons
                    name="add"
                    size={24}
                    color={
                      portion >= MAX_PORTION
                        ? COLOR.TEXTO_SECUNDARIO
                        : COLOR.AZUL_PRIMARIO
                    }
                  />
                </Pressable>

                <View style={styles.portionResult}>
                  <CustomText type="body_secondary">=</CustomText>
                  <CustomText type="h3">{caloriesCalculated} kcal</CustomText>
                </View>
              </View>
            </View>

            {/* Register Button */}
            <View style={styles.registerButtonContainer}>
              <CustomButton type="primary">
                Registrar como almuerzo
              </CustomButton>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}
