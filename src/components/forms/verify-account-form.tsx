import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui";
import OTPInput from "./form-fields/otp-input";
import { useResendVerificationCode } from "~/lib/cerberus/hooks";
import { useVerifyAccount } from "~/lib/cerberus/hooks";
import { cn } from "~/lib/utils";
import { VerificationMethod } from "~/lib/cerberus/types";

const validator = z.object({
  otp: z
    .string({ required_error: "OTP is required" })
    .min(6, { message: "OTP must contain at least 6 characters" }),
});

type VerifyAccountFormProps = {
  onSuccess: () => void;
  verificationMethod: VerificationMethod;
  className?: string;
};

const VerifyAccountForm: React.FC<VerifyAccountFormProps> = ({
  onSuccess,
  verificationMethod,
  className,
}) => {
  const form = useForm<z.infer<typeof validator>>({
    resolver: zodResolver(validator),
    defaultValues: {
      otp: "",
    },
  });

  const { mutate: resendVerificationCode, data: resendVerificationData } =
    useResendVerificationCode({});
  const { mutateAsync: verifyAccountAsync } = useVerifyAccount({});

  useEffect(() => {
    resendVerificationCode({ method: verificationMethod });
  }, []); // Empty dependency array to run only once

  const handleSubmit = async (values: z.infer<typeof validator>) => {
    if (resendVerificationData?.token) {
      await verifyAccountAsync({
        ...values,
        token: resendVerificationData?.token,
      });

      onSuccess();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn(
          "mb-6 flex flex-col items-center gap-8 px-8 md:px-10 md:py-6",
          className,
        )}
      >
        <h2 className="mt-8 text-2xl font-bold">Verify your account</h2>
        <span className="text-muted-foreground">
          {`We have sent you a One-Time-Password to validate your ${verificationMethod}.`}
        </span>
        <div className="mx-auto my-4 flex flex-col">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <OTPInput {...field} maxLength={6} />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <Button className="ml-auto mt-4 min-w-40" type="submit">
          Verify
        </Button>
      </form>
    </Form>
  );
};

export default VerifyAccountForm;
