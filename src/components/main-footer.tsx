import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { BrandLogoWithText } from "~/components/brand-icon";
import { useTranslations } from "next-intl";

export type MainFooterProps = object;

export default function MainFooter() {
  const t = useTranslations("components->main-footer");
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-4">
            <BrandLogoWithText />
            <p className="text-sm text-muted-foreground">
              {t("brand-catch-frase")}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">{t("Facebook")}</span>
                <Facebook size={24} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">{t("Twitter")}</span>
                <Twitter size={24} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">{t("Instagram")}</span>
                <Instagram size={24} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">{t("LinkedIn")}</span>
                <Linkedin size={24} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t("explore")}</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("Buy Property")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("Rent Property")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("Commercial Property")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("New Developments")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("Find an Agent")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t("List Property")}</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("Sell Your Property")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("Rent Your Property")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("Property Valuation")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("Advertise with Us")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t("Resources")}</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("Buying Guide")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("Renting Guide")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("Property News")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("Market Insights")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("Mortgage Calculator")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t("About Us")}</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("Our Story")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("Careers")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("Press")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("Contact Us")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("Privacy Policy")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("Terms of Service")}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <form className="mx-auto max-w-md">
            <h3 className="mb-4 text-center text-lg font-semibold">
              {t("Subscribe to our newsletter")}
            </h3>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder={t("Enter your email")}
                className="flex-grow"
              />
              <Button type="submit">
                <Mail className="mr-2 h-4 w-4" /> {t("Subscribe")}
              </Button>
            </div>
          </form>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
