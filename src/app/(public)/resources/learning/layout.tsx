import PageContainer from "~/components/layout/page-container";

export default function ResourceCenterLearningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageContainer>{children}</PageContainer>;
}
