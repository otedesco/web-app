import Breadcrumb from "~/components/breadcrumbs";
import PageContainer from "~/components/layout/page-container";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PageContainer>
      <Breadcrumb
        className="min-w-screen sticky top-[64px] z-30 hidden min-h-8 md:block"
        basePath="/settings"
        showInBasePath={false}
      />
      {children}
    </PageContainer>
  );
};

export default SettingsLayout;
