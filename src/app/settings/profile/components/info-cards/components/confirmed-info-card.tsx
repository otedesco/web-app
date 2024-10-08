"use client";

import { CheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, Card, Skeleton } from "~/components/ui";
import { selectFirstName } from "~/state/features/profile/selectors";
import { useAppSelector } from "~/state/hooks";

const ConfirmedInfoCardSkeleton = () => (
  <Card className="hidden space-y-4 p-6 shadow-none md:block">
    <div className="flex items-center justify-between">
      <Skeleton className="h-7 w-3/4" />
    </div>
    <ul className="space-y-2">
      {[1, 2, 3].map((item) => (
        <li key={item} className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-1/2" />
        </li>
      ))}
    </ul>
    <Skeleton className="mt-1 h-5 w-1/3" />
  </Card>
);

export type ConfirmedInfoCardProps = {
  isLoading: boolean;
};

const ConfirmedInfoCard = ({ isLoading }: ConfirmedInfoCardProps) => {
  const t = useTranslations("views->profile-info-view");
  const name = useAppSelector(selectFirstName);

  if (isLoading) return <ConfirmedInfoCardSkeleton />;

  return (
    <Card className="hidden space-y-4 p-6 shadow-none md:block">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">
          {t("confirmedInformation", { name })}
        </h3>
      </div>
      <ul className="space-y-2">
        {["identity", "emailAddress", "phoneNumber"].map((item) => (
          <li key={item} className="flex items-center gap-2">
            <CheckIcon className="h-5 w-5 text-green-500" />
            <span>{t(item)}</span>
          </li>
        ))}
      </ul>
      <Button variant="link" className="mt-1 text-sm">
        {t("learnAboutIdentityVerification")}
      </Button>
    </Card>
  );
};

export default ConfirmedInfoCard;
