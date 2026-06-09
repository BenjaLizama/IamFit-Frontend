import { hp } from "@/src/core/utils";
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
  filterRow: {
    flexDirection: "row",
    gap: UI.spacing.sm,
    marginBottom: UI.spacing.sm,
  },
  routineList: {
    gap: UI.spacing.md,
    marginTop: UI.spacing.md,
  },
  routineCardGroup: {
    gap: UI.spacing.sm,
  },
  limitBox: {
    backgroundColor: COLOR.FONDO_OPACO,
    borderColor: COLOR.FONDO_OPACO2,
    borderRadius: UI.small_radius,
    borderWidth: 1,
    gap: UI.spacing.xs,
    marginTop: UI.spacing.sm,
    padding: UI.spacing.md,
  },
  aiButton: {
    alignItems: "center",
    flexDirection: "row",
    gap: UI.spacing.sm,
    justifyContent: "center",
    marginTop: UI.spacing.lg,
    minHeight: hp(56),
  },
  aiButtonText: {
    lineHeight: hp(18),
  },
  aiPanel: {
    backgroundColor: COLOR.FONDO_OPACO,
    borderColor: COLOR.FONDO_OPACO2,
    borderRadius: UI.meddium_radius,
    borderWidth: 1,
    gap: UI.spacing.md,
    marginTop: UI.spacing.md,
    padding: UI.spacing.md,
  },
  aiSection: {
    gap: UI.spacing.sm,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: UI.spacing.sm,
  },
  chip: {
    borderColor: COLOR.FONDO_OPACO2,
    borderRadius: UI.large_radius,
    borderWidth: 1,
    paddingHorizontal: UI.spacing.md,
    paddingVertical: UI.spacing.sm,
  },
  chipSelected: {
    backgroundColor: COLOR.AZUL_PRIMARIO,
    borderColor: COLOR.AZUL_PRIMARIO,
  },
  limitationsInput: {
    borderColor: COLOR.FONDO_OPACO2,
    borderRadius: UI.small_radius,
    borderWidth: 1,
    color: COLOR.TEXTO_PRINCIPAL,
    minHeight: hp(44),
    paddingHorizontal: UI.spacing.md,
    paddingVertical: UI.spacing.sm,
  },
  generatedList: {
    gap: UI.spacing.md,
  },
  generatedCard: {
    backgroundColor: COLOR.FONDO,
    borderColor: COLOR.FONDO_OPACO2,
    borderRadius: UI.meddium_radius,
    borderWidth: 1,
    gap: UI.spacing.sm,
    padding: UI.spacing.md,
  },
  generatedCardHeader: {
    flexDirection: "row",
    gap: UI.spacing.sm,
  },
  generatedCardContent: {
    flex: 1,
    gap: UI.spacing.xs,
  },
  generatedCardTitle: {
    lineHeight: hp(18),
  },
  generatedCardDescription: {
    lineHeight: hp(16),
  },
});
