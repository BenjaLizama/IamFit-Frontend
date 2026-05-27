import { COLOR } from "@/src/theme";
import React from "react";
import { TouchableOpacity } from "react-native";
import CustomCarousel from "../CustomCarousel";
import CustomText from "../CustomText";
import { FilterSelectorStyles as styles } from "./FilterSelector.styles";
import { FilterSelectorProps } from "./FilterSelector.types";
import { useFilterSelector } from "./useFilterSelector";

export default function FilterSelector({
  filterList,
  onFilterChange,
}: FilterSelectorProps) {
  const { selectFilter, isFilterSelected } = useFilterSelector({
    filterList,
    initialActiveIndex: 0,
    onFilterChange,
  });

  return (
    <CustomCarousel>
      {filterList.map((element, index) => {
        const isSelected = isFilterSelected(index);

        return (
          <TouchableOpacity
            key={index}
            onPress={() => selectFilter(index)}
            style={[styles.container, isSelected && styles.selectedContainer]}
            activeOpacity={1}
          >
            <CustomText
              type="button_extra"
              color={isSelected ? COLOR.FONDO : ""}
            >
              {element}
            </CustomText>
          </TouchableOpacity>
        );
      })}
    </CustomCarousel>
  );
}
