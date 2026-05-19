import CustomCarousel from "@/src/core/components/CustomCarousel/CustomCarousel";
import CustomText from "@/src/core/components/CustomText";
import ExpandableScreen from "@/src/core/components/ExpandableScreen/ExpandableScreen";
import DailyGoalItem from "@/src/features/home/components/DailyGoalItem";
import DayCalendarCard from "@/src/features/home/components/DayCalendarCard";
import ProgressTaskCard from "@/src/features/home/components/ProgressTaskCard";
import { COLOR, UI } from "@/src/theme";
import React from "react";
import { View } from "react-native";
import WelcomeUser from "../../features/home/components/WelcomeUser";
import { HomeScreenStyles as styles } from "./HomeScreen.styles";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <WelcomeUser name="Benjamín" />
      <CustomCarousel>
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
      <View style={{ marginTop: 12 }}>
        <ExpandableScreen
          initialRadius={UI.large_radius}
          children1={<ProgressTaskCard actualCalories={1615} goal={1900} />}
          children2={<CustomText type="h1">Esto es una prueba</CustomText>}
          headerChildren={<></>}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 12,
        }}
      >
        <DailyGoalItem
          color={COLOR.AZUL_PRIMARIO}
          item={4}
          text="Ejerecicios"
        />
        <DailyGoalItem
          color={COLOR.TEXTO_PRINCIPAL}
          item={`72g`}
          text="Proteina"
        />
        <DailyGoalItem
          color={COLOR.SUCCESS}
          item={`8/8`}
          text="Vasos de Agua"
        />
      </View>
      <CustomText type="body_secondary">En progreso</CustomText>
    </View>
  );
}
