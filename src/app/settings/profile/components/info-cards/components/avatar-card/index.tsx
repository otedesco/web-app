import { Card } from "~/components/ui";
import AvatarSection from "./avatar-section";
import ExtraInfoSection from "./extra-info-section";

export default function AvatarCard({
  onChange,
  onSubmit,
  selectedAvatar,
  isUpdatingAvatar,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedAvatar: string | null;
  onSubmit: () => void;
  isUpdatingAvatar: boolean;
}) {
  return (
    <Card className="flex w-full max-w-2xl flex-col items-center shadow-xl md:flex-row md:items-stretch">
      <AvatarSection
        onChange={onChange}
        selectedAvatar={selectedAvatar}
        onSubmit={onSubmit}
        isUpdatingAvatar={isUpdatingAvatar}
      />
      <ExtraInfoSection isLoading={false} reviews={4} />
    </Card>
  );
}
