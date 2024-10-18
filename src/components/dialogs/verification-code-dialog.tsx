import ResponsiveDialog from "../responsive-dialog";
import {
  ControllerProps,
  ControllerRenderProps,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
} from "../ui/form";
import { Button, InputOTP, InputOTPGroup, InputOTPSlot, Label } from "../ui";
import { cn } from "~/lib/utils";
import { useResendVerificationCode } from "./hooks/useResendVerificationCode";
import { useEffect } from "react";
import { useVerifyAccount } from "~/lib/hooks/useVerifyAccount";

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

const VerificationCodeDialog = ({
  verificationMethod,
  Trigger,
  onFinish,
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  onFinish: () => void;
  Trigger: React.ReactNode;
  verificationMethod: "email" | "phone";
  setOpen: (open: boolean) => void;
}) => {
  const { mutate: resendVerificationCode, data: resendVerificationData } =
    useResendVerificationCode({});

  const { verifyAccountAsync } = useVerifyAccount({});
  const form = useForm<z.infer<typeof validator>>({
    resolver: zodResolver(validator),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      resendVerificationCode(verificationMethod);
    }
  }, [isOpen, resendVerificationCode, verificationMethod]);

  const handleSubmit = async (values: z.infer<typeof validator>) => {
    if (resendVerificationData?.token) {
      await verifyAccountAsync({
        ...values,
        token: resendVerificationData?.token,
      });
      onFinish();
    }
  };

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
    <h3 className="px-8 text-lg font-semibold">{`Verify your ${verificationMethod}`}</h3>
  );

  const Content = (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col px-8"
      >
        <span className="text-muted-foreground">
          {`We have sent you a One-Time-Password to validate your ${verificationMethod}.`}
        </span>
        <div className="mx-auto my-4 flex flex-col">
          <FormField control={form.control} name="otp" render={Field} />
        </div>

        <Button
          className="ml-auto mt-4 min-w-40"
          onClick={form.handleSubmit(handleSubmit)}
        >
          Verify
        </Button>
      </form>
    </Form>
  );
  return (
    <ResponsiveDialog
      asChild
      title={Title}
      Trigger={Trigger}
      isOpen={isOpen}
      Content={Content}
      onOpenChange={setOpen}
    />
  );
};

export default VerificationCodeDialog;
