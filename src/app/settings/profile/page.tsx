"use client";

import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
  CheckIcon,
  MapPinIcon,
  ChevronRightIcon,
  ChevronLeft,
} from "lucide-react";
import { useAppSelector } from "~/state/hooks";
import { selectProfileAvatar } from "~/state/features/profile/selectors";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-10 flex items-center justify-between bg-white p-2 shadow-md md:hidden">
      <Link href="/settings">
        <ChevronLeft className="h-6 w-6" />
      </Link>
      <Button variant="link" className="text-md">
        Edit
      </Button>
    </nav>
  );
};

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

const ProfileInfoContent = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">About Oswaldo</h1>
      </div>
      <div className="flex items-center gap-2">
        <MapPinIcon className="h-5 w-5 text-gray-500" />
        <p>Lives in Caracas, Venezuela</p>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            What are saying about Oswaldo
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
          Show all 4 reviews
        </Button>
      </div>

      <div>
        <h3 className="text-xl font-semibold">Reviews you&apos;ve written</h3>
      </div>
      <div className="block md:hidden">
        <h3 className="text-xl font-semibold">Oswaldo confirmed information</h3>
        <ul className="m-2 space-y-2">
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
      </div>
    </div>
  );
};

export default function ProfileInfoPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-20">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          <div className="w-full pb-4 md:w-72">
            <ProfileInfoCard />
          </div>
          <div className="min-h-[calc(100vh-7rem)] flex-grow">
            <ProfileInfoContent />
          </div>
        </div>
      </div>
    </>
  );
}
