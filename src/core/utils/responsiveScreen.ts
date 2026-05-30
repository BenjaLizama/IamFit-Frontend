import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

const BASE_HEIGHT = 812;
const BASE_WIDTH = 375;

const toPercent = (value: number | string, base: number) => {
  if (typeof value === "string") {
    return value.endsWith("%") ? value : `${(Number(value) / base) * 100}%`;
  }

  return `${(value / base) * 100}%`;
};

export const hp = (heightPx: number | string) => {
  return heightPercentageToDP(toPercent(heightPx, BASE_HEIGHT));
};

export const wp = (widthPx: number | string) => {
  return widthPercentageToDP(toPercent(widthPx, BASE_WIDTH));
};

export const useWp = wp;
export const useHp = hp;
