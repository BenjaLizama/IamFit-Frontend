export interface MainTabIconProps {
  children: React.ReactNode;
  type?: MainTabIconType;
  selected?: boolean;
}

type MainTabIconType = "big" | undefined;
