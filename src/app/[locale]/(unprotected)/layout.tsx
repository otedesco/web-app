import { getMessages } from "next-intl/server";
import BaseTemplate from "~/components/templates/base-template";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  console.log(true);
  return (
    <>
      {children}
      {/* <div className="w-100 h-20 bg-black"></div> */}
    </>
  );
}
