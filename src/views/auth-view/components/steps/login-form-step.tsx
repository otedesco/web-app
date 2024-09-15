import React, { memo } from "react";
import { ChevronRightIcon } from "lucide-react";
import { Button, Input, Label } from "~/components/ui";
import { useTranslations } from "next-intl";

// Define a reusable FormField component
interface FormFieldProps {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  type,
  label,
  placeholder,
}) => {
  const t = useTranslations("views->auth-view");

  return (
    <div className="space-y-1 sm:space-y-2">
      <Label htmlFor={id} className="text-xs sm:text-sm">
        {t(label)}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        required
        className="text-sm sm:text-base"
      />
    </div>
  );
};

const LogInFormStep: React.FC = () => {
  const t = useTranslations("views->auth-view");

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Implement login logic here
    console.log("Form submitted");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
      <FormField
        id="login-email"
        type="email"
        label="Email address"
        placeholder="you@example.com"
      />
      <FormField id="login-password" type="password" label="Password" />
      <Button
        type="submit"
        className="group mt-2 w-full py-2 text-sm sm:py-3 sm:text-base"
      >
        {t("Log In")}
        <ChevronRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </form>
  );
};

export default memo(LogInFormStep);
