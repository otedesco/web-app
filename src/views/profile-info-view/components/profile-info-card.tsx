"use client";

import { CheckIcon } from "lucide-react";
import { Card } from "~/components/ui";
import { Badge } from "~/components/ui/badge";
import { selectProfileAvatar } from "~/state/features/profile/selectors";
import { useAppSelector } from "~/state/hooks";

const ProfileInfoCard = () => {
  const avatarUrl = useAppSelector(selectProfileAvatar);

  return (
    <div className="sticky top-24 w-full space-y-4 md:w-72">
      <Card className="flex w-full max-w-2xl flex-col items-center shadow-xl md:flex-row md:items-stretch">
        <div className="flex flex-row items-center gap-4 p-6 md:flex-col md:items-start md:border-r md:p-8">
          <div className="relative h-20 w-20 sm:h-24 sm:w-24">
            <img
              src={avatarUrl!}
              alt="Oswaldo"
              width={96}
              height={96}
              className="rounded-full"
            />
            <Badge className="absolute bottom-0 right-0 bg-pink-500 px-0.5 text-white">
              <CheckIcon className="h-4 w-4" />
            </Badge>
          </div>
          <div className="mt-0 text-left sm:mt-4 sm:text-center">
            <h2 className="text-xl font-bold sm:text-2xl">Oswaldo</h2>
            <p className="text-sm text-gray-500">Tenant · Buyer</p>
          </div>
        </div>

        <div className="flex w-full flex-row items-center justify-center gap-8 p-6 md:w-auto md:flex-col md:items-start md:p-8">
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold">4</p>
            <p className="text-xs text-muted-foreground">Reviews</p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold">6</p>
            <p className="text-xs text-muted-foreground">Years on Apart</p>
          </div>
        </div>
      </Card>
      <Card className="hidden space-y-4 p-6 shadow-none md:block">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            Oswaldo&apos;s confirmed information
          </h3>
        </div>
        <ul className="space-y-2">
          {["Identity", "Email address", "Phone number"].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <CheckIcon className="h-5 w-5 text-green-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <a href="#" className="text-sm text-gray-500 hover:underline">
          Learn about identity verification
        </a>
      </Card>
    </div>
  );
};

export default ProfileInfoCard;
