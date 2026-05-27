import { MainTabIconProps } from "./MainTabIcon.types";

export function isCurrentRoute(pathname: string, href: MainTabIconProps["href"]) {
  return pathname === normalizeHref(href);
}

export function normalizeHref(href: MainTabIconProps["href"]) {
  const stringHref = typeof href === "string" ? href : href?.pathname;

  return stringHref?.replace(/\/\([^)]+\)/g, "") ?? "";
}
