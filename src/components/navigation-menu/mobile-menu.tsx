import { Heart, Search, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

// Type definition for a single menu option
export type MenuOption = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const defaultMenuOptions: MenuOption[] = [
  {
    label: "Explore",
    href: "/",
    icon: <Search className="mb-1 h-6 w-6" />,
  },
  {
    label: "Wishlist",
    href: "/wishlist",
    icon: <Heart className="mb-1 h-6 w-6" />,
  },
  {
    label: "Log in",
    href: "/auth/login",
    icon: <User className="mb-1 h-6 w-6" />,
  },
];

export type MobileMenuProps = {
  className?: string;
  menuOptions?: MenuOption[];
};

export const MobileMenu = ({
  className = "",
  menuOptions = defaultMenuOptions,
}: MobileMenuProps) => {
  const t = useTranslations("components->main-nav");

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 border-t border-border bg-background/80 backdrop-blur-md md:hidden ${className}`}
    >
      <div className="flex justify-around py-2">
        {menuOptions.map((option) => (
          <Link
            key={option.href}
            href={option.href}
            className="flex flex-col items-center py-0"
          >
            <div className="flex flex-col items-center">
              {option.icon}
              <span className="text-xs">{t(option.label)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
