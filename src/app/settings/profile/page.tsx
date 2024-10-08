import MobileTopNavBar from "~/components/navigation-menu/mobile-top-navigation-bar";
import InfoCards from "./components/info-cards";
import InfoContent from "./components/info-content";
import { Button } from "~/components/ui";

const ProfileLayout = ({
  searchParams,
}: {
  searchParams: { edit: boolean };
}) => {
  return (
    <>
      <MobileTopNavBar />
      <div className="container mx-auto px-4 pt-20 md:pt-0">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          <InfoCards isEditMode={searchParams.edit} />
          <InfoContent isEditMode={searchParams.edit} />
        </div>
      </div>
      {searchParams.edit && (
        <div className="sticky bottom-14 left-0 right-0 flex bg-background py-6 md:bottom-0 md:justify-end md:py-8">
          <Button className="ml-auto min-w-full md:min-w-36">Done</Button>
        </div>
      )}
    </>
  );
};

export default ProfileLayout;
