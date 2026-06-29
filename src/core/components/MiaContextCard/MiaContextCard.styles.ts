import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const MiaContextCardStyles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.FONDO,
    borderColor: COLOR.FONDO_OPACO2,
    borderRadius: UI.meddium_radius,
    borderWidth: 1,
    gap: UI.spacing.md,
    padding: UI.spacing.md,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: UI.spacing.md,
  },
  progressCaption: {
    flex: 1,
  },
  itemsList: {
    gap: UI.spacing.xs,
  },
  itemRow: {
    alignItems: "center",
    backgroundColor: COLOR.FONDO_OPACO,
    borderRadius: UI.small_radius,
    flexDirection: "row",
    gap: UI.spacing.xs,
    paddingHorizontal: UI.spacing.sm,
    paddingVertical: UI.spacing.xs,
  },
  itemIcon: {
    width: UI.spacing.lg,
  },
  itemText: {
    flex: 1,
  },
  footerRow: {
    flexDirection: "row",
    gap: UI.spacing.sm,
  },
  footerItem: {
    alignItems: "center",
    backgroundColor: COLOR.FONDO_OPACO,
    borderRadius: UI.small_radius,
    flex: 1,
    flexDirection: "row",
    gap: UI.spacing.xs,
    paddingHorizontal: UI.spacing.sm,
    paddingVertical: UI.spacing.xs,
  },
  footerText: {
    flex: 1,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: UI.spacing.xs,
  },
  chip: {
    alignItems: "center",
    backgroundColor: COLOR.FONDO_OPACO,
    borderColor: COLOR.FONDO_OPACO2,
    borderRadius: UI.small_radius,
    borderWidth: 1,
    flexDirection: "row",
    gap: UI.spacing.xs,
    paddingHorizontal: UI.spacing.sm,
    paddingVertical: UI.spacing.xs,
  },
});
