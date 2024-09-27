import PageContainer from "~/components/layout/page-container";

export default function ResourceCenterTopicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageContainer>{children}</PageContainer>;
}
