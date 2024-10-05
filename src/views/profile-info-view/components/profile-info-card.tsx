"use client";
import { CheckIcon } from "lucide-react";
import { Button, Card } from "~/components/ui";
import ProfileInfoCardAvatar from "./card-avatar";
import { useAppSelector } from "~/state/hooks";
import {
  selectCurrentProfile,
  selectFirstName,
} from "~/state/features/profile/selectors";
import { timeOn } from "~/lib/date";
import { useTranslations } from "next-intl";

const ProfileInfoCard = () => {
  const t = useTranslations("views->profile-info-view");

  const { createdAt } = useAppSelector(selectCurrentProfile);
  const name = useAppSelector(selectFirstName);
  const [unit, time] = timeOn(new Date(createdAt!));

  return (
    <div className="sticky top-32 w-full space-y-4 md:w-72">
      <Card className="flex w-full max-w-2xl flex-col items-center shadow-xl md:flex-row md:items-stretch">
        <ProfileInfoCardAvatar />
        <div className="flex w-full flex-row items-center justify-center gap-8 p-6 md:w-auto md:flex-col md:items-start">
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold">4</p>
            <p className="text-xs text-muted-foreground">
              {t("reviews", { count: 4 })}
            </p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold">{time}</p>
            <p className="text-xs text-muted-foreground">
              {t("timeOnApart", {
                unit: t(`unit.${unit}`, { time }),
              })}
            </p>
          </div>
        </div>
      </Card>
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
    </div>
  );
};

export default ProfileInfoCard;
