export interface MiaContextItem {
  icon: string;
  label: string;
  value: string;
}

export interface MiaContextFooterItem {
  icon?: string;
  label: string;
  value: string;
}

export interface MiaQuickAction {
  icon?: string;
  label: string;
  onPress: () => void;
}

export interface MiaContextCardProps {
  percentage: number;
  items: MiaContextItem[];
  quickActions?: MiaQuickAction[];
  footerLeft?: MiaContextFooterItem | null;
  footerRight?: MiaContextFooterItem | null;
}
