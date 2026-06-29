import { hp, wp } from "@/src/core/utils";
import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const ProfileScreenStyles = StyleSheet.create({
  loadingContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  scrollContent: {
    gap: UI.spacing.lg,
    paddingBottom: UI.spacing.xxxl,
    paddingHorizontal: UI.LATERAL_PADDING,
  },
  headerRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: UI.spacing.sm,
  },
  profileHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: UI.spacing.md,
  },
  avatar: {
    alignItems: "center",
    backgroundColor: COLOR.AZUL_PRIMARIO,
    borderRadius: UI.spacing.giant / 2,
    height: UI.spacing.giant,
    justifyContent: "center",
    width: UI.spacing.giant,
  },
  profileInfo: {
    flex: 1,
    gap: UI.spacing.xs,
  },
  goalBadge: {
    alignSelf: "flex-start",
  },
  statsRow: {
    flexDirection: "row",
    gap: UI.spacing.lg,
    marginTop: UI.spacing.xs,
  },
  statItem: {
    alignItems: "flex-start",
  },
  filterRow: {
    marginHorizontal: -UI.LATERAL_PADDING,
  },
  cardsCarousel: {
    flexDirection: "row",
    gap: UI.spacing.md,
    paddingRight: UI.LATERAL_PADDING,
  },
  contentCard: {
    backgroundColor: COLOR.FONDO_OPACO,
    borderColor: COLOR.FONDO_OPACO2,
    borderRadius: UI.meddium_radius,
    borderWidth: 1,
    gap: UI.spacing.xs,
    padding: UI.spacing.md,
    width: wp(140),
  },
  contentCardIcon: {
    alignItems: "center",
    backgroundColor: COLOR.FONDO,
    borderRadius: UI.small_radius,
    height: UI.spacing.xxl,
    justifyContent: "center",
    marginBottom: UI.spacing.xs,
    width: UI.spacing.xxl,
  },
  contentCardTitle: {
    lineHeight: hp(18),
  },
  emptyCard: {
    alignItems: "center",
    backgroundColor: COLOR.FONDO_OPACO,
    borderColor: COLOR.FONDO_OPACO2,
    borderRadius: UI.meddium_radius,
    borderWidth: 1,
    padding: UI.spacing.lg,
  },
  activitySection: {
    gap: UI.spacing.xs,
  },
  activityTitle: {
    marginBottom: UI.spacing.sm,
  },
  chartLoading: {
    marginVertical: UI.spacing.xl,
  },
  sheetTitle: {
    marginBottom: UI.spacing.xs,
  },
  sheetSubtitle: {
    marginBottom: UI.spacing.md,
  },
  sheetInput: {
    borderColor: COLOR.FONDO_OPACO2,
    borderRadius: UI.small_radius,
    borderWidth: 1,
    color: COLOR.TEXTO_PRINCIPAL,
    marginBottom: UI.spacing.lg,
    minHeight: hp(80),
    padding: UI.spacing.md,
    textAlignVertical: "top",
  },
  sheetActions: {
    flexDirection: "row",
    gap: UI.spacing.md,
    justifyContent: "space-between",
  },
});
