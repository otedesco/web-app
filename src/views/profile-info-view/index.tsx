import MobileTopNavBar from "~/components/navigation-menu/mobile-top-navigation-bar";
import ProfileInfoCard from "./components/profile-info-card";
import ProfileInfoContent from "./components/profile-info-content";

const ProfileInfoView = () => {
  return (
    <>
      <MobileTopNavBar />
      <div className="container mx-auto px-4 pt-20 md:pt-0">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          <div className="w-full pb-4 md:w-72">
            <ProfileInfoCard />
          </div>
          <div className="min-h-[calc(100vh-7rem)] flex-grow">
            <ProfileInfoContent />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInfoView;
