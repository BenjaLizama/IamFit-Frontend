import { hp, wp } from "@/src/core/utils";
import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const RoutineScreenStyles = StyleSheet.create({
  scrollContent: {
    paddingBottom: UI.spacing.xl,
    paddingHorizontal: UI.LATERAL_PADDING,
  },
  headerRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: UI.spacing.md,
  },
  screenTitle: {
    lineHeight: hp(30),
  },
  newButton: {
    width: wp(88),
  },
  filterRow: {
    flexDirection: "row",
    gap: UI.spacing.sm,
    marginBottom: UI.spacing.sm,
  },
  routineList: {
    gap: UI.spacing.md,
    marginTop: UI.spacing.md,
  },
  aiButton: {
    alignItems: "center",
    borderColor: COLOR.FONDO_OPACO2,
    borderRadius: UI.meddium_radius,
    borderStyle: "dashed",
    borderWidth: 2,
    flexDirection: "row",
    gap: UI.spacing.sm,
    justifyContent: "center",
    marginTop: UI.spacing.lg,
    minHeight: hp(56),
  },
  aiButtonText: {
    lineHeight: hp(18),
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
  detailContainer: {
    flex: 1,
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
  },
  actionRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: UI.spacing.sm,
    marginTop: "auto",
  },
  startButton: {
    flex: 1,
    width: wp(172),
  },
});
