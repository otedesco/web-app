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

export const key = Fields.emailAddress;

export const useResendEmailVerification = (
  params: MutationConfig<unknown, unknown>,
) => {
  const mutation = useMutation({
    ...params,
    mutationFn: async () => {
      const response = await fetch("/api/account/resend-verification-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) return response.json() as Promise<{ token: string }>;
    },
  });

  return mutation;
};

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

const OTPInput: React.FC<
  {
    maxLength: number;
  } & ControllerRenderProps
> = ({ maxLength, ...field }) => (
  <InputOTP {...field} maxLength={maxLength}>
    <InputOTPGroup>
      {Array.from({ length: maxLength }).map((_, index) => (
        <InputOTPSlot key={index} index={index} />
      ))}
    </InputOTPGroup>
  </InputOTP>
);

const validator = z.object({
  otp: z
    .string({ required_error: "OTP is required" })
    .min(6, { message: "OTP must contain at least 6 caracters" }),
});

export const Trigger: React.FC<FieldTriggerProps> = ({ data, onSubmit }) => {
  const [isOpen, setOpenModal] = useState<boolean>(false);

  const { mutate: resendVerificationEmail, data: resendVerificationEmailData } =
    useResendEmailVerification({});
  const { verifyAccountAsync } = useVerifyAccount({});

  const form = useForm<z.infer<typeof validator>>({
    resolver: zodResolver(validator),
    defaultValues: {
      otp: "",
    },
  });

  const handleOpen = async () => {
    if (!isOpen) {
      resendVerificationEmail();
    }
    setOpenModal(!isOpen);
  };

  const handleSubmit = async (values: z.infer<typeof validator>) => {
    if (resendVerificationEmailData?.token) {
      await verifyAccountAsync({
        ...values,
        token: resendVerificationEmailData?.token,
      });
    }

    return onSubmit();
  };

  if (data?.emailVerificationStatus === VerificationStatusEnum.VERIFIED) {
    return null;
  }

  const DialogTrigger = (
    <Button className="ml-auto items-start p-0 font-medium" variant="link">
      Verify
    </Button>
  );

  const Field: ControllerProps<z.infer<typeof validator>>["render"] = ({
    field,
    fieldState,
  }) => {
    const hasError = fieldState.invalid;
    const error = fieldState.error;
    return (
      <FormItem className="ml-1 space-y-2">
        <Label
          className={cn(
            "block text-center text-sm",
            hasError && "text-red-500",
          )}
        >
          Enter OTP
        </Label>

        <FormControl>
          <OTPInput {...field} maxLength={6} />
        </FormControl>
        {hasError && error && (
          <FormMessage className="text-xs text-red-500" id="error">
            {error.message}
          </FormMessage>
        )}
      </FormItem>
    );
  };

  const Title = (
    <h3 className="px-8 text-lg font-semibold">Verify your email</h3>
  );

  const Content = (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col px-8"
      >
        <span className="text-muted-foreground">
          We have sent you a One-Time-Password to validate your email.
        </span>
        <div className="mx-auto my-4 flex flex-col">
          <FormField control={form.control} name="otp" render={Field} />
        </div>

        <Button className="ml-auto mt-4 min-w-40">Verify</Button>
      </form>
    </Form>
  );

  return (
    <ResponsiveDialog
      asChild
      title={Title}
      Trigger={DialogTrigger}
      isOpen={isOpen}
      onOpenChange={handleOpen}
      Content={Content}
    />
  );
};
