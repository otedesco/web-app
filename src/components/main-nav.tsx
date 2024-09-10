"use client";
import React, { useState } from "react";
import { DollarSign, Heart, Menu, Search, User, User2Icon } from "lucide-react";
import { BrandLogo, BrandLogoWithText } from "~/components/brand-icon";
import { Button } from "~/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { SearchModal } from "./search-modal";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { useTranslations } from "next-intl";

export interface MainNavProps {
  children: React.ReactNode;
}

export const MainNav = (props: MainNavProps) => {
  const t = useTranslations("components->main-nav");

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <BrandLogoWithText className="hidden lg:block" />
              <BrandLogo className="lg:hidden" />
            </div>
            <div className="mx-4 max-w-2xl flex-1">
              <SearchModal
                isSearchOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
              />
            </div>
            <div className="hidden items-center space-x-4 md:flex">
              {/* Should receive this components as props  */}
              <Button variant="ghost" className="text-sm font-medium">
                {t("Become an Agent")}
              </Button>
              <ThemeToggle />
              {/* should receive menu options as props */}
              <DesktopMenu />
            </div>
          </div>
        </div>
      </header>

      {props.children}

      {/* should receive menu options as props */}
      <MobileMenu />
    </>
  );
};

const DesktopMenu = () => {
  const t = useTranslations("components->main-nav");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative flex items-center space-x-2 rounded-full p-2 hover:bg-accent"
        >
          <Menu className="h-5 w-5" />
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="/placeholder.svg?height=32&width=32"
              alt="User avatar"
            />
            <AvatarFallback>
              <User2Icon />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>{t("Profile")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Heart className="mr-2 h-4 w-4" />
          <span>{t("Saved Properties")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <DollarSign className="mr-2 h-4 w-4" />
          <span>{t("My Investments")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const MobileMenu = () => {
  const t = useTranslations("components->main-nav");

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/80 backdrop-blur-md md:hidden">
      <div className="flex justify-around py-2">
        <Button variant="ghost" className="flex flex-col items-center py-0">
          <Search className="mb-1 h-6 w-6" />
          <span className="text-xs">{t("Search")}</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center py-0">
          <Heart className="mb-1 h-6 w-6" />
          <span className="text-xs">{t("Saved")}</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center py-0">
          <User className="mb-1 h-6 w-6" />
          <span className="text-xs">{t("Profile")}</span>
        </Button>
      </div>
    </div>
  );
};