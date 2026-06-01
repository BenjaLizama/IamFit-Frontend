import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const FeedingScreenStyles = StyleSheet.create({
  container: {
    paddingHorizontal: UI.LATERAL_PADDING,
    gap: UI.spacing.md,
  },

  buttonContainer: {
    alignItems: "center",
    marginTop: UI.spacing.md,
  },
});

export const FeedingScreenAddFoodStyles = StyleSheet.create({
  addFoodContainer: {
    gap: UI.spacing.lg,
    paddingVertical: UI.spacing.xs,
  },

  searchSection: {
    marginBottom: UI.spacing.xs,
  },

  sectionLabel: {
    marginBottom: UI.spacing.sm,
    fontWeight: "500",
  },

  resultsSection: {
    marginBottom: UI.spacing.lg,
  },

  resultsList: {
    gap: UI.spacing.sm,
  },

  resultItem: {
    backgroundColor: COLOR.FONDO_OPACO,
    borderRadius: UI.small_radius,
    padding: UI.spacing.md,
    gap: UI.spacing.sm,
  },

  resultItemContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: UI.spacing.md,
  },

  selectedFoodSection: {
    gap: UI.spacing.lg,
    marginTop: UI.spacing.lg,
  },

  selectedFoodHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: UI.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.FONDO_OPACO,
  },

  portionSection: {
    gap: UI.spacing.md,
  },

  portionInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: UI.spacing.md,
    justifyContent: "space-between",
  },

  stepperButton: {
    width: 50,
    height: 50,
    borderRadius: UI.button_radius,
    backgroundColor: COLOR.FONDO_OPACO,
    justifyContent: "center",
    alignItems: "center",
  },

  portionDisplay: {
    alignItems: "center",
    gap: UI.spacing.sm,
    backgroundColor: COLOR.FONDO_OPACO,
    paddingVertical: UI.spacing.md,
    paddingHorizontal: UI.spacing.lg,
    borderRadius: UI.small_radius,
    minWidth: 80,
  },

  portionInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: UI.spacing.md,
    backgroundColor: COLOR.FONDO_OPACO,
    borderRadius: UI.small_radius,
    paddingHorizontal: UI.spacing.md,
    height: 50,
    minWidth: 100,
  },

  portionTextInput: {
    flex: 1,
    color: COLOR.TEXTO_PRINCIPAL,
    fontSize: 16,
    padding: 0,
    margin: 0,
  },

  portionResult: {
    alignItems: "center",
    gap: UI.spacing.sm,
    flex: 1,
  },

  registerButtonContainer: {
    alignItems: "center",
    marginTop: UI.spacing.lg,
  },
});
