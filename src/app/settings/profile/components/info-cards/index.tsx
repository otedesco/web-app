"use client";

import { useCallback, useState } from "react";
import AvatarCard from "./components/avatar-card";
import AvatarEdit from "./components/avatar-card/avatar-edit";
import ConfirmedInfoCard from "./components/confirmed-info-card";
import { useUpdateProfile } from "~/lib/hooks/useUpdateProfile";

export default function InfoCards({ isEditMode }: { isEditMode: boolean }) {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const { updateProfile, isPending } = useUpdateProfile({});

  const handleAvatarChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
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
            selectedAvatar={selectedAvatar}
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
