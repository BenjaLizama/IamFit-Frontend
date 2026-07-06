import { MiaAction } from "@/src/services/mia/mia.dtos";

export interface MessageResponseBoxProps {
  activeActionKey?: string | null;
  actions?: MiaAction[];
  disabledActions?: boolean;
  getActionKey?: (action: MiaAction, index: number) => string;
  getActionLoadingLabel?: (action: MiaAction) => string;
  onActionPress?: (action: MiaAction, index: number) => void;
  response: string;
}
