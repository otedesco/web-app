import Breadcrumb from "~/components/breadcrumbs";
import PageContainer from "~/components/layout/page-container";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Breadcrumb
        className="min-w-screen sticky top-[64px] z-30 hidden min-h-8 md:block"
        basePath="/settings"
        showInBasePath={false}
      />
      <PageContainer>{children}</PageContainer>
    </>
  );
};

export default SettingsLayout;
