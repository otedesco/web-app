import { cn } from "~/lib/utils";

const PageContainer = ({
  children,
  className,
  fullWidth = false,
}: {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}) => (
  <main
    className={cn(
      fullWidth
        ? "mb-14 flex md:mb-0"
        : "mx-auto min-h-[calc(100vh-4rem)] max-w-screen-xl bg-background px-4 sm:px-6 lg:px-8",
      className,
    )}
  >
    {children}
  </main>
);

export default PageContainer;
