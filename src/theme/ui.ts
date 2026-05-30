import { hp, wp } from "@/src/core/utils";

const BUTTON_RADIUS = Math.min(wp(20), hp(16));

export const UI = {
  LATERAL_PADDING: wp(12),

  // Espaciado
  spacing: {
    none: 0,
    xxs: wp(2),
    xs: wp(4),
    sm: wp(8),
    md: wp(12),
    lg: wp(16),
    xl: wp(20),
    xxl: wp(24),
    xxxl: wp(32),
    jumbo: wp(48),
    giant: wp(64),
  },

  // Border radius
  button_radius: BUTTON_RADIUS,
  small_radius: wp(15),
  meddium_radius: wp(20),
  large_radius: wp(30),
  extra_large_radius: wp(50),

  // Altura
  button_heigth: hp(58),

  // Tamaño texto base en altura para mayor consistencia en pantallas grandes
  body_size: hp(16),

  // Padding botones
  padding_top: hp(16),
  padding_bottom: hp(16),
  padding_left: wp(16),
  padding_right: wp(16),
};
