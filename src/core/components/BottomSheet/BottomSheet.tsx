import { hp, wp } from "@/src/core/utils";
import GorhomBottomSheet, {
  BottomSheetScrollView,
  useBottomSheetSpringConfigs,
} from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";
import { BottomSheetProps } from "./BottomSheet.types";
import { useBottomSheet } from "./useBottomSheet";

export const BottomSheet = forwardRef<GorhomBottomSheet, BottomSheetProps>(
  ({ children }, ref) => {
    const { snapPoints, renderBackdrop } = useBottomSheet();
    const animationConfigs = useBottomSheetSpringConfigs({
      damping: 28,
      stiffness: 180,
      mass: 0.9,
      overshootClamping: true,
    });

    return (
      <GorhomBottomSheet
        ref={ref as any}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        enableDynamicSizing={false}
        enableOverDrag={false}
        activeOffsetY={[-1, 1]}
        animationConfigs={animationConfigs}
      >
        <BottomSheetScrollView
          contentContainerStyle={{
            paddingHorizontal: wp(24),
            paddingTop: hp(24),
            paddingBottom: hp(60),
          }}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </BottomSheetScrollView>
      </GorhomBottomSheet>
    );
  },
);

BottomSheet.displayName = "BottomSheet";
