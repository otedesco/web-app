export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="flex-grow">{children}</main>;
}