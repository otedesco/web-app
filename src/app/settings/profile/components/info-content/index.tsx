"use client";

import { Check, ChevronRight, ChevronRightIcon, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import ResponsiveDialog from "~/components/responsive-dialog";
import { Button, Card } from "~/components/ui";
import Skeleton from "~/components/skeleton-wrapper";
import { selectFirstName } from "~/state/features/profile/selectors";
import { useAppSelector } from "~/state/hooks";
import { ProfileDetailsRequest } from "../../page";
import { ProfileItem } from "./components/dialog-contents/types";
import { aboutItem, profileItems } from "./config";
import {
  AccountDetails,
  ProfileDetails,
  VerificationStatusEnum,
} from "~/lib/services/cerberus/types";
import { cn } from "~/lib/utils";
import SkeletonWrapper from "~/components/skeleton-wrapper";
import { useAccountDetails } from "~/lib/hooks/useAccountDetails";

export type ItemDialogProps = {
  value?: ProfileDetails[keyof ProfileDetails];
  onChange: (
    key: keyof ProfileDetailsRequest,
    value: ProfileDetailsRequest[keyof ProfileDetailsRequest],
  ) => void;
  item: ProfileItem;
  Trigger?: React.ReactNode;
};

const ItemDialog = ({ item, onChange, value, Trigger }: ItemDialogProps) => {
  const [isOpen, setOpenModal] = useState<boolean>(false);
  const [profileDetailValue, setProfileDetailValue] =
    useState<ProfileDetailsRequest[keyof ProfileDetailsRequest]>(value);

  const t = useTranslations("views->profile-info-view");

  const handleSubmit = useCallback(() => {
    onChange(item.id, profileDetailValue);
    setOpenModal(false);
  }, [profileDetailValue, onChange]);

  const parseValue = (id: string, value?: string | string[] | Date | null) => {
    if (value === null || value === undefined) return "";
    if (Array.isArray(value)) {
      return value.map((v) => t(v)).join(", ");
    }
    if (value instanceof Date || id === "birthdate") {
      const year = new Date(value).getFullYear();
      return `${Math.floor(year / 10) * 10}'s`;
    }
    if (["gender", "maritalStatus"].includes(id)) {
      return t(value);
    }

    return value;
  };

  const DefaultTrigger = (
    <Button
      variant="outline"
      className="text-md min-h-5 w-full justify-between border-none py-8 text-left font-normal"
    >
      <div className="flex items-center space-x-3">
        {item.icon && <item.icon className="h-5 w-5" />}
        <div>
          <div className="font-medium">{item.label}</div>
          {value && (
            <div className="text-sm text-muted-foreground">
              {parseValue(item.id, value)}
            </div>
          )}
        </div>
      </div>
      <ChevronRight className="h-5 w-5" />
    </Button>
  );

  return (
    <ResponsiveDialog
      Trigger={Trigger ?? DefaultTrigger}
      Content={
        item.Content && (
          <item.Content
            item={item}
            value={profileDetailValue}
            onChange={setProfileDetailValue}
          />
        )
      }
      isOpen={isOpen}
      Footer={
        <Button className="mt-4" onClick={handleSubmit}>
          Save
        </Button>
      }
      onOpenChange={setOpenModal}
    />
  );
};

export type InfoContentEditModeProps = {
  onProfileDetailsChange: (
    key: keyof ProfileDetailsRequest,
    value: ProfileDetailsRequest[keyof ProfileDetailsRequest],
  ) => void;
  profileDetails: Partial<ProfileDetailsRequest>;
  isLoading: boolean;
};

const InfoContentEditMode = (props: InfoContentEditModeProps) => {
  const formatText = (text: string) => {
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index !== text.split("\n").length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="mx-auto mb-20 min-h-[calc(100vh-7rem)] max-w-2xl flex-grow md:mb-0">
      <h2 className="mb-4 text-3xl font-bold">Your profile</h2>
      <p className="text-md text-muted-foreground">
        The information you share will be used across Apart to help other users
        get to know you.
      </p>
      <Button
        variant="link"
        className="text-md border-muted-foreground px-0 text-muted-foreground"
      >
        Learn more
      </Button>
      <div className="min-w-full"></div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {profileItems.map((item) => (
          <ItemDialog
            key={item.label}
            onChange={props.onProfileDetailsChange}
            item={item}
            value={props.profileDetails[item.id]}
          />
        ))}
      </div>

      <h2 className="mb-4 mt-8 text-2xl font-bold">About you</h2>
      <div
        className={cn(
          !props.profileDetails.about && "border border-dashed",
          "min-w-full rounded-lg p-4",
        )}
      >
        <p className="text-md px-4 text-muted-foreground">
          {props.profileDetails[aboutItem.id]
            ? formatText(props.profileDetails[aboutItem.id] as string)
            : "Write something fun and punchy."}
        </p>
        <ItemDialog
          item={aboutItem}
          onChange={props.onProfileDetailsChange}
          value={props.profileDetails[aboutItem.id]}
          Trigger={
            <Button variant="link" className="text-md">
              Add intro
            </Button>
          }
        />
      </div>
    </div>
  );
};

const InfoContentViewMode = ({
  profileDetails,
  isLoading,
}: {
  profileDetails: Partial<ProfileDetails>;
  isLoading: boolean;
}) => {
  const t = useTranslations("views->profile-info-view");
  const name = useAppSelector(selectFirstName);
  const { data, isLoading: isAccountLoading } = useAccountDetails({});

  const parseValue = (id: string, value?: string | Date | string[] | null) => {
    if (value === null || value === undefined) return "";
    if (Array.isArray(value)) {
      return value.map((v) => t(v)).join(", ");
    }
    if (value instanceof Date || id === "birthdate") {
      const year = new Date(value).getFullYear();
      return `${Math.floor(year / 10) * 10}'s`;
    }
    if (["gender", "maritalStatus"].includes(id)) {
      return t(value);
    }

    return value;
  };

  const formatText = (text: string) => {
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index !== text.split("\n").length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="mx-auto min-h-[calc(100vh-7rem)] max-w-2xl flex-grow">
      <div className="space-y-8 pb-20">
        <div className="flex flex-col items-start justify-between">
          <h1 className="text-3xl font-bold">{t("about", { name })}</h1>
          <Link href="/settings/profile?edit=true">
            <Button variant="outline" className="mt-4 hidden text-sm md:block">
              {t("editProfile")}
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2">
          {profileItems.map((item) => {
            return (
              <div className="flex items-center gap-2" key={item.id}>
                {item.icon && (
                  <Skeleton
                    key={item.id}
                    isDataReady={!isLoading}
                    className="h-5 w-5"
                  >
                    {!profileDetails[item.id] ? null : (
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                    )}
                  </Skeleton>
                )}
                <Skeleton
                  key={item.id}
                  isDataReady={!isLoading}
                  className="h-5 w-48"
                >
                  {!profileDetails[item.id] ? null : (
                    <p className="text-sm">
                      {t(item.id, {
                        [item.id]: parseValue(item.id, profileDetails[item.id]),
                      })}
                    </p>
                  )}
                </Skeleton>
              </div>
            );
          })}
        </div>

        <Skeleton isDataReady={!isLoading} className="h-5 w-48">
          {profileDetails.about && (
            <div className="prose prose-sm max-w-none">
              {formatText(profileDetails.about)}
            </div>
          )}
        </Skeleton>

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
            {[
              "identityVerificationStatus",
              "emailVerificationStatus",
              "phoneVerificationStatus",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <SkeletonWrapper
                  isDataReady={!isAccountLoading}
                  className="h-5 w-5 rounded-full"
                >
                  {data?.[item as keyof AccountDetails] ===
                  VerificationStatusEnum.VERIFIED ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-red-500" />
                  )}
                </SkeletonWrapper>
                <SkeletonWrapper
                  isDataReady={!isAccountLoading}
                  className="h-5 w-40"
                >
                  <span>{t(item)}</span>
                </SkeletonWrapper>
              </li>
            ))}
          </ul>
          <Button variant="link" className="text-md">
            {t("learnAboutIdentityVerification")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function InfoContent({
  isEditMode,
  onProfileDetailsChange,
  profileDetails,
  isLoading,
}: { isEditMode: boolean } & InfoContentEditModeProps) {
  if (isEditMode) {
    return (
      <InfoContentEditMode
        onProfileDetailsChange={onProfileDetailsChange}
        profileDetails={profileDetails}
        isLoading={isLoading}
      />
    );
  }

  return (
    <InfoContentViewMode
      profileDetails={profileDetails}
      isLoading={isLoading}
    />
  );
}
