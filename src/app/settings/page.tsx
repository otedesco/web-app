"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  User,
  Shield,
  CreditCard,
  FileText,
  Bell,
  Eye,
  Globe,
  BarChart,
  Gift,
  ChevronRight,
  Settings,
  Home,
  HelpCircle,
  MessageCircle,
  Building,
  User2Icon,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAppSelector } from "~/state/hooks";
import {
  selectFullName,
  selectProfileAvatar,
} from "~/state/features/profile/selectors";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui";
import Link from "next/link";

export default function AccountSettingsPage() {
  const fullname = useAppSelector(selectFullName);
  const avatarUrl = useAppSelector(selectProfileAvatar);
  const t = useTranslations("pages->settings");

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Desktop version */}
      <div className="hidden md:block">
        <h1 className="mb-2 text-4xl font-bold">{t("settings")}</h1>
        <p className="bold mb-8 text-lg">
          {fullname} ·
          <Link href="/settings/profile">
            <Button
              variant="link"
              size="sm"
              className="p-1 text-lg font-semibold"
            >
              {t("goToProfile")}
            </Button>
          </Link>
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {accountOptions.map((option, index) => (
            <Card
              key={index}
              className="bg-muted transition-shadow hover:shadow-lg"
            >
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <option.icon className="mr-2 h-6 w-6" />
                  {t(option.title)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t(option.description)}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-2">{t("NeedToDeactivateYourAccount")}</p>
          <Button variant="outline">{t("takeCareOfThatNow")}</Button>
        </div>
      </div>

      {/* Mobile version */}
      <div className="mb-4 pb-6 md:hidden">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t("profile")}</h1>
          <Bell className="h-6 w-6" />
        </div>
        <Link href="/settings/profile">
          <div className="mb-6 flex items-center border-b pb-4">
            <Avatar className="mr-4">
              {avatarUrl && fullname ? (
                <AvatarImage src={avatarUrl} alt={fullname} />
              ) : (
                <AvatarFallback>
                  <User2Icon className="h-4 w-4" />
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <p className="font-semibold">{t("hi", { fullname })}</p>
              <p className="text-muted-foreground">{t("showProfile")}</p>
            </div>
            <ChevronRight className="ml-auto" />
          </div>
        </Link>

        <Card className="mb-6">
          <CardContent className="flex items-center p-4">
            <div className="flex-grow">
              <h2 className="text-lg font-semibold">{t("rentItSellIt")}</h2>
              <p className="text-sm text-muted-foreground">
                {t("rentCatchFrase")}
              </p>
            </div>
            <Image
              src="/images/house.png"
              width={80}
              height={80}
              alt="House illustration"
            />
          </CardContent>
        </Card>

        {mobileMenuItems.map((item, index) => (
          <div key={index} className="mb-6">
            <h2 className="mb-2 text-lg font-semibold">{t(item.section)}</h2>
            {item.items.map((subItem, subIndex) => (
              <div key={subIndex} className="flex items-center py-2">
                <subItem.icon className="mr-4 h-6 w-6" />
                <span>{t(subItem.title)}</span>
                <ChevronRight className="ml-auto" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const accountOptions = [
  {
    title: "options.0.title",
    description: "options.0.description",
    icon: User,
  },
  {
    title: "options.1.title",
    description: "options.1.description",
    icon: Shield,
  },
  {
    title: "options.2.title",
    description: "options.2.description",
    icon: CreditCard,
  },
  {
    title: "options.3.title",
    description: "options.3.description",
    icon: FileText,
  },
  {
    title: "options.4.title",
    description: "options.4.description",
    icon: Bell,
  },
  { title: "options.5.title", description: "options.5.description", icon: Eye },
  {
    title: "options.6.title",
    description: "options.6.description",
    icon: Globe,
  },
  {
    title: "options.7.title",
    description: "options.7.description",
    icon: BarChart,
  },
  {
    title: "options.8.title",
    description: "options.8.description",
    icon: Gift,
  },
];

const mobileMenuItems = [
  {
    section: "mobileOptions.sections.0.title",
    items: [
      { title: "mobileOptions.sections.0.items.0.title", icon: User },
      { title: "mobileOptions.sections.0.items.1.title", icon: Settings },
    ],
  },
  {
    section: "mobileOptions.sections.1.title",
    items: [
      { title: "mobileOptions.sections.1.items.0.title", icon: Home },
      { title: "mobileOptions.sections.1.items.1.title", icon: Building },
    ],
  },
  {
    section: "mobileOptions.sections.2.title",
    items: [{ title: "mobileOptions.sections.2.items.0.title", icon: Gift }],
  },
  {
    section: "mobileOptions.sections.3.title",
    items: [
      { title: "mobileOptions.sections.3.items.0.title", icon: HelpCircle },
      { title: "mobileOptions.sections.3.items.1.title", icon: MessageCircle },
      { title: "mobileOptions.sections.3.items.2.title", icon: MessageCircle },
    ],
  },
];
