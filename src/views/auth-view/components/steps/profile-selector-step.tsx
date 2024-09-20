import React, { memo, useCallback } from "react";
import { AvatarImage, Button, Avatar, AvatarFallback } from "~/components/ui";

import AnimatedStepContainer from "../utils/animated-step-container";
import { useProfileActions } from "~/state/features/profile/hooks";
import { useAppSelector } from "~/state/hooks";
import { Skeleton } from "~/components/ui/skeleton";
import {
  selectCurrentProfile,
  selectIsLoading,
  selectRoles,
} from "~/state/features/profile/selectors";

const ProfileCard: React.FC<{
  avatarUrl?: string | null;
  id: string | number;
  name: string;
  organizationName?: string;
  role?: string | null;
  onClick: (key: string | number) => void;
}> = ({ id, avatarUrl, name, organizationName, role, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(id);
  }, [id, onClick]);

  return (
    <Button
      variant="outline"
      className="h-20 w-full max-w-[280px] justify-between px-4 py-4 text-left transition-colors duration-200 hover:bg-secondary"
      onClick={handleClick}
    >
      <div className="flex items-center space-x-4">
        <Avatar className="h-10 w-10">
          {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
          <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium leading-none">{name}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {organizationName ?? "Personal"}
          </p>
        </div>
      </div>
      <div className="text-xs font-medium text-muted-foreground">
        {organizationName ? role : ""}
      </div>
    </Button>
  );
};

const LoadingProfileCard: React.FC = () => (
  <div className="h-20 w-full max-w-[280px] rounded-md border border-input px-4 py-4">
    <div className="flex items-center space-x-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-3 w-[80px]" />
      </div>
    </div>
  </div>
);

export interface ProfileStepProps {
  onSubmit: ({}: Record<string, any>) => void;
}

const ProfileStep = ({ onSubmit }: ProfileStepProps) => {
  // load current profile
  const { selectRole } = useProfileActions();
  const currentProfile = useAppSelector(selectCurrentProfile);
  const roles = useAppSelector(selectRoles);
  const isLoading = useAppSelector(selectIsLoading);

  const handleProfileClick = useCallback(
    (key: string | number) => {
      selectRole(key);
      onSubmit({});
    },
    [onSubmit, selectRole],
  );

  return (
    <AnimatedStepContainer className="flex flex-col items-center space-y-4">
      {isLoading && (
        <>
          <LoadingProfileCard />
          <LoadingProfileCard />
        </>
      )}
      {currentProfile.id && !isLoading && (
        <>
          <ProfileCard
            key={currentProfile.id}
            id={currentProfile.id}
            avatarUrl={currentProfile.avatar_url}
            name={`${currentProfile.name} ${currentProfile.lastname}`}
            onClick={handleProfileClick}
          />
          {roles.map((role) => (
            <ProfileCard
              key={role.id}
              id={role.id}
              avatarUrl={role.organization?.logo_url}
              name={currentProfile.name!}
              organizationName={role.organization?.name}
              role={role.role}
              onClick={handleProfileClick}
            />
          ))}
        </>
      )}
    </AnimatedStepContainer>
  );
};

export default memo(ProfileStep);
