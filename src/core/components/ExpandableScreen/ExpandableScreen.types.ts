export interface ExpandableScreenProps {
  children1: React.ReactNode;
  children2: React.ReactNode;
  headerChildren: React.ReactNode;
  initialRadius?: number;
  onExpandedChange?: (isExpanded: boolean) => void;
  top?: number;
  variant?: "default" | "chat";
  keyboardVerticalOffset?: number;
  showHeader?: boolean;
  pressScale?: number;
}

export interface ExpandableScreenRef {
  collapse: () => void;
  expand: () => void;
}
