import React, { memo } from "react";
import { ChevronRightIcon } from "lucide-react";
import {
  Button,
  Label,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui";
import AnimatedStepContainer from "../utils/animated-step-container";
import { useTranslations } from "next-intl";

// Define a component for OTP Input
const OTPInput: React.FC<{ maxLength: number }> = ({ maxLength }) => (
  <InputOTP maxLength={maxLength}>
    {Array.from({ length: maxLength }).map((_, index) => (
      <InputOTPGroup key={index}>
        <InputOTPSlot index={index} />
      </InputOTPGroup>
    ))}
  </InputOTP>
);

const OTPStep: React.FC = () => {
  const t = useTranslations("views->auth-view");

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Implement OTP verification logic here
    console.log("Form submitted");
  };

  return (
    <AnimatedStepContainer>
      <form onSubmit={handleSubmit} className="w-full max-w-[250px] space-y-4">
        <div className="space-y-2">
          <Label htmlFor="otp" className="block text-center text-sm">
            {t("Enter OTP")}
          </Label>
          <OTPInput maxLength={6} />
        </div>
        <Button type="submit" className="group w-full">
          {t("Verify OTP")}
          <ChevronRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </form>
    </AnimatedStepContainer>
  );
};

export default memo(OTPStep);
