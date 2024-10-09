"use client";

import { useCallback, useState } from "react";
import AvatarCard from "./components/avatar-card";
import AvatarEdit from "./components/avatar-card/avatar-edit";
import ConfirmedInfoCard from "./components/confirmed-info-card";
import { useUpdateProfile } from "~/lib/hooks/useUpdateProfile";
import { ProfileDetailsRequest } from "../../page";

export default function InfoCards({
  isEditMode,
  profileDetailsAvatar,
  onProfileDetailsChange,
}: {
  isEditMode: boolean;
  profileDetailsAvatar?: string | null;
  onProfileDetailsChange: (
    key: keyof ProfileDetailsRequest,
    value: ProfileDetailsRequest[keyof ProfileDetailsRequest],
  ) => void;
}) {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const { updateProfile, isPending } = useUpdateProfile({});

  const handleAvatarChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (isEditMode) {
            onProfileDetailsChange("avatarUrl", reader.result as string);
          }
          setSelectedAvatar(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [],
  );

  const handleAvatarSubmit = useCallback(async () => {
    updateProfile({ avatarUrl: selectedAvatar! });
  }, [selectedAvatar, updateProfile]);

  return (
    <div className="w-full pb-4 md:w-72">
      <div className="sticky top-32 w-full space-y-4 md:w-72">
        {isEditMode && (
          <AvatarEdit
            selectedAvatar={profileDetailsAvatar ?? null}
            onChange={handleAvatarChange}
            isEditMode={isEditMode}
          />
        )}
        {!isEditMode && (
          <>
            <AvatarCard
              onChange={handleAvatarChange}
              onSubmit={handleAvatarSubmit}
              selectedAvatar={selectedAvatar}
              isUpdatingAvatar={isPending}
            />
            <ConfirmedInfoCard isLoading={false} />
          </>
        )}
      </div>
    </div>
  );
}
