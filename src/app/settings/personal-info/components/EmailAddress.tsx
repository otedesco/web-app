import SkeletonWrapper from "~/components/skeleton-wrapper";
import { Fields, FieldTriggerProps, FieldValueProps } from "../types";
import { useVerifyAccount } from "~/lib/hooks/useVerifyAccount";
import { VerificationStatusEnum } from "~/lib/services/cerberus/types";
import { useMutation } from "@tanstack/react-query";
import { MutationConfig } from "~/lib/types/react-query";
import ResponsiveDialog from "~/components/responsive-dialog";
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  Label,
  Form,
  FormMessage,
} from "~/components/ui";
import { useCallback, useState } from "react";
import {
  ControllerProps,
  ControllerRenderProps,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "~/lib/utils";
import VerificationCodeDialog from "~/components/dialogs/verification-code-dialog";

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

// const OTPInput: React.FC<
//   {
//     maxLength: number;
//   } & ControllerRenderProps
// > = ({ maxLength, ...field }) => (
//   <InputOTP {...field} maxLength={maxLength}>
//     <InputOTPGroup>
//       {Array.from({ length: maxLength }).map((_, index) => (
//         <InputOTPSlot key={index} index={index} />
//       ))}
//     </InputOTPGroup>
//   </InputOTP>
// );

// const validator = z.object({
//   otp: z
//     .string({ required_error: "OTP is required" })
//     .min(6, { message: "OTP must contain at least 6 caracters" }),
// });

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
      verificationMethod="email"
      Trigger={DialogTrigger}
      isOpen={isOpen}
      setOpen={setOpenModal}
      onFinish={handleFinish}
    />
  );
};
