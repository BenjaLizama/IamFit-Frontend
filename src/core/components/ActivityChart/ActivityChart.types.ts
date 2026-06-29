import { ProfileActivityPoint } from "@/src/services/user-profile/user-profile.dtos";

export interface ActivityChartProps {
  points: ProfileActivityPoint[];
  highlight?: ProfileActivityPoint | null;
  unit?: string;
  color?: string;
  height?: number;
}
