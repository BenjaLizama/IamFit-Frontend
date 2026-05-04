import CustomCarousel from "@/src/core/components/CustomCarousel/CustomCarousel";
import DayCalendarCard from "@/src/features/home/components/DayCalendarCard";
import ProgressTaskCard from "@/src/features/home/components/ProgressTaskCard";
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
      <ProgressTaskCard></ProgressTaskCard>
    </View>
  );
}
