// "use client";

// import MobileTopNavBar from "~/components/navigation-menu/mobile-top-navigation-bar";
// import InfoCards from "./components/info-cards";
// import InfoContent from "./components/info-content";
// import { Button } from "~/components/ui";
// import { useCallback, useEffect, useState } from "react";
// import { ProfileDetails } from "~/lib/services/cerberus";
// import { useUpdateProfileDetails } from "~/lib/hooks/useUpdateProfileDetails";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";

// export type ProfileDetailsRequest = Partial<ProfileDetails> & {
//   avatarUrl: string;
// };

// const ProfilePage = ({ searchParams }: { searchParams: { edit: boolean } }) => {
//   const router = useRouter();
//   const { updateProfileDetailsAsync, isPending, isError, isSuccess } =
//     useUpdateProfileDetails({});

//   const [profileDetails, setProfileDetails] = useState<
//     Partial<ProfileDetailsRequest>
//   >({});

//   const handleProfileDetailsChange = useCallback(
//     (
//       key: keyof ProfileDetailsRequest,
//       value: ProfileDetailsRequest[keyof ProfileDetailsRequest],
//     ) => {
//       setProfileDetails((prev) => ({ ...prev, [key]: value }));
//     },
//     [],
//   );

//   const handleSubmit = useCallback(async () => {
//     await updateProfileDetailsAsync(profileDetails);
//   }, [profileDetails, updateProfileDetailsAsync]);

//   useEffect(() => {
//     if (isSuccess) {
//       router.push("/settings/profile");
//     }
//     if (isError) {
//       toast.error("Error updating profile details");
//     }
//   }, []);

//   return (
//     <>
//       <MobileTopNavBar showRightComponent={!searchParams.edit} />
//       <div className="container mx-auto px-4 pt-20 md:pt-0">
//         <div className="flex flex-col gap-8 md:flex-row md:gap-12">
//           <InfoCards
//             profileDetailsAvatar={profileDetails.avatarUrl}
//             isEditMode={searchParams.edit}
//             onProfileDetailsChange={handleProfileDetailsChange}
//           />
//           <InfoContent
//             isEditMode={searchParams.edit}
//             onProfileDetailsChange={handleProfileDetailsChange}
//             profileDetails={profileDetails}
//           />
//         </div>
//       </div>
//       {searchParams.edit && (
//         <div className="sticky bottom-14 left-0 right-0 flex bg-background py-6 md:bottom-0 md:justify-end md:py-8">
//           <Button
//             disabled={isPending}
//             className="ml-auto min-w-full md:min-w-36"
//           >
//             {isPending ? (
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             ) : (
//               "Done"
//             )}
//           </Button>
//         </div>
//       )}
//     </>
//   );
// };

// export default ProfilePage;

"use client";

import MobileTopNavBar from "~/components/navigation-menu/mobile-top-navigation-bar";
import InfoCards from "./components/info-cards";
import InfoContent from "./components/info-content";
import { Button } from "~/components/ui";
import { useCallback, useEffect, useState } from "react";
import { ProfileDetails } from "~/lib/services/cerberus";
import { useProfileDetails } from "~/lib/hooks/useProfileDetails";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export type ProfileDetailsRequest = Partial<ProfileDetails> & {
  avatarUrl: string;
};

const ProfilePage = ({ searchParams }: { searchParams: { edit: boolean } }) => {
  const router = useRouter();
  const { updateProfileDetailsAsync, isPending, isError, isSuccess, data } =
    useProfileDetails({});

  const [profileDetails, setProfileDetails] = useState<
    Partial<ProfileDetailsRequest>
  >({});

  const handleProfileDetailsChange = useCallback(
    (
      key: keyof ProfileDetailsRequest,
      value: ProfileDetailsRequest[keyof ProfileDetailsRequest],
    ) => {
      setProfileDetails((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleSubmit = useCallback(async () => {
    await updateProfileDetailsAsync(profileDetails);
  }, [profileDetails, updateProfileDetailsAsync]);

  useEffect(() => {
    if (isSuccess) {
      router.push("/settings/profile");
    }
    if (isError) {
      toast.error("Error updating profile details", {
        dismissible: true,
        closeButton: true,
        position: "top-right",
      });
    }
  }, [isSuccess, isError, router]);

  return (
    <>
      <MobileTopNavBar showRightComponent={!searchParams.edit} />
      <div className="relative">
        <div className="container mx-auto px-4 pt-20 md:pt-0">
          <div className="flex flex-col gap-8 md:flex-row md:gap-12">
            <InfoCards
              profileDetailsAvatar={profileDetails.avatarUrl}
              isEditMode={searchParams.edit}
              onProfileDetailsChange={handleProfileDetailsChange}
            />
            <InfoContent
              isEditMode={searchParams.edit}
              onProfileDetailsChange={handleProfileDetailsChange}
              profileDetails={{ ...data, ...profileDetails }}
            />
          </div>
        </div>
        {isPending && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm" />
        )}
      </div>
      {searchParams.edit && (
        <div className="sticky bottom-14 left-0 right-0 flex w-full bg-background py-4 md:bottom-0">
          <div className="flex w-full px-8 md:max-w-screen-xl md:justify-end">
            <Button
              onClick={handleSubmit}
              disabled={isPending}
              className="min-w-full md:min-w-36"
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Done"
              )}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
