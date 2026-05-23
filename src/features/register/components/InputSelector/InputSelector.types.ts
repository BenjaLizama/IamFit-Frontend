export interface InputSelectorOption {
  label: string;
  value: string;
  helperText?: string;
  disabled?: boolean;
}

export interface InputSelectorProps {
  options: InputSelectorOption[];
  value?: string;
  onChange: (value: string, option: InputSelectorOption) => void;
  maxVisibleOptions?: number;
}
