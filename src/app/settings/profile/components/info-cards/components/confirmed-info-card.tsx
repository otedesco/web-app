"use client";

import { Check, X } from "lucide-react";
import { useTranslations } from "next-intl";
import SkeletonWrapper from "~/components/skeleton-wrapper";
import { Button, Card } from "~/components/ui";
import { useAccountDetails } from "~/lib/cerberus/hooks";
import { AccountDetails, VerificationStatusEnum } from "~/lib/cerberus/types";
import {
  selectFirstName,
  selectIsLoading,
} from "~/state/features/profile/selectors";
import { useAppSelector } from "~/state/hooks";

const ConfirmedInfoCard = () => {
  const t = useTranslations("views->profile-info-view");
  const name = useAppSelector(selectFirstName);
  const isProfileLoading = useAppSelector(selectIsLoading);
  const { data, isLoading } = useAccountDetails({});

  const CardHeading = (
    <div className="flex items-center justify-between">
      <SkeletonWrapper isDataReady={!isProfileLoading} className="h-7 w-52">
        <h3 className="text-xl font-semibold">
          {t("confirmedInformation", { name })}
        </h3>
      </SkeletonWrapper>
    </div>
  );

  const Items = (
    [
      "identityVerificationStatus",
      "emailVerificationStatus",
      "phoneVerificationStatus",
    ] as (keyof AccountDetails)[]
  ).map((item) => (
    <li key={item} className="flex items-center gap-2">
      <SkeletonWrapper
        isDataReady={!isLoading}
        className="h-5 w-5 rounded-full"
      >
        {data?.[item] === VerificationStatusEnum.VERIFIED ? (
          <Check className="h-5 w-5 text-green-500" />
        ) : (
          <X className="h-5 w-5 text-red-500" />
        )}
      </SkeletonWrapper>
      <SkeletonWrapper isDataReady={!isLoading} className="h-5 w-40">
        <span>{t(item)}</span>
      </SkeletonWrapper>
    </li>
  ));

  return (
    <Card className="hidden space-y-4 p-6 shadow-none md:block">
      {CardHeading}
      <ul className="space-y-2">{Items}</ul>
      <Button variant="link" className="mt-1 text-sm">
        {t("learnAboutIdentityVerification")}
      </Button>
    </Card>
  );
};

export default ConfirmedInfoCard;
