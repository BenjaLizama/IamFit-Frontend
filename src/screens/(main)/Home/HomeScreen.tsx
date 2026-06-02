import CustomCarousel from "@/src/core/components/CustomCarousel";
import CustomText from "@/src/core/components/CustomText";
import { hp } from "@/src/core/utils";
import DailyGoalItem from "@/src/features/home/components/DailyGoalItem";
import DailyGoalProgressItem from "@/src/features/home/components/DailyGoalProgressItem/DailyGoalProgressItem";
import DayCalendarCard from "@/src/features/home/components/DayCalendarCard";
import ProgressTaskCard from "@/src/features/home/components/ProgressTaskCard";
import WelcomeUser from "@/src/features/home/components/WelcomeUser";
import {
  getDailyCalorieSummary,
  getDailyProteinFood,
} from "@/src/services/feeding/feeding.service";
import { getAccessToken } from "@/src/services/session/token.storage";
import { getNickname } from "@/src/services/session/user.storage";
import { COLOR, UI } from "@/src/theme";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { HomeScreenStyles as styles } from "./HomeScreen.styles";

export default function HomeScreen() {
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [loading, setLoading] = useState(true);
  const [nickname, setNickname] = useState<string | null>("");

  // Cargar datos del usuario
  useEffect(() => {
    const chargeUserData = async () => {
      try {
        const nickname = await getNickname();
        setNickname(nickname);
      } catch (error) {
        console.error("Error cargando Nickname:", error);
      } finally {
        setLoading(false);
      }
    };

    chargeUserData();
  }, []);

  useEffect(() => {
    const cargarCalorias = async () => {
      try {
        const token = await getAccessToken();
        const myCalories = await getDailyCalorieSummary(token);
        setCalories(myCalories);
      } catch (error) {
        console.error("Error cargando calorias de la API:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarCalorias();
  }, []);

  useEffect(() => {
    const cargarProteina = async () => {
      try {
        const token = await getAccessToken();
        const myProtein = await getDailyProteinFood(token);
        setProtein(myProtein);
      } catch (error) {
        console.error("Error cargando proteina de la API:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarProteina();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <WelcomeUser name={nickname} />
      <CustomCarousel mode="centered" initialIndex={7}>
        {/* --- UNA SEMANA ANTES --- */}
        <DayCalendarCard month="Agosto" dayNumber={1} dayText="Sabado" />
        <DayCalendarCard month="Agosto" dayNumber={2} dayText="Domingo" />
        <DayCalendarCard month="Agosto" dayNumber={3} dayText="Lunes" />
        <DayCalendarCard month="Agosto" dayNumber={4} dayText="Martes" />
        <DayCalendarCard month="Agosto" dayNumber={5} dayText="Miercoles" />
        <DayCalendarCard month="Agosto" dayNumber={6} dayText="Jueves" />
        <DayCalendarCard month="Agosto" dayNumber={7} dayText="Viernes" />

        {/* --- DÍA SELECCIONADO --- */}
        <DayCalendarCard
          type="selected"
          month="Agosto"
          dayNumber={8}
          dayText="Sabado"
        />

        {/* --- UNA SEMANA DESPUÉS --- */}
        <DayCalendarCard month="Agosto" dayNumber={9} dayText="Domingo" />
        <DayCalendarCard month="Agosto" dayNumber={10} dayText="Lunes" />
        <DayCalendarCard month="Agosto" dayNumber={11} dayText="Martes" />
        <DayCalendarCard month="Agosto" dayNumber={12} dayText="Miercoles" />
        <DayCalendarCard month="Agosto" dayNumber={13} dayText="Jueves" />
        <DayCalendarCard month="Agosto" dayNumber={14} dayText="Viernes" />
        <DayCalendarCard month="Agosto" dayNumber={15} dayText="Sabado" />
      </CustomCarousel>
      <View style={{ marginTop: hp(12) }}>
        <ProgressTaskCard actualCalories={Math.round(calories)} goal={1900} />
      </View>
      <View style={{ paddingVertical: UI.LATERAL_PADDING }}>
        <CustomText type="body_secondary">Resumen del día</CustomText>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <DailyGoalItem
          color={COLOR.AZUL_PRIMARIO}
          item={4}
          text="Ejerecicios"
        />
        <DailyGoalItem
          color={COLOR.TEXTO_PRINCIPAL}
          item={`${protein}g`}
          text="Proteina"
        />
        <DailyGoalItem
          color={COLOR.SUCCESS}
          item={`8/8`}
          text="Vasos de Agua"
        />
      </View>
      <View style={{ paddingVertical: UI.LATERAL_PADDING }}>
        <CustomText type="body_secondary">En progreso</CustomText>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <DailyGoalProgressItem
          goal="Abdominales"
          subtitle="3/4 Series"
          progress={75}
          color={COLOR.AZUL_PRIMARIO}
        />
        <DailyGoalProgressItem
          goal="Corre 2km"
          subtitle="1.4/2 km"
          progress={63}
          color={COLOR.WARNING}
        />
      </View>
    </ScrollView>
  );
}
