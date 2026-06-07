import CustomButton from "@/src/core/components/CustomButton";
import CustomFormInput from "@/src/core/components/CustomFormInput";
import CustomText from "@/src/core/components/CustomText";
import {
  FoodCatalogItem,
  MealType,
} from "@/src/services/feeding/feeding.dtos";
import { addFood, searchFood } from "@/src/services/feeding/feeding.service";
import { getAccessToken } from "@/src/services/session/token.storage";
import { COLOR } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { FeedingScreenAddFoodStyles as styles } from "./FeedingScreen.styles";

const PORTION_STEP = 50;
const MIN_PORTION = 50;
const MAX_PORTION = 500;

const MEAL_TYPES: Array<{ label: string; value: MealType }> = [
  { label: "Desayuno", value: "DESAYUNO" },
  { label: "Almuerzo", value: "ALMUERZO" },
  { label: "Cena", value: "CENA" },
  { label: "Snack", value: "SNACK" },
];

const getFoodName = (food: FoodCatalogItem) =>
  food.name || "Alimento sin nombre";

const getFoodCalories = (food: FoodCatalogItem) =>
  food.calories || 0;

const getFoodProtein = (food: FoodCatalogItem) =>
  food.protein || 0;

const getFoodServing = (food: FoodCatalogItem) =>
  food.servingSizeG || 100;

export default function FeedingScreenAddFood() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<FoodCatalogItem[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodCatalogItem | null>(
    null,
  );
  const [portion, setPortion] = useState(100);
  const [mealType, setMealType] = useState<MealType>("ALMUERZO");
  const [isSearching, setIsSearching] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const caloriesCalculated = useMemo(() => {
    if (!selectedFood) {
      return 0;
    }

    return Math.round((getFoodCalories(selectedFood) * portion) / 100);
  }, [portion, selectedFood]);

  const handleIncreasePortion = useCallback(() => {
    setPortion((prev) => Math.min(prev + PORTION_STEP, MAX_PORTION));
  }, []);

  const handleDecreasePortion = useCallback(() => {
    setPortion((prev) => Math.max(prev - PORTION_STEP, MIN_PORTION));
  }, []);

  const handleSearchFood = async () => {
    const query = searchText.trim();

    if (!query) {
      setStatusMessage("Escribe un alimento para buscar.");
      return;
    }

    try {
      setIsSearching(true);
      setStatusMessage("");
      setSelectedFood(null);

      const token = await getAccessToken();
      const results = await searchFood(query, token);

      setSearchResults(results);
      setStatusMessage(
        results.length
          ? `${results.length} alimento${results.length === 1 ? "" : "s"} encontrado${results.length === 1 ? "" : "s"}.`
          : "No se encontraron alimentos.",
      );
    } catch (error) {
      console.error("Error buscando alimentos:", error);
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "No se pudo buscar en el catalogo.",
      );
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectFood = (food: FoodCatalogItem) => {
    if (!food.id) {
      setStatusMessage(
        "Este resultado externo aun no tiene ID en el catalogo. Busca de nuevo o selecciona un resultado local.",
      );
      return;
    }

    setSelectedFood(food);
    setSearchText("");
    setSearchResults([]);
    setPortion(getFoodServing(food));
    setStatusMessage("");
  };

  const handleRegisterFood = async () => {
    if (!selectedFood) {
      return;
    }

    if (!selectedFood.id) {
      setStatusMessage("No se puede registrar un alimento sin ID de catalogo.");
      return;
    }

    try {
      setIsRegistering(true);
      setStatusMessage("");

      const token = await getAccessToken();
      await addFood(
        {
          foodItemId: selectedFood.id,
          mealType,
          quantity: portion,
        },
        token,
      );

      router.back();
    } catch (error) {
      console.error("Error registrando alimento:", error);
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "No se pudo registrar el alimento.",
      );
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.addFoodContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.searchSection}>
        <CustomFormInput
          placeholder="Buscar alimento..."
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearchFood}
          returnKeyType="search"
          submitBehavior="submit"
        />
        <CustomButton
          type="secondary"
          isLoading={isSearching}
          onPress={handleSearchFood}
        >
          Buscar en catalogo
        </CustomButton>
      </View>

      {!selectedFood && searchResults.length > 0 && (
        <View style={styles.resultsSection}>
          <CustomText type="body_secondary" style={styles.sectionLabel}>
            Resultados
          </CustomText>

          <ScrollView
            nestedScrollEnabled
            showsVerticalScrollIndicator
            style={styles.resultsScroll}
            contentContainerStyle={styles.resultsScrollContent}
          >
            {searchResults.map((food) => (
              <Pressable
                key={food.id || `${getFoodName(food)}-${getFoodServing(food)}`}
                style={styles.resultItem}
                onPress={() => handleSelectFood(food)}
              >
                <View style={styles.resultItemContent}>
                  <CustomText type="body" style={{ flex: 1 }}>
                    {getFoodName(food)}
                  </CustomText>
                  <CustomText type="body_secondary">
                    {Math.round(getFoodCalories(food))} kcal
                  </CustomText>
                </View>
                <CustomText type="body_secondary">
                  Porcion: {getFoodServing(food)}g - Proteina:{" "}
                  {Math.round(getFoodProtein(food))}g
                </CustomText>
                <CustomText type="body_secondary">
                  {food.foodCategory || (food.id ? "catalogo" : "externo")}
                  {!food.id ? " - sin ID para registrar" : ""}
                </CustomText>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}

      {selectedFood && (
        <View style={styles.selectedFoodSection}>
          <View style={styles.selectedFoodHeader}>
            <CustomText type="h2">{getFoodName(selectedFood)}</CustomText>
            <Pressable onPress={() => setSelectedFood(null)}>
              <CustomText type="body_interactive">Cambiar</CustomText>
            </Pressable>
          </View>

          <View style={styles.portionSection}>
            <CustomText type="body_secondary" style={styles.sectionLabel}>
              Porcion
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
                <CustomText type="h2">{caloriesCalculated} kcal</CustomText>
              </View>
            </View>
          </View>

          <View style={styles.portionSection}>
            <CustomText type="body_secondary" style={styles.sectionLabel}>
              Tipo de comida
            </CustomText>
            <View style={styles.mealTypeRow}>
              {MEAL_TYPES.map((option) => {
                const isSelected = option.value === mealType;

                return (
                  <Pressable
                    key={option.value}
                    onPress={() => setMealType(option.value)}
                    style={[
                      styles.mealTypeChip,
                      isSelected && styles.mealTypeChipSelected,
                    ]}
                  >
                    <CustomText
                      type="body"
                      color={isSelected ? COLOR.FONDO : COLOR.TEXTO_PRINCIPAL}
                    >
                      {option.label}
                    </CustomText>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.registerButtonContainer}>
            <CustomButton
              type="primary"
              isLoading={isRegistering}
              onPress={handleRegisterFood}
            >
              Registrar alimento
            </CustomButton>
          </View>
        </View>
      )}

      {!!statusMessage && (
        <CustomText type="body_secondary" style={styles.statusText}>
          {statusMessage}
        </CustomText>
      )}
    </ScrollView>
  );
}
