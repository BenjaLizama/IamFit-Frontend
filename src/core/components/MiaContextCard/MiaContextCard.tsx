import { COLOR, UI } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import CircularProgress from "../CircularProgress";
import CustomText from "../CustomText";
import { MiaContextCardStyles as styles } from "./MiaContextCard.styles";
import { MiaContextCardProps } from "./MiaContextCard.types";

export default function MiaContextCard({
  percentage,
  items,
  quickActions = [],
  footerLeft,
  footerRight,
}: MiaContextCardProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded((currentValue) => !currentValue)}
        activeOpacity={0.7}
      >
        <CustomText type="body_secondary">Lo que M.I.A. sabe de ti</CustomText>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={UI.spacing.lg}
          color={COLOR.TEXTO_SECUNDARIO}
        />
      </TouchableOpacity>

      <View style={styles.progressRow}>
        <CircularProgress
          percentage={percentage}
          size={UI.spacing.giant}
          strokeWidth={UI.spacing.xs}
        >
          <Ionicons name="sparkles" size={UI.spacing.lg} color={COLOR.SUCCESS} />
        </CircularProgress>
        <CustomText type="body_secondary" style={styles.progressCaption}>
          M.I.A. tiene {Math.round(percentage)}% de tu contexto
        </CustomText>
      </View>

      {expanded && (
        <>
          {items.length > 0 ? (
            <View style={styles.itemsList}>
              {items.map((item, index) => (
                <View key={`${item.label}-${index}`} style={styles.itemRow}>
                  <Ionicons
                    name={item.icon as never}
                    size={UI.spacing.lg}
                    color={COLOR.TEXTO_PRINCIPAL}
                    style={styles.itemIcon}
                  />
                  <CustomText type="body" style={styles.itemText}>
                    <CustomText type="body_secondary">{item.label}: </CustomText>
                    {item.value}
                  </CustomText>
                </View>
              ))}
            </View>
          ) : null}

          {footerLeft || footerRight ? (
            <View style={styles.footerRow}>
              {footerLeft ? (
                <View style={styles.footerItem}>
                  <Ionicons
                    name={(footerLeft.icon as never) ?? "flag-outline"}
                    size={UI.spacing.md}
                    color={COLOR.TEXTO_PRINCIPAL}
                  />
                  <CustomText type="body" style={styles.footerText}>
                    <CustomText type="body_secondary">
                      {footerLeft.label}:{" "}
                    </CustomText>
                    {footerLeft.value}
                  </CustomText>
                </View>
              ) : null}
              {footerRight ? (
                <View style={styles.footerItem}>
                  <Ionicons
                    name={(footerRight.icon as never) ?? "walk-outline"}
                    size={UI.spacing.md}
                    color={COLOR.TEXTO_PRINCIPAL}
                  />
                  <CustomText type="body" style={styles.footerText}>
                    <CustomText type="body_secondary">
                      {footerRight.label}:{" "}
                    </CustomText>
                    {footerRight.value}
                  </CustomText>
                </View>
              ) : null}
            </View>
          ) : null}

          {quickActions.length > 0 ? (
            <View style={styles.chipRow}>
              {quickActions.map((action, index) => (
                <TouchableOpacity
                  key={`${action.label}-${index}`}
                  style={styles.chip}
                  onPress={action.onPress}
                  activeOpacity={0.7}
                >
                  {action.icon ? (
                    <Ionicons
                      name={action.icon as never}
                      size={UI.spacing.md}
                      color={COLOR.TEXTO_SECUNDARIO}
                    />
                  ) : null}
                  <CustomText type="button_extra" size={UI.spacing.sm + 4}>
                    {action.label}
                  </CustomText>
                </TouchableOpacity>
              ))}
            </View>
          ) : null}
        </>
      )}
    </View>
  );
}
