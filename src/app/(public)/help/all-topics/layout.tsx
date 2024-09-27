import PageContainer from "~/components/layout/page-container";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageContainer>{children}</PageContainer>;
}
