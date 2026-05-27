import type { Href } from "expo-router";
import {
  ROUTE_SLOT_INDEXES,
  TOUCH_INDICATOR_SIZE,
  TOUCH_INDICATOR_STICKINESS,
  VISUAL_SLOT_COUNT,
} from "./MainTabBar.constants";

export function normalizeHref(href: Href) {
  const stringHref = typeof href === "string" ? href : href.pathname;

  return stringHref.replace(/\/\([^)]+\)/g, "");
}

export function clampNumber(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function getBarLocationX(
  pageX: number,
  barWidth: number,
  barPageX: number,
) {
  return clampNumber(pageX - barPageX, 0, barWidth);
}

export function getRouteIndexFromTouch(locationX: number, barWidth: number) {
  const visualSlotWidth = barWidth / VISUAL_SLOT_COUNT;
  let closestRouteIndex = 0;
  let closestDistance = Number.POSITIVE_INFINITY;

  ROUTE_SLOT_INDEXES.forEach((slotIndex, routeIndex) => {
    const routeCenter = slotIndex * visualSlotWidth + visualSlotWidth / 2;
    const distance = Math.abs(locationX - routeCenter);

    if (distance < closestDistance) {
      closestRouteIndex = routeIndex;
      closestDistance = distance;
    }
  });

  return closestRouteIndex;
}

export function getMagnetizedIndicator(locationX: number, barWidth: number) {
  const visualSlotWidth = barWidth / VISUAL_SLOT_COUNT;
  const routeIndex = getRouteIndexFromTouch(locationX, barWidth);
  const tabCenter =
    ROUTE_SLOT_INDEXES[routeIndex] * visualSlotWidth + visualSlotWidth / 2;
  const pullDistance = locationX - tabCenter;
  const dropletX = locationX - pullDistance * TOUCH_INDICATOR_STICKINESS;
  const stretch = Math.min(Math.abs(pullDistance) / visualSlotWidth, 1) * 0.26;

  return {
    stretch,
    x: clampNumber(
      dropletX,
      TOUCH_INDICATOR_SIZE / 2,
      barWidth - TOUCH_INDICATOR_SIZE / 2,
    ),
  };
}

export function getDropletSkew(locationX: number, barWidth: number) {
  const visualSlotWidth = barWidth / VISUAL_SLOT_COUNT;
  const routeIndex = getRouteIndexFromTouch(locationX, barWidth);
  const tabCenter =
    ROUTE_SLOT_INDEXES[routeIndex] * visualSlotWidth + visualSlotWidth / 2;
  const pullDistance = locationX - tabCenter;
  const pullProgress = clampNumber(pullDistance / visualSlotWidth, -1, 1);

  return pullProgress * 4;
}

export function getRouteCenterX(routeIndex: number, barWidth: number) {
  const visualSlotWidth = barWidth / VISUAL_SLOT_COUNT;
  const slotIndex = ROUTE_SLOT_INDEXES[routeIndex] ?? ROUTE_SLOT_INDEXES[0];

  return slotIndex * visualSlotWidth + visualSlotWidth / 2;
}
