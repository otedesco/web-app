"use client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "../ui";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const MobileTopNavBar = ({
  showRightComponent,
}: {
  showRightComponent: boolean;
}) => {
  const router = useRouter();
  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <nav className="fixed left-0 right-0 top-0 z-30 flex items-center justify-between bg-background p-2 shadow-md md:hidden">
      <Button variant="ghost" onClick={handleBack}>
        <ChevronLeft className="h-6 w-6" />
      </Button>
      {showRightComponent && (
        <Link href="/settings/profile?edit=true">
          <Button variant="link" className="text-md">
            Edit
          </Button>
        </Link>
      )}
    </nav>
  );
};

export default MobileTopNavBar;
