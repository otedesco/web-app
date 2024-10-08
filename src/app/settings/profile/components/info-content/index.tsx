"use client";

import {
  Baby,
  Briefcase,
  CheckIcon,
  ChevronRight,
  ChevronRightIcon,
  Clock,
  Heart,
  Languages,
  MapPin,
  MapPinIcon,
  Music,
  PawPrint,
  Users,
  Wand2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

import ResponsiveDialog from "~/components/responsive-dialog";
import { Button, Card } from "~/components/ui";
import { selectFirstName } from "~/state/features/profile/selectors";
import { useAppSelector } from "~/state/hooks";
import BirthdateDialogContent from "./components/dialog-contents/birthdate";
import LanguagesDialogContent from "./components/dialog-contents/languages";
import LocationContent from "./components/dialog-contents/location";
import SchoolDialogContent from "./components/dialog-contents/school";
import WorkDialogContent from "./components/dialog-contents/work";
import GenderDialogContent from "./components/dialog-contents/gender";
import MaritalStatusDialogContent from "./components/dialog-contents/marital-status";
import MusicDialogContent from "./components/dialog-contents/music";

const profileItems = [
  {
    id: "birthdate",
    icon: Baby,
    label: "Decade I was born",
    value: "90s",
    description:
      "Don’t worry, other people won’t be able to see your exact birthday.",
    title: "Decade you were born",
    Content: BirthdateDialogContent,
  },
  {
    id: "school",
    icon: MapPin,
    label: "Where I went to school",
    value: "Caracas",
    description:
      "Whether it’s home school, high school, or trade school, name the school that made you who you are.",
    title: "Where did you go to school?",
    Content: SchoolDialogContent,
  },
  {
    id: "work",
    icon: Briefcase,
    label: "My work",
    value: "Desarrollador",
    description:
      "Tell us what your profession is. If you don’t have a traditional job, tell us your life’s calling. Example: Nurse, parent to four kids, or retired surfer.",
    title: "What do you do for work?",
    Content: WorkDialogContent,
  },
  {
    id: "languages",
    icon: Languages,
    label: "Languages I speak",
    value: "English, Spanish, and Portuguese",
    description: "",
    title: "Languages you speak",
    Content: LanguagesDialogContent,
  },
  {
    id: "location",
    icon: MapPin,
    label: "Where I live",
    value: "Buenos Aires, Argentina",
    description: "",
    title: "Where you live",
    Content: LocationContent,
  },
  {
    id: "gender",
    icon: Users,
    label: "I identify myself as",
    value: "",
    // options: [
    //   { label: "Female", value: "female" },
    //   { label: "Male", value: "male" },
    //   { label: "Non-binary", value: "non-binary" },
    //   { label: "Genderqueer", value: "genderqueer" },
    //   { label: "Genderfluid", value: "genderfluid" },
    //   { label: "Agender", value: "agender" },
    //   { label: "Two-Spirit", value: "two-spirit" },
    //   { label: "Prefer not to say", value: "prefer-not-to-say" },
    //   { label: "Other", value: "other" },
    // ],
    description: "Please share how do you identify yourself.",
    title: "Your Gender Identity",
    Content: GenderDialogContent,
  },
  {
    id: "maritalStatus",
    icon: Heart, // You can replace `MaritalStatusIcon` with an actual icon
    label: "My marital status",
    value: "", // Initial value can be an empty string until the user selects
    // options: [
    //   { label: "Single", value: "single" },
    //   { label: "Married", value: "married" },
    //   { label: "In a relationship", value: "in-relationship" },
    //   { label: "Engaged", value: "engaged" },
    //   { label: "Divorced", value: "divorced" },
    //   { label: "Widowed", value: "widowed" },
    //   { label: "It's complicated", value: "complicated" },
    //   { label: "Prefer not to say", value: "prefer-not-to-say" },
    // ],
    description: "Please select your relationship status",
    title: "Relationship Status",
    Content: MaritalStatusDialogContent,
  },
  {
    icon: Music,
    label: "My favorite song in high school",
    value: "Nothing else matters",
    description:
      "However embarrassing, share the tune you listened to on repeat as a teenager.",
    title: "What was your favorite song in high school?",
    Content: MusicDialogContent,
  },
];

const ItemDialog = ({ item }: { item: (typeof profileItems)[number] }) => {
  const [isOpen, setOpenModal] = useState<boolean>(false);
  const [value, setValue] = useState(item.value);

  const Trigger = (
    <Button
      variant="outline"
      className="text-md min-h-5 w-full justify-between border-none py-8 text-left font-normal"
    >
      <div className="flex items-center space-x-3">
        <item.icon className="h-5 w-5" />
        <div>
          <div className="font-medium">{item.label}</div>
          {item.value && (
            <div className="text-sm text-muted-foreground">{item.value}</div>
          )}
        </div>
      </div>
      <ChevronRight className="h-5 w-5" />
    </Button>
  );

  return (
    <ResponsiveDialog
      Trigger={Trigger}
      Content={item.Content && <item.Content item={item} />}
      isOpen={isOpen}
      Footer={
        <Button className="mt-4" onClick={() => setOpenModal(false)}>
          Save
        </Button>
      }
      onOpenChange={setOpenModal}
    />
  );
};

const InfoContentEditMode = () => {
  return (
    <div className="mb-20 min-h-[calc(100vh-7rem)] flex-grow md:mb-0">
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
          <ItemDialog key={item.label} item={item} />

          // <DialogContent>
          //   <DialogHeader>
          //     <DialogTitle>{item.label}</DialogTitle>
          //   </DialogHeader>
          //   <Input defaultValue={item.value} className="mt-4" />
          //   <Button className="mt-4">Save</Button>
          // </DialogContent>
        ))}
      </div>

      <h2 className="mb-4 mt-8 text-2xl font-bold">About you</h2>
      <div className="min-w-full rounded-lg border border-dashed p-4">
        <p className="text-md px-4 text-muted-foreground">
          Write something fun and punchy.
        </p>
        <Button variant="link" className="text-md">
          Add intro
        </Button>
      </div>
    </div>
  );
};

const InfoContentViewMode = () => {
  const t = useTranslations("views->profile-info-view");
  const name = useAppSelector(selectFirstName);
  const location = "Caracas, Venezuela";
  return (
    <div className="min-h-[calc(100vh-7rem)] flex-grow">
      <div className="space-y-8 pb-20">
        <div className="flex flex-col items-start justify-between">
          <h1 className="text-3xl font-bold">{t("about", { name })}</h1>
          <Link href="/settings/profile?edit=true">
            <Button variant="outline" className="mt-4 hidden text-sm md:block">
              {t("editProfile")}
            </Button>
          </Link>
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
    </div>
  );
};

export default function InfoContent({ isEditMode }: { isEditMode: boolean }) {
  if (isEditMode) {
    return <InfoContentEditMode />;
  }

  return <InfoContentViewMode />;
}
