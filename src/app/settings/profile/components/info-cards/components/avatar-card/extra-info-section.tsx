"use client";
import { useTranslations } from "next-intl";
import { Skeleton } from "~/components/ui";
import { timeOn } from "~/lib/date";
import { selectCurrentProfile } from "~/state/features/profile/selectors";
import { useAppSelector } from "~/state/hooks";

export type ExtraInfoSectionProps = {
  reviews: number;
  isLoading: boolean;
};

const ExtraInfoSectionSkeleton = () => (
  <div className="flex w-full flex-row items-center justify-center gap-8 p-6 md:w-auto md:flex-col md:items-start">
    <div className="text-center md:text-left">
      <Skeleton className="mb-1 h-8 w-8" />
      <Skeleton className="h-4 w-20" />
    </div>
    <div className="text-center md:text-left">
      <Skeleton className="mb-1 h-8 w-8" />
      <Skeleton className="h-4 w-20" />
    </div>
  </div>
);

const ExtraInfoSection = ({ reviews, isLoading }: ExtraInfoSectionProps) => {
  const t = useTranslations("views->profile-info-view");
  const { createdAt } = useAppSelector(selectCurrentProfile);
  const [unit, time] = timeOn(new Date(createdAt!));

  if (isLoading) return <ExtraInfoSectionSkeleton />;

  return (
    <div className="flex w-full flex-row items-center justify-center gap-8 p-6 md:w-auto md:flex-col md:items-start">
      <div className="text-center md:text-left">
        <p className="text-2xl font-bold">4</p>
        <p className="text-xs text-muted-foreground">
          {t("reviews", { count: reviews })}
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
  );
};

export default ExtraInfoSection;
