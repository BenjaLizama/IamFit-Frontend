import { hp, wp } from "@/src/core/utils";
import { UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const RoutineExpandableCardStyles = StyleSheet.create({
  expandedHeader: {
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: UI.spacing.md,
    width: "100%",
  },
  detailHeader: {
    gap: UI.spacing.md,
    paddingHorizontal: UI.spacing.md,
    paddingBottom: UI.spacing.md,
    paddingTop: UI.spacing.md,
    width: "100%",
  },
  detailTitleRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: UI.spacing.md,
  },
  detailTitle: {
    flex: 1,
    lineHeight: hp(20),
  },
  detailContent: {
    width: "100%",
  },
  detailContainer: {
    paddingBottom: UI.spacing.md,
    paddingTop: UI.spacing.md,
    width: "100%",
  },
  sectionTitle: {
    lineHeight: hp(20),
    marginBottom: UI.spacing.sm,
  },
  exerciseList: {
    marginBottom: UI.spacing.lg,
    width: "100%",
  },
  actionRow: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  startButton: {
    width: wp(220),
    alignSelf: "center",
  },
});
