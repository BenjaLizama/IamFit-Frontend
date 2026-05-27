export interface ExpandableScreenProps {
  children1: React.ReactNode;
  children2: React.ReactNode;
  headerChildren: React.ReactNode;
  initialRadius?: number;
  onExpandedChange?: (isExpanded: boolean) => void;
  top?: number;
}
