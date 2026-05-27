import { useEffect, useState } from "react";
import { UseFilterSelectorProps } from "./FilterSelector.types";

export const useFilterSelector = ({
  filterList,
  initialActiveIndex = 0,
  onFilterChange,
}: UseFilterSelectorProps) => {
  const [selectedIndex, setSelectedIndex] =
    useState<number>(initialActiveIndex);

  const selectFilter = (index: number) => {
    if (index >= 0 && index < filterList.length) {
      setSelectedIndex(index);

      if (onFilterChange) {
        onFilterChange(filterList[index]);
      }
    }
  };

  const isFilterSelected = (index: number) => index === selectedIndex;

  useEffect(() => {
    if (onFilterChange && filterList[initialActiveIndex]) {
      onFilterChange(filterList[initialActiveIndex]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    selectedIndex,
    selectFilter,
    isFilterSelected,
    currentFilter: filterList[selectedIndex],
  };
};
