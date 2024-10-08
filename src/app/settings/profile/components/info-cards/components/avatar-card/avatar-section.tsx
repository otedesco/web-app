"use client";

import { CheckIcon, Loader2, User2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
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
import {
  selectFirstName,
  selectIsLoading,
  selectProfileAvatar,
} from "~/state/features/profile/selectors";
import { useAppSelector } from "~/state/hooks";
import AvatarEdit from "./avatar-edit";

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

const AvatarSection = ({
  onChange,
  selectedAvatar,
  onSubmit,
  isUpdatingAvatar,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedAvatar: string | null;
  onSubmit: () => void;
  isUpdatingAvatar: boolean;
}) => {
  const t = useTranslations("views->profile-info-view");

  const avatarUrl = useAppSelector(selectProfileAvatar);
  const name = useAppSelector(selectFirstName);
  const isLoading = useAppSelector(selectIsLoading);

  const handleAvatarSubmit = useCallback(async () => {
    onSubmit();
  }, [onSubmit]);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isUpdatingAvatar) {
      setIsOpen(false);
    }
  }, [isUpdatingAvatar]);

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
    <AvatarEdit
      onChange={onChange}
      selectedAvatar={selectedAvatar}
      isEditMode={false}
    />
  );

  const Footer = (
    <div className="mt-4 flex w-full md:mt-0 md:justify-end">
      <Button
        className="w-full md:w-auto"
        disabled={!selectedAvatar}
        onClick={handleAvatarSubmit}
      >
        {isUpdatingAvatar ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          t("saveChanges")
        )}
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
          {t("profileType.tenant") + " · " + t("profileType.buyer")}
        </p>
      </div>
    </div>
  );
};

export default AvatarSection;
