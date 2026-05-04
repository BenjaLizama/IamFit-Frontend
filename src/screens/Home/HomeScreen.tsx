import CustomCarousel from "@/src/core/components/CustomCarousel/CustomCarousel";
import Wrapper from "@/src/core/components/Wrapper";
import DayCalendarCard from "@/src/features/home/components/DayCalendarCard";
import React from "react";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <Wrapper>
      <View style={{ flex: 1, justifyContent: "flex-start" }}>
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
      </View>
    </Wrapper>
  );
}
