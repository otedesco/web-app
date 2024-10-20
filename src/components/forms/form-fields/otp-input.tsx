import React from "react";
import { ControllerRenderProps } from "react-hook-form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "~/components/ui";

interface OTPInputProps extends ControllerRenderProps {
  maxLength: number;
}

const OTPInput: React.FC<OTPInputProps> = ({ maxLength, ...field }) => (
  <InputOTP {...field} maxLength={maxLength}>
    <InputOTPGroup>
      {Array.from({ length: maxLength }).map((_, index) => (
        <InputOTPSlot key={index} index={index} />
      ))}
    </InputOTPGroup>
  </InputOTP>
);

export default OTPInput;
