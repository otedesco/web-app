import React, { memo } from "react";
import { type Control, useForm } from "react-hook-form";
import { AlertCircle, ChevronRightIcon } from "lucide-react";
import { Button, Input } from "~/components/ui";
import { useTranslations } from "next-intl";
import { signUpStepValidator, type SignUpStepForm } from "../../validators";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

interface TooltipFieldProps {
  name: "email" | "password" | "passwordConfirmation";
  label: string;
  placeholder?: string;
  control: Control<SignUpStepForm>;
  error?: string;
  type: "email" | "password";
}

const TooltipField: React.FC<TooltipFieldProps> = ({
  name,
  control,
  label,
  placeholder,
  error,
  type,
}) => {
  const t = useTranslations("views->auth-view");
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="space-y-1 sm:space-y-2">
          <FormLabel className="text-xs sm:text-sm">{t(label)}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                className="text-sm sm:text-base"
                placeholder={placeholder}
                type={type}
                {...field}
              />
              {error && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertCircle className="absolute right-3 top-3 h-4 w-4 text-red-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{error}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

const defaultValues = {
  email: "",
  password: "",
  passwordConfirmation: "",
};

export interface SignUpFormStepProps {
  onSubmit: (values: SignUpStepForm) => void;
}

const SignUpFormStep = ({ onSubmit }: SignUpFormStepProps) => {
  const form = useForm<SignUpStepForm>({
    resolver: zodResolver(signUpStepValidator),
    defaultValues,
  });

  const t = useTranslations("views->auth-view");

  return (
    <TooltipProvider>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 sm:space-y-4"
        >
          <TooltipField
            name="email"
            type="email"
            control={form.control}
            label="Email address"
            placeholder="you@example.com"
            error={form.formState.errors.email?.message}
          />
          <TooltipField
            name="password"
            control={form.control}
            label="Password"
            type="password"
            error={form.formState.errors.password?.message}
          />
          <TooltipField
            name="passwordConfirmation"
            control={form.control}
            label="Confirm Password"
            type="password"
            error={form.formState.errors.passwordConfirmation?.message}
          />
          <Button
            type="submit"
            className="group mt-2 w-full py-2 text-sm sm:py-3 sm:text-base"
          >
            {t("Sign Up")}
            <ChevronRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </form>
      </Form>
    </TooltipProvider>
  );
};

export default memo(SignUpFormStep);
