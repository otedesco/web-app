import React, { memo } from "react";
import { AvatarImage, Button, Avatar, AvatarFallback } from "~/components/ui";
import { profiles } from "../../data";
import AnimatedStepContainer from "../utils/animated-step-container";

interface Profile {
  email: string;
  avatar: string;
  name: string;
  organization: string | null;
  role: string;
}

const ProfileCard: React.FC<{
  profile: Profile;
  onClick: (profile: Profile) => void;
}> = ({ profile, onClick }) => (
  <Button
    key={profile.email}
    variant="outline"
    className="h-20 w-full max-w-[280px] justify-between px-4 py-4 text-left transition-colors duration-200 hover:bg-secondary"
    onClick={() => onClick(profile)}
  >
    <div className="flex items-center space-x-4">
      <Avatar className="h-10 w-10">
        <AvatarImage src={profile.avatar} alt={profile.name} />
        <AvatarFallback>{profile.name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium leading-none">{profile.name}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {profile.organization ?? "Personal"}
        </p>
      </div>
    </div>
    <div className="text-xs font-medium text-muted-foreground">
      {profile.role}
    </div>
  </Button>
);

const ProfileStep: React.FC = () => {
  // Define an event handler for button clicks
  const handleProfileClick = (profile: Profile) => {
    console.log(profile);
  };

  return (
    <AnimatedStepContainer className="space-y-4">
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.email}
          profile={profile}
          onClick={handleProfileClick}
        />
      ))}
    </AnimatedStepContainer>
  );
};

export default memo(ProfileStep);
