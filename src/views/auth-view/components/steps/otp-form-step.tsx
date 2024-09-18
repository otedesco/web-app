import React, { memo, useContext, useEffect } from "react";
import { ChevronRightIcon, Loader2 } from "lucide-react";
import {
  Button,
  Label,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui";
import AnimatedStepContainer from "../utils/animated-step-container";
import { useTranslations } from "next-intl";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { ControllerRenderProps, useForm } from "react-hook-form";
import {
  VerifyAccountStepForm,
  verifyAccountStepValidator,
} from "../../validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useVerifyAccount } from "~/lib/hooks/auth/useVerifyAccount";
import { AuthContext } from "../../context";
import { toast } from "sonner";

// Define a component for OTP Input
const OTPInput: React.FC<
  {
    maxLength: number;
  } & ControllerRenderProps
> = ({ maxLength, ...field }) => (
  <InputOTP {...field} maxLength={maxLength}>
    <InputOTPGroup>
      {Array.from({ length: maxLength }).map((_, index) => (
        <InputOTPSlot index={index} />
      ))}
    </InputOTPGroup>
  </InputOTP>
);

export interface OTPStepProps {
  onSubmit: ({}: Record<string, any>) => void;
}

// TODO: Implement resend otp

const OTPStep = (props: OTPStepProps) => {
  const { verifyAccount, isPending, isSuccess, isError } = useVerifyAccount({});
  const { formState } = useContext(AuthContext);
  const form = useForm<VerifyAccountStepForm>({
    resolver: zodResolver(verifyAccountStepValidator),
    defaultValues: {
      otp: "",
    },
  });
  const t = useTranslations("views->auth-view");

  const handleSubmit = (values: VerifyAccountStepForm) => {
    verifyAccount({ token: formState.token, otp: values.otp });
  };

  useEffect(() => {
    if (isSuccess) {
      props.onSubmit({});
    }
    // TODO: Implement error toast when isError on useVerifyAccount hook
    if (isError) {
      toast.error(t("Verify OTP failed"));
    }
  }, [isSuccess]);

  return (
    <AnimatedStepContainer className="flex flex-col items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full max-w-[250px] space-y-4"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="ml-1 space-y-2">
                <Label className="block text-center text-sm">
                  {t("Enter OTP")}
                </Label>
                <FormControl>
                  <OTPInput {...field} maxLength={6} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant={isPending ? "ghost" : "default"}
            className="group w-full"
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>
                {t("Verify OTP")}
                <ChevronRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </AnimatedStepContainer>
  );
};

export default memo(OTPStep);
