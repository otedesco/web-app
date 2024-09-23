import Link from "next/link";
import { Button } from "../ui";
import { useAppSelector } from "~/state/hooks";
import { selectSelectedRole } from "~/state/features/profile/selectors";
import { useTranslations } from "next-intl";

const PublishLink = () => {
  const t = useTranslations("components->publish-link");
  const selectedRole = useAppSelector(selectSelectedRole);
  return (
    <Link href="/publish">
      <Button variant="ghost" className="text-sm font-medium">
        {t(selectedRole ? "Become an Agent" : "Publish a Property")}
      </Button>
    </Link>
  );
};

export default PublishLink;
