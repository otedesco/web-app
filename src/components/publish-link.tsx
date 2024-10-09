import Link from "next/link";
import { Button } from "./ui";
import { useAppSelector } from "~/state/hooks";
import { selectSelectedRole } from "~/state/features/profile/selectors";
import { useTranslations } from "next-intl";

const PublishLink = ({ asText = false }: { asText?: boolean }) => {
  const t = useTranslations("components->publish-link");
  const selectedRole = useAppSelector(selectSelectedRole);

  const label = t(
    selectedRole ? "Publish a Property" : "Ready to become an Agent?",
  );

  if (asText) {
    return <span className="mr-4 hidden sm:inline">{label}</span>;
  }
  return (
    <Link href="/publish">
      <span className="mr-2 hidden sm:inline">{label}</span>
    </Link>
  );
};

export default PublishLink;
