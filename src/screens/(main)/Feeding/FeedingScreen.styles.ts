import { hp, wp } from "@/src/core/utils";
import { COLOR, FONT, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const FeedingScreenStyles = StyleSheet.create({
  scrollContent: {
    paddingBottom: hp(110),
  },
  mealList: {
    gap: UI.spacing.md,
    marginTop: UI.spacing.md,
  },
  actions: {
    gap: UI.spacing.sm,
    marginTop: UI.spacing.lg,
  },
  generatedPlan: {
    backgroundColor: COLOR.FONDO_OPACO,
    borderColor: COLOR.FONDO_OPACO2,
    borderRadius: UI.meddium_radius,
    borderWidth: 1,
    gap: UI.spacing.sm,
    marginBottom: hp(24),
    marginTop: hp(12),
    padding: UI.spacing.md,
  },
  generatedPlanList: {
    gap: UI.spacing.md,
    marginTop: UI.spacing.md,
  },
  generatedPlanOption: {
    backgroundColor: COLOR.FONDO,
    borderColor: COLOR.FONDO_OPACO2,
    borderRadius: UI.meddium_radius,
    borderWidth: 1,
    gap: UI.spacing.sm,
    padding: UI.spacing.md,
  },
  modalBackdrop: {
    alignItems: "center",
    backgroundColor: "#00000055",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: wp(16),
  },
  modalContent: {
    backgroundColor: COLOR.FONDO,
    borderRadius: UI.meddium_radius,
    maxHeight: "88%",
    padding: UI.spacing.md,
    width: "100%",
  },
  modalHeader: {
    flexDirection: "row",
    gap: UI.spacing.md,
    justifyContent: "space-between",
    marginBottom: UI.spacing.md,
  },
  modalTitle: {
    flex: 1,
    lineHeight: hp(24),
  },
  closeButton: {
    alignItems: "center",
    borderColor: COLOR.FONDO_OPACO2,
    borderRadius: UI.large_radius,
    borderWidth: 1,
    height: hp(32),
    justifyContent: "center",
    width: hp(32),
  },
  modalBody: {
    gap: UI.spacing.md,
    paddingBottom: UI.spacing.md,
  },
  section: {
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
  input: {
    borderColor: COLOR.FONDO_OPACO2,
    borderRadius: UI.small_radius,
    borderWidth: 1,
    color: COLOR.TEXTO_PRINCIPAL,
    fontFamily: FONT.PRINCIPAL_REGULAR,
    minHeight: hp(44),
    paddingHorizontal: UI.spacing.md,
    paddingVertical: UI.spacing.sm,
  },
  helperText: {
    lineHeight: hp(16),
  },
  warningBox: {
    backgroundColor: "#FFF7E8",
    borderColor: COLOR.WARNING,
    borderRadius: UI.small_radius,
    borderWidth: 1,
    gap: UI.spacing.xs,
    padding: UI.spacing.md,
  },
  actionRow: {
    gap: UI.spacing.sm,
    marginTop: UI.spacing.sm,
  },
});

export const FeedingScreenAddFoodStyles = StyleSheet.create({
  addFoodContainer: {
    flexGrow: 1,
    paddingBottom: hp(110),
    paddingHorizontal: UI.LATERAL_PADDING,
  },
  searchSection: {
    marginTop: UI.spacing.md,
  },
  resultsSection: {
    gap: UI.spacing.sm,
    marginTop: UI.spacing.md,
  },
  sectionLabel: {
    lineHeight: hp(18),
  },
  resultsList: {
    gap: UI.spacing.sm,
  },
  resultsScroll: {
    maxHeight: hp(360),
  },
  resultsScrollContent: {
    gap: UI.spacing.sm,
    paddingBottom: UI.spacing.sm,
  },
  resultItem: {
    backgroundColor: COLOR.FONDO,
    borderColor: COLOR.FONDO_OPACO2,
    borderRadius: UI.small_radius,
    borderWidth: 1,
    gap: UI.spacing.xs,
    padding: UI.spacing.md,
  },
  resultItemContent: {
    alignItems: "center",
    flexDirection: "row",
    gap: UI.spacing.sm,
    justifyContent: "space-between",
  },
  selectedFoodSection: {
    gap: UI.spacing.lg,
    marginTop: UI.spacing.lg,
  },
  selectedFoodHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: UI.spacing.md,
    justifyContent: "space-between",
  },
  portionSection: {
    gap: UI.spacing.sm,
  },
  portionInputContainer: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: UI.spacing.md,
  },
  stepperButton: {
    alignItems: "center",
    borderColor: COLOR.FONDO_OPACO2,
    borderRadius: UI.large_radius,
    borderWidth: 1,
    height: hp(42),
    justifyContent: "center",
    width: hp(42),
  },
  portionDisplay: {
    alignItems: "baseline",
    flexDirection: "row",
    gap: UI.spacing.xs,
    minWidth: wp(70),
  },
  portionResult: {
    alignItems: "baseline",
    flexDirection: "row",
    gap: UI.spacing.sm,
  },
  registerButtonContainer: {
    marginTop: UI.spacing.md,
  },
  mealTypeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: UI.spacing.sm,
  },
  mealTypeChip: {
    borderColor: COLOR.FONDO_OPACO2,
    borderRadius: UI.large_radius,
    borderWidth: 1,
    paddingHorizontal: UI.spacing.md,
    paddingVertical: UI.spacing.sm,
  },
  mealTypeChipSelected: {
    backgroundColor: COLOR.AZUL_PRIMARIO,
    borderColor: COLOR.AZUL_PRIMARIO,
  },
  statusText: {
    marginTop: UI.spacing.sm,
  },
});
