import { hp, wp } from "@/src/core/utils";
import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const MiaChatScreenStyles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.SIN_COLOR,
    flex: 1,
  },

  list: {
    flex: 1,
  },

  listContent: {
    flexGrow: 1,
    paddingBottom: hp(20),
    paddingHorizontal: wp(2),
    paddingTop: hp(12),
  },

  emptyListContent: {
    justifyContent: "center",
  },

  emptyState: {
    gap: UI.spacing.md,
    paddingHorizontal: UI.spacing.md,
    paddingVertical: UI.spacing.xl,
    transform: [{ scaleY: -1 }],
  },

  emptyEyebrow: {
    alignSelf: "flex-start",
    backgroundColor: COLOR.FONDO_OPACO2,
    borderRadius: UI.small_radius,
    paddingHorizontal: UI.spacing.md,
    paddingVertical: UI.spacing.xs,
  },

  emptyTitle: {
    lineHeight: hp(28),
  },

  emptySubtitle: {
    lineHeight: hp(22),
  },

  suggestionList: {
    gap: UI.spacing.sm,
    marginTop: UI.spacing.xs,
  },

  suggestionButton: {
    alignSelf: "flex-start",
    backgroundColor: COLOR.FONDO,
    borderColor: COLOR.FONDO_OPACO2,
    borderRadius: UI.small_radius,
    borderWidth: 1,
    maxWidth: "100%",
    paddingHorizontal: UI.spacing.md,
    paddingVertical: UI.spacing.sm,
  },

  suggestionButtonDisabled: {
    opacity: 0.5,
  },

  inputShell: {
    paddingBottom: hp(12),
    paddingHorizontal: wp(2),
    paddingTop: hp(6),
  },
});
