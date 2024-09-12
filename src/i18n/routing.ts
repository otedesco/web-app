// import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
// import { defineRouting } from "next-intl/routing";

// const locales = ["en", "es"] as const;

// const pathnames = {
//   "/": "/",
//   "/auth/[tab]": {
//     en: "/auth/[tab]",
//     es: "/auth/[tab]",
//   },
//   "/wishlist": {
//     en: "/wishlist",
//     es: "/favoritos",
//   },
// } as const;

// export type Pathnames = keyof typeof routing.pathnames;
// export type Locale = (typeof locales)[number];

// export const defaultLocale: Locale = "es";

// export const routing = defineRouting({
//   locales,
//   defaultLocale,
//   pathnames,
// });

// export const { Link, getPathname, redirect, usePathname, useRouter } =
//   createLocalizedPathnamesNavigation(routing);
