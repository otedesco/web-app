import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui";

const MobileTopNavBar = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-10 flex items-center justify-between bg-background p-2 shadow-md md:hidden">
      <Link href="/settings">
        <ChevronLeft className="h-6 w-6" />
      </Link>
      <Link href="/settings/profile?edit=true">
        <Button variant="link" className="text-md">
          Edit
        </Button>
      </Link>
    </nav>
  );
};

export default MobileTopNavBar;
