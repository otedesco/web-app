import SkeletonWrapper from "~/components/skeleton-wrapper";
import { Fields, FieldTriggerProps, FieldValueProps } from "../types";

import { Button } from "~/components/ui";
import { useCallback, useState } from "react";
import VerificationCodeDialog from "~/components/dialogs/verification-code-dialog";
import {
  VerificationMethod,
  VerificationStatusEnum,
} from "~/lib/cerberus/types";

export const key = Fields.emailAddress;

export const Value: React.FC<FieldValueProps> = ({ isLoading, data }) => {
  const defaultValue = "Not verified";
  return (
    <SkeletonWrapper className="mt-2 h-5 w-36" isDataReady={!isLoading}>
      <span className="text-muted-foreground">
        {data?.emailVerificationStatus === VerificationStatusEnum.VERIFIED
          ? "Verified"
          : defaultValue}
      </span>
    </SkeletonWrapper>
  );
};

export const Component: React.FC = () => {
  return null;
};

export const Trigger: React.FC<FieldTriggerProps> = ({ data, onSubmit }) => {
  const [isOpen, setOpenModal] = useState<boolean>(false);
  const handleFinish = useCallback(() => {
    setOpenModal(false);
    return onSubmit();
  }, [onSubmit]);

  const DialogTrigger = (
    <Button className="ml-auto items-start p-0 font-medium" variant="link">
      Verify
    </Button>
  );

  if (data?.emailVerificationStatus === VerificationStatusEnum.VERIFIED) {
    return null;
  }

  return (
    <VerificationCodeDialog
      verificationMethod={VerificationMethod.EMAIL}
      Trigger={DialogTrigger}
      isOpen={isOpen}
      setOpen={setOpenModal}
      onFinish={handleFinish}
    />
  );
};
