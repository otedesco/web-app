"use client";

import { useMemo, useState } from "react";
import PageContainer from "~/components/layout/page-container";
import { AuthenticationDialog } from "~/components/dialogs";
import { useAppSelector } from "~/state/hooks";
import { selectRoles } from "~/state/features/profile/selectors";
import RolesCards from "./components/roles-cards";
import { RoleType } from "~/lib/cerberus/types";

import PropertyWizard from "~/components/property-wizard";

export default function PublishOnboardingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem("isLoggedIn") === "true",
  );
  const roles = useAppSelector(selectRoles);

  const hasNonBasicRole = useMemo(
    () => roles.some((role) => role.role !== RoleType.BASIC_USER),
    [roles],
  );

  const handleAuthenticationFinish = () => {
    setIsLoggedIn(true);
  };

  const Component = hasNonBasicRole ? <PropertyWizard /> : <RolesCards />;

  return (
    <PageContainer fullWidth className="mb-0">
      <AuthenticationDialog
        isOpen={!isLoggedIn}
        onFinish={handleAuthenticationFinish}
      />
      {Component}
    </PageContainer>
  );
}
