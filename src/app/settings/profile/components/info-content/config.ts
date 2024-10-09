import {
  Baby,
  Briefcase,
  Globe2,
  Heart,
  Languages,
  MapPin,
  Users,
} from "lucide-react";
import BirthdateDialogContent from "./components/dialog-contents/birthdate";
import SchoolDialogContent from "./components/dialog-contents/school";
import WorkDialogContent from "./components/dialog-contents/work";
import LanguagesDialogContent from "./components/dialog-contents/languages";
import LocationContent from "./components/dialog-contents/location";
import GenderDialogContent from "./components/dialog-contents/gender";
import MaritalStatusDialogContent from "./components/dialog-contents/marital-status";
import { ProfileItem } from "./components/dialog-contents/types";
import NationalityDialogContent from "./components/dialog-contents/nationality";
import AboutDialogContent from "./components/dialog-contents/about";

export const profileItems: ProfileItem[] = [
  {
    id: "birthdate",
    icon: Baby,
    label: "Decade I was born",
    description:
      "Don’t worry, other people won’t be able to see your exact birthday.",
    title: "Decade you were born",
    Content: BirthdateDialogContent,
  },
  {
    id: "school",
    icon: MapPin,
    label: "Where I went to school",
    description:
      "Whether it’s home school, high school, or trade school, name the school that made you who you are.",
    title: "Where did you go to school?",
    Content: SchoolDialogContent,
  },
  {
    id: "work",
    icon: Briefcase,
    label: "My work",
    description:
      "Tell us what your profession is. If you don’t have a traditional job, tell us your life’s calling. Example: Nurse, parent to four kids, or retired surfer.",
    title: "What do you do for work?",
    Content: WorkDialogContent,
  },
  {
    id: "languages",
    icon: Languages,
    label: "Languages I speak",
    description: "",
    title: "Languages you speak",
    Content: LanguagesDialogContent,
  },
  {
    id: "location",
    icon: MapPin,
    label: "Where I live",
    description: "",
    title: "Where you live",
    Content: LocationContent,
  },
  {
    id: "gender",
    icon: Users,
    label: "I identify myself as",
    description: "Please share how do you identify yourself.",
    title: "Your Gender Identity",
    Content: GenderDialogContent,
  },
  {
    id: "maritalStatus",
    icon: Heart,
    label: "My marital status",
    description: "Please select your relationship status",
    title: "Relationship Status",
    Content: MaritalStatusDialogContent,
  },
  {
    id: "nationality",
    icon: Globe2,
    label: "My nationality",
    description: "Share where did you grow up",
    title: "Nationality",
    Content: NationalityDialogContent,
  },
];

export const aboutItem: ProfileItem = {
  id: "about",
  label: "",
  description:
    "Tell us a little bit about yourself, so your future clients can get to know you better.",
  title: "About you",
  Content: AboutDialogContent,
};
