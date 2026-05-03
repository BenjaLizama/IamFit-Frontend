import GorhomBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";

export const useBottomSheet = () => {
  const sheetRef = useRef<GorhomBottomSheet>(null);

  const snapPoints = useMemo(() => ["85%"], []);

  const openSheet = useCallback(() => {
    sheetRef.current?.expand();
  }, []);

  const closeSheet = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    [],
  );

  return {
    sheetRef,
    snapPoints,
    renderBackdrop,
    openSheet,
    closeSheet,
  };
};
