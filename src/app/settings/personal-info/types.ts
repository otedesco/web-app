import { AccountDetails } from "~/lib/services/cerberus";

export interface FieldValueProps {
  data?: AccountDetails;
  isLoading: boolean;
}

export interface FieldFormProps {
  data?: AccountDetails;
  isLoading: boolean;
  onSubmit: () => void;
}

export interface FieldTriggerProps {
  data?: AccountDetails;
  onClick: (id: Fields | null) => void;
  onSubmit: () => void;
  isOpen: boolean;
}

export enum Fields {
  legalName = "legalName",
  govermentId = "govermentId",
  emailAddress = "emailAddress",
  phoneNumber = "phoneNumber",
  address = "address",
  emergencyContact = "emergencyContact",
}
