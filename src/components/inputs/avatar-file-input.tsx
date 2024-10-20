"use client";
import { Camera, User2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage, Button } from "~/components/ui";
import { cn } from "~/lib/utils";

const FallbackAvatar = () => {
  return (
    <AvatarFallback>
      <User2Icon className="h-24 w-24 md:h-28 md:w-28" />
    </AvatarFallback>
  );
};

interface AvatarFileInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  avatarUrl: string | null;
  name: string;
  isEditMode?: boolean;
  className?: string;
}

const AvatarFileInput = ({
  onChange,
  avatarUrl,
  name,
  isEditMode = false,
  className,
}: AvatarFileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <Avatar className="h-56 w-56">
        <AvatarImage src={avatarUrl ?? undefined} alt={name} />
        <FallbackAvatar />
      </Avatar>
      <div
        className={cn(
          "absolute rounded-full",
          isEditMode ? "-bottom-2" : "bottom-20 md:bottom-16",
        )}
      >
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          className="rounded-2xl"
          size="sm"
          type="button"
        >
          <Camera className="h-6 w-6" />
          <span className="ml-1">Edit</span>
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

export default AvatarFileInput;
