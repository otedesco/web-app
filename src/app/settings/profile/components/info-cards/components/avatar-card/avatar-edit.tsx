"use client";
import { Camera, User2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import { use, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage, Button } from "~/components/ui";
import { cn } from "~/lib/utils";
import {
  selectFirstName,
  selectProfileAvatar,
} from "~/state/features/profile/selectors";
import { useAppSelector } from "~/state/hooks";

const FallbackAvatar = () => {
  return (
    <AvatarFallback>
      <User2Icon className={"h-12 w-12 md:h-14 md:w-14"} />
    </AvatarFallback>
  );
};

const AvatarEdit = ({
  onChange,
  selectedAvatar,
  isEditMode,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedAvatar: string | null;
  isEditMode: boolean;
}) => {
  const avatarUrl = useAppSelector(selectProfileAvatar);
  const name = useAppSelector(selectFirstName);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = useTranslations("views->profile-info-view");

  return (
    <div className="flex items-center justify-center">
      <Avatar className="h-56 w-56">
        <AvatarImage src={selectedAvatar ?? avatarUrl!} alt={name} />
        <FallbackAvatar />
      </Avatar>
      <div
        className={cn(
          !isEditMode && "absolute bottom-20 rounded-full md:bottom-16",
          isEditMode && "absolute -bottom-2 rounded-full",
        )}
      >
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          className="rounded-2xl"
          size="sm"
        >
          <Camera className="h-6 w-6" />
          <span className="ml-1">{t("edit")}</span>
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onChange}
          className="hidden"
          aria-label="Upload new avatar"
        />
      </div>
    </div>
  );
};

export default AvatarEdit;
