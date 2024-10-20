"use client";

import * as React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Input, type InputProps } from "~/components/ui/input";
import { cn } from "~/lib/utils";

export interface PasswordInputProps extends InputProps {
  showToggle?: boolean;
  toggleClassName?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showToggle = true, toggleClassName, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isDisabled = !props.value || props.disabled;

    const togglePassword = React.useCallback(() => {
      setShowPassword((prev) => !prev);
    }, []);

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn(
            "hide-password-toggle",
            showToggle && "pr-10",
            className,
          )}
          ref={ref}
          {...props}
        />
        {showToggle && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={cn(
              "absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent",
              toggleClassName,
            )}
            onClick={togglePassword}
            disabled={isDisabled}
          >
            {showPassword && !isDisabled ? (
              <EyeIcon className="h-4 w-4" aria-hidden="true" />
            ) : (
              <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
            )}
            <span className="sr-only">
              {showPassword ? "Hide password" : "Show password"}
            </span>
          </Button>
        )}
        <style>{`
          .hide-password-toggle::-ms-reveal,
          .hide-password-toggle::-ms-clear {
            visibility: hidden;
            pointer-events: none;
            display: none;
          }
        `}</style>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
