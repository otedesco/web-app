import PageContainer from "~/components/layout/page-container";

export default function ResourceCenterAgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageContainer>{children}</PageContainer>;
}
