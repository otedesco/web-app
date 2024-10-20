"use client";

import { useLayoutEffect, useState } from "react";
import PageContainer from "~/components/layout/page-container";
import { AuthenticationDialog } from "~/components/dialogs";
import { useAppSelector } from "~/state/hooks";
import { selectCurrentProfile } from "~/state/features/profile/selectors";

export default function MarketingRentPage() {
  const [isOpen, setIsOpen] = useState(false);
  const currentProfile = useAppSelector(selectCurrentProfile);

  // Open Authentication Dialog if user is not authenticated
  useLayoutEffect(() => {
    if (!currentProfile.id) {
      setIsOpen(true);
    }
  }, [currentProfile.id]);

  const handleFinish = () => {
    setIsOpen(false);
  };

  return (
    <PageContainer>
      <h1>onboarding</h1>
      <AuthenticationDialog isOpen={isOpen} onFinish={handleFinish} />
    </PageContainer>
  );
}
