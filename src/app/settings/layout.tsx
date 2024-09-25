import Breadcrumb from "~/components/breadcrumbs";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Breadcrumb
        className="min-w-screen sticky top-16 z-10 hidden min-h-8 bg-background backdrop-blur-md md:block"
        basePath="/settings"
        showInBasePath={false}
      />
      {children}
    </main>
  );
};

export default SettingsLayout;
