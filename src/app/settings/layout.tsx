import Breadcrumb from "~/components/breadcrumbs";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen flex-grow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          className="mt-4"
          basePath="/settings"
          showInBasePath={false}
        />
        {children}
      </div>
    </main>
  );
};

export default SettingsLayout;
