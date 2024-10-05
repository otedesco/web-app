"use client";

import { Camera, CheckIcon, User2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useRef, useState } from "react";
import ResponsiveDialog from "~/components/responsive-dialog";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Badge,
} from "~/components/ui";

import { Skeleton } from "~/components/ui/skeleton";
import { cn } from "~/lib/utils";
import { useProfileActions } from "~/state/features/profile/hooks";
import {
  selectFirstName,
  selectIsLoading,
  selectProfileAvatar,
} from "~/state/features/profile/selectors";
import { useAppSelector } from "~/state/hooks";

const ConfirmationBadge = (
  <Badge className="absolute bottom-1 right-1 bg-teal-300 px-0.5 text-primary-foreground">
    <CheckIcon className="h-4 w-4" />
  </Badge>
);

const FallbackAvatar = ({ className }: { className?: string }) => {
  return (
    <AvatarFallback>
      <User2Icon className={cn("h-12 w-12 md:h-14 md:w-14", className)} />
    </AvatarFallback>
  );
};

const LoadedAvatar = (props: { src?: string; alt?: string | null }) => {
  return <AvatarImage src={props.src} alt={props.alt ?? "avatar-image"} />;
};

const LoadingSkeleton = () => (
  <div className="flex flex-row items-center gap-4 p-6 md:flex-col md:items-start md:border-r md:p-8">
    <Skeleton className="h-24 w-48 rounded-full sm:h-28 sm:w-28" />
    <div className="mt-0 w-full max-w-[200px] text-left sm:mt-4 sm:text-center">
      <Skeleton className="mb-2 h-7 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  </div>
);

const ProfileInfoCardAvatar = () => {
  const t = useTranslations("views->profile-info-view");
  const { setAvatarUrl } = useProfileActions();
  const avatarUrl = useAppSelector(selectProfileAvatar);
  const name = useAppSelector(selectFirstName);
  const isLoading = useAppSelector(selectIsLoading);

  const [newAvatar, setNewAvatar] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewAvatar(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [],
  );

  const handleAvatarSubmit = useCallback(async () => {
    await setAvatarUrl(newAvatar!);
    setNewAvatar(null);
    setIsOpen(false);
  }, [setAvatarUrl, newAvatar]);

  if (isLoading) return <LoadingSkeleton />;

  const Trigger = (
    <Button
      variant="ghost"
      className="relative h-24 w-24 rounded-full sm:h-28 sm:w-28"
    >
      <Avatar className="h-24 w-24 sm:h-28 sm:w-28">
        <LoadedAvatar src={avatarUrl!} alt={name} />
        <FallbackAvatar />
      </Avatar>
      {ConfirmationBadge}
    </Button>
  );

  const Content = (
    <div className="grid gap-4 py-4">
      <div className="flex items-center justify-center">
        <Avatar className="h-56 w-56">
          <AvatarImage src={newAvatar ?? avatarUrl!} alt={name} />
          <FallbackAvatar className="h-28 w-28 md:h-32 md:w-32" />
        </Avatar>
        <div className="absolute bottom-20 rounded-full md:bottom-20">
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
            onChange={handleAvatarChange}
            className="hidden"
            aria-label="Upload new avatar"
          />
        </div>
      </div>
    </div>
  );

  const Footer = (
    <div className="mt-4 flex w-full md:mt-0 md:justify-end">
      <Button
        className="w-full md:w-auto"
        disabled={!newAvatar}
        onClick={handleAvatarSubmit}
      >
        {t("saveChanges")}
      </Button>
    </div>
  );

  return (
    <div className="flex flex-row items-center gap-4 p-6 md:flex-col md:items-start md:border-r md:p-8">
      <ResponsiveDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        Trigger={Trigger}
        Content={Content}
        title={name ?? "Edit Avatar"}
        Footer={Footer}
      />
      <div className="mt-0 text-left sm:mt-4 sm:text-center">
        <h2 className="text-xl font-bold sm:text-2xl">{name}</h2>
        <p className="text-sm text-muted-foreground">
          {/* {["tenant", "buyer", "agent"]
            .map((v) => t(`profileType.${v}`))
            .join(" · ")} */}
          {t("profileType.tenant") + " · " + t("profileType.buyer")}
        </p>
      </div>
    </div>
  );
};

export default ProfileInfoCardAvatar;
