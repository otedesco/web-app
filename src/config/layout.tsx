import {
  headerConfig as baseHeaderConfig,
  footerConfig as baseFooterConfig,
  mobileConfig as baseMobileConfig,
} from "~/app/_config";
import { headerConfig as resourcesHeaderConfig } from "~/app/(public)/resources/_config";
import { headerConfig as helpHeaderConfig } from "~/app/(public)/help/_config";
import { headerConfig as publishHeaderConfig } from "~/app/(public)/(marketing)/publish/_config";
import { headerConfig as newsHeaderConfig } from "~/app/(public)/(marketing)/news/_config";
import { headerConfig as aboutUsHeaderConfig } from "~/app/(public)/(marketing)/about-us/_config";
import { headerConfig as contactUsHeaderConfig } from "~/app/(public)/contact-us/_config";
import { headerConfig as settingsHeaderConfig } from "~/app/settings/_config";
import { headerConfig as onboardingHeaderConfig } from "~/app/onboarding/_config";
import { HeaderConfig } from "~/components/navigation-menu/main-nav";
import { FooterConfig } from "~/components/footer/main-footer";
import { MobileConfig } from "~/components/navigation-menu/mobile-menu";

export enum Paths {
  BASE = "/",

  LOGIN = "/auth/login",
  SIGNUP = "/auth/signup",

  LISTINGS = "/listings",

  SETTINGS = "/settings",
  SETTINGS_PROFILE = "/settings/profile",
  SETTINGS_NOTIFICATIONS = "/settings/notifications",
  SETTINGS_PAYMENTS = "/settings/payments",
  SETTINGS_TAXES = "/settings/taxes",
  SETTINGS_PREFERENCES = "/settings/preferences",
  SETTINGS_PRIVACY = "/settings/privacy",
  SETTINGS_SECURITY = "/settings/security",
  SETTINGS_TOOLS = "/settings/tools",
  SETTINGS_REFERALS = "/settings/referals",
  SETTINGS_PERSONAL_INFO = "/settings/personal-info",

  WISHLIST = "/wishlist",
  MESSAGES = "/messages",

  ONBOARDING = "/onboarding",

  RESOURSES = "/resources",
  RESOURCES_ALL_TOPICS = "/resources/all-topics",
  RESOURCES_LEARNING = "/resources/learning",
  RESOURCES_AGENTS = "/resources/agents",

  CONTACT_US = "/contact-us",

  HELP = "/help",
  HELP_ALL_TOPICS = "/help/all-topics",

  PUBLISH = "/publish",
  NEWS = "/news",
  NEWS_RESOURCES = "/news/resources",
  ABOUT_US = "/about-us",
}

export const headerConfig: Record<Paths, HeaderConfig | null> = {
  [Paths.BASE]: baseHeaderConfig,
  [Paths.LOGIN]: null, // Does not have header
  [Paths.SIGNUP]: null, // Does not have header
  [Paths.LISTINGS]: baseHeaderConfig,
  [Paths.SETTINGS]: settingsHeaderConfig,
  [Paths.SETTINGS_PROFILE]: settingsHeaderConfig,
  [Paths.SETTINGS_NOTIFICATIONS]: settingsHeaderConfig,
  [Paths.SETTINGS_PAYMENTS]: settingsHeaderConfig,
  [Paths.SETTINGS_TAXES]: settingsHeaderConfig,
  [Paths.SETTINGS_PREFERENCES]: settingsHeaderConfig,
  [Paths.SETTINGS_PRIVACY]: settingsHeaderConfig,
  [Paths.SETTINGS_SECURITY]: settingsHeaderConfig,
  [Paths.SETTINGS_TOOLS]: settingsHeaderConfig,
  [Paths.SETTINGS_REFERALS]: settingsHeaderConfig,
  [Paths.SETTINGS_PERSONAL_INFO]: settingsHeaderConfig,
  [Paths.WISHLIST]: settingsHeaderConfig,
  [Paths.MESSAGES]: settingsHeaderConfig,
  [Paths.ONBOARDING]: onboardingHeaderConfig,
  [Paths.RESOURSES]: resourcesHeaderConfig,
  [Paths.RESOURCES_ALL_TOPICS]: resourcesHeaderConfig,
  [Paths.RESOURCES_LEARNING]: resourcesHeaderConfig,
  [Paths.RESOURCES_AGENTS]: resourcesHeaderConfig,
  [Paths.CONTACT_US]: contactUsHeaderConfig,
  [Paths.HELP]: helpHeaderConfig,
  [Paths.HELP_ALL_TOPICS]: helpHeaderConfig,
  [Paths.PUBLISH]: publishHeaderConfig,
  [Paths.NEWS]: newsHeaderConfig,
  [Paths.NEWS_RESOURCES]: newsHeaderConfig,
  [Paths.ABOUT_US]: aboutUsHeaderConfig,
};

const publicPagesFooterConfig: FooterConfig = {
  type: "default",
  showOnMobile: true,
};

export const footerConfig: Record<Paths, FooterConfig | null> = {
  [Paths.BASE]: baseFooterConfig,
  [Paths.LOGIN]: null,
  [Paths.SIGNUP]: null,
  [Paths.LISTINGS]: baseFooterConfig,
  [Paths.SETTINGS]: baseFooterConfig,
  [Paths.SETTINGS_PROFILE]: baseFooterConfig,
  [Paths.SETTINGS_NOTIFICATIONS]: baseFooterConfig,
  [Paths.SETTINGS_PAYMENTS]: baseFooterConfig,
  [Paths.SETTINGS_TAXES]: baseFooterConfig,
  [Paths.SETTINGS_PREFERENCES]: baseFooterConfig,
  [Paths.SETTINGS_PRIVACY]: baseFooterConfig,
  [Paths.SETTINGS_SECURITY]: baseFooterConfig,
  [Paths.SETTINGS_TOOLS]: baseFooterConfig,
  [Paths.SETTINGS_REFERALS]: baseFooterConfig,
  [Paths.SETTINGS_PERSONAL_INFO]: baseFooterConfig,
  [Paths.WISHLIST]: baseFooterConfig,
  [Paths.MESSAGES]: baseFooterConfig,
  [Paths.ONBOARDING]: baseFooterConfig,
  [Paths.RESOURSES]: publicPagesFooterConfig,
  [Paths.RESOURCES_ALL_TOPICS]: publicPagesFooterConfig,
  [Paths.RESOURCES_LEARNING]: publicPagesFooterConfig,
  [Paths.RESOURCES_AGENTS]: publicPagesFooterConfig,
  [Paths.CONTACT_US]: publicPagesFooterConfig,
  [Paths.HELP]: publicPagesFooterConfig,
  [Paths.HELP_ALL_TOPICS]: publicPagesFooterConfig,
  [Paths.PUBLISH]: publicPagesFooterConfig,
  [Paths.NEWS]: publicPagesFooterConfig,
  [Paths.NEWS_RESOURCES]: publicPagesFooterConfig,
  [Paths.ABOUT_US]: publicPagesFooterConfig,
};

export const mobileConfig: Record<Paths, MobileConfig | null> = {
  [Paths.BASE]: baseMobileConfig,
  [Paths.LOGIN]: null,
  [Paths.SIGNUP]: null,
  [Paths.LISTINGS]: baseMobileConfig,
  [Paths.SETTINGS]: baseMobileConfig,
  [Paths.SETTINGS_PROFILE]: baseMobileConfig,
  [Paths.SETTINGS_NOTIFICATIONS]: baseMobileConfig,
  [Paths.SETTINGS_PAYMENTS]: baseMobileConfig,
  [Paths.SETTINGS_TAXES]: baseMobileConfig,
  [Paths.SETTINGS_PREFERENCES]: baseMobileConfig,
  [Paths.SETTINGS_PRIVACY]: baseMobileConfig,
  [Paths.SETTINGS_SECURITY]: baseMobileConfig,
  [Paths.SETTINGS_TOOLS]: baseMobileConfig,
  [Paths.SETTINGS_REFERALS]: baseMobileConfig,
  [Paths.SETTINGS_PERSONAL_INFO]: baseMobileConfig,
  [Paths.WISHLIST]: baseMobileConfig,
  [Paths.MESSAGES]: baseMobileConfig,
  [Paths.ONBOARDING]: null,
  [Paths.RESOURSES]: null,
  [Paths.RESOURCES_ALL_TOPICS]: null,
  [Paths.RESOURCES_LEARNING]: null,
  [Paths.RESOURCES_AGENTS]: null,
  [Paths.CONTACT_US]: null,
  [Paths.HELP]: null,
  [Paths.HELP_ALL_TOPICS]: null,
  [Paths.PUBLISH]: null,
  [Paths.NEWS]: null,
  [Paths.NEWS_RESOURCES]: null,
  [Paths.ABOUT_US]: null,
};
