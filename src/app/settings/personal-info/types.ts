import { AccountDetails } from "~/lib/services/cerberus";

export interface FieldValueProps {
  data?: AccountDetails;
  isLoading: boolean;
}

export interface FieldFormProps {
  data?: AccountDetails;
  isLoading: boolean;
}

export interface FieldTriggerProps {
  data?: AccountDetails;
  id: number;
}
