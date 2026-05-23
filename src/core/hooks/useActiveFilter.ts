import { useCallback, useState } from "react";

export const useActiveFilter = (initialFilter: string = "") => {
  const [activeFilter, setActiveFilter] = useState<string>(initialFilter);

  const handleFilterChange = useCallback((newFilter: string) => {
    setActiveFilter(newFilter);
    console.log(`useActiveFilter | Filtro seleccionado: ${newFilter}`);
  }, []);

  return {
    activeFilter,
    handleFilterChange,
  };
};
