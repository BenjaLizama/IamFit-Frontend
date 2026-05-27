export interface FilterSelectorProps {
  filterList: string[];
  onFilterChange: (selectedFilter: string) => void;
}

export interface UseFilterSelectorProps {
  filterList: string[];
  initialActiveIndex?: number;
  onFilterChange: (selectedFilter: string) => void;
}
