import { MiaAction } from "@/src/services/mia/mia.dtos";

export interface MessageResponseBoxProps {
  actions?: MiaAction[];
  disabledActions?: boolean;
  onActionPress?: (action: MiaAction) => void;
  response: string;
}
