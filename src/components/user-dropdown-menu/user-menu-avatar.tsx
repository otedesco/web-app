import { memo } from "react";
import { Menu, User2Icon } from "lucide-react";
import { Avatar, AvatarFallback, Button, AvatarImage } from "../ui";
import { useAppSelector } from "~/state/hooks";
import { selectCurrentProfile } from "~/state/features/profile/selectors";

export type UserMenuAvatarProps = {
  avatarUrl?: string;
  name?: string;
};

const FallbackAvatar = () => {
  return (
    <AvatarFallback>
      <User2Icon className="h-4 w-4" />
    </AvatarFallback>
  );
};

const UserMenuAvatar = () => {
  const { avatarUrl, name } = useAppSelector(selectCurrentProfile);

  return (
    <Button
      variant="ghost"
      className="relative flex items-center space-x-2 rounded-full p-2 hover:bg-accent"
    >
      <Menu className="h-5 w-5" />
      <Avatar className="h-8 w-8">
        {avatarUrl && name ? (
          <AvatarImage src={avatarUrl} alt={name} />
        ) : (
          <FallbackAvatar />
        )}
      </Avatar>
    </Button>
  );
};

export default memo(UserMenuAvatar);
