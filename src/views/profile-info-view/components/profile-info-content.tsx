"use client";

import { CheckIcon, ChevronRightIcon, MapPinIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, Card } from "~/components/ui";
import { selectFirstName } from "~/state/features/profile/selectors";
import { useAppSelector } from "~/state/hooks";

const ProfileInfoContent = () => {
  const t = useTranslations("views->profile-info-view");
  const name = useAppSelector(selectFirstName);
  const location = "Caracas, Venezuela";
  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col items-start justify-between">
        <h1 className="text-3xl font-bold">{t("about", { name })}</h1>
        <Button variant="outline" className="mt-4 hidden text-sm md:block">
          {t("editProfile")}
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <MapPinIcon className="h-5 w-5 text-gray-500" />
        <p>{t("location", { location })}</p>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {t("whatSayingAbout", { name })}
          </h3>
          <ChevronRightIcon className="h-5 w-5 text-gray-500" />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {[
            {
              review:
                "Lorem ipsum odor amet, consectetuer adipiscing elit. Nascetur eu tortor elit luctus, consequat sollicitudin suspendisse. Lacinia montes mollis ipsum tempus euismod viverra ipsum auctor.",
              name: "Virgilio",
              date: "May 2024",
            },
            {
              review:
                "Lorem ipsum odor amet, consectetuer adipiscing elit. Nascetur eu tortor elit luctus, consequat sollicitudin suspendisse. Lacinia montes mollis ipsum tempus euismod viverra ipsum auctor.",
              name: "Aernoud",
              date: "February 2024",
            },
          ].map((review, index) => (
            <Card key={index} className="space-y-2 p-4">
              <p className="text-sm">{review.review}</p>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gray-200" />
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <Button variant="link" className="text-sm">
          {t("showAllReviews", { count: 4 })}
        </Button>
      </div>

      <div>
        <h3 className="text-xl font-semibold">{t("reviewsYouWritten")}</h3>
      </div>
      <div className="block md:hidden">
        <h3 className="text-xl font-semibold">
          {t("confirmedInformation", { name })}
        </h3>
        <ul className="m-2 space-y-2">
          {["identity", "emailAddress", "phoneNumber"].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <CheckIcon className="h-5 w-5 text-green-500" />
              <span>{t(item)}</span>
            </li>
          ))}
        </ul>
        <Button variant="link" className="text-md">
          {t("learnAboutIdentityVerification")}
        </Button>
      </div>
    </div>
  );
};

export default ProfileInfoContent;
