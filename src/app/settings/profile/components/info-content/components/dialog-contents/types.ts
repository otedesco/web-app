import { ProfileDetails } from "~/lib/services/cerberus";
import { ProfileDetailsRequest } from "~/app/settings/profile/page";

export type ProfileItem = {
  id: keyof ProfileDetailsRequest;
  icon?: React.FC<{ className?: string }>;
  label: string;
  description: string;
  title: string;
  Content: React.FC<DialogContentProps>;
};

export type DialogContentProps = {
  item: ProfileItem;
  value: ProfileDetails[keyof ProfileDetails];
  onChange: (v: ProfileDetails[keyof ProfileDetails]) => void;
};
