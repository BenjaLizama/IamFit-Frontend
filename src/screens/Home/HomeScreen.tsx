import Wrapper from "@/src/core/components/Wrapper";
import DayCalendarCard from "@/src/features/home/components/DayCalendarCard";
import React from "react";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <Wrapper>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <DayCalendarCard month="Agosto" dayNumber={7} dayText="Viernes" />
        <DayCalendarCard
          type="selected"
          month="Agosto"
          dayNumber={8}
          dayText="Sabado"
        />
        <DayCalendarCard month="Agosto" dayNumber={9} dayText="Domingo" />
      </View>
    </Wrapper>
  );
}
