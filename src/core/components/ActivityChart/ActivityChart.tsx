import { hp } from "@/src/core/utils";
import { COLOR } from "@/src/theme";
import React, { useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from "react-native-svg";
import CustomText from "../CustomText";
import { ActivityChartStyles as styles } from "./ActivityChart.styles";
import { ActivityChartProps } from "./ActivityChart.types";

const CHART_PADDING = 12;

export default function ActivityChart({
  points,
  highlight,
  color = COLOR.ERROR,
  height = hp(140),
}: ActivityChartProps) {
  const [width, setWidth] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };

  if (!points || points.length === 0) {
    return (
      <View style={[styles.emptyContainer, { height }]}>
        <CustomText type="body_secondary">
          Aun no hay datos suficientes para mostrar este grafico.
        </CustomText>
      </View>
    );
  }

  const values = points.map((point) => point.value);
  const maxValue = Math.max(...values, 1);
  const minValue = Math.min(...values, 0);
  const range = maxValue - minValue || 1;

  const chartWidth = Math.max(width - CHART_PADDING * 2, 0);
  const chartHeight = height - CHART_PADDING * 2;
  const stepX = points.length > 1 ? chartWidth / (points.length - 1) : 0;

  const getX = (index: number) => CHART_PADDING + index * stepX;
  const getY = (value: number) =>
    CHART_PADDING + chartHeight - ((value - minValue) / range) * chartHeight;

  const linePath = points
    .map(
      (point, index) =>
        `${index === 0 ? "M" : "L"} ${getX(index)} ${getY(point.value)}`,
    )
    .join(" ");

  const areaPath = `${linePath} L ${getX(points.length - 1)} ${
    height - CHART_PADDING
  } L ${getX(0)} ${height - CHART_PADDING} Z`;

  const ticks = [maxValue, maxValue / 2, 0].map((tick) => Math.round(tick));

  return (
    <View style={styles.container}>
      <View style={[styles.yAxis, { height }]}>
        {ticks.map((tick, index) => (
          <CustomText key={index} type="body_secondary" size={hp(11)}>
            {tick}
          </CustomText>
        ))}
      </View>

      <View style={styles.chartColumn} onLayout={onLayout}>
        {width > 0 && (
          <Svg width={width} height={height}>
            <Defs>
              <LinearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={color} stopOpacity={0.25} />
                <Stop offset="1" stopColor={color} stopOpacity={0} />
              </LinearGradient>
            </Defs>

            <Path d={areaPath} fill="url(#areaGradient)" />
            <Path d={linePath} stroke={color} strokeWidth={2.5} fill="none" />

            {points.map((point, index) => {
              const isHighlight =
                highlight &&
                point.label === highlight.label &&
                point.value === highlight.value;

              if (!isHighlight) return null;

              return (
                <Circle
                  key={index}
                  cx={getX(index)}
                  cy={getY(point.value)}
                  r={5}
                  fill={COLOR.FONDO}
                  stroke={color}
                  strokeWidth={3}
                />
              );
            })}
          </Svg>
        )}

        <View style={styles.xAxis}>
          {points.map((point, index) => (
            <CustomText key={index} type="body_secondary" size={hp(10)}>
              {point.label}
            </CustomText>
          ))}
        </View>
      </View>
    </View>
  );
}
