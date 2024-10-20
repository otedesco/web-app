import {
  FormLabel,
  FormMessage,
  FormControl,
  FormItem,
  FormField,
} from "~/components/ui/form";
import { cn } from "~/lib/utils";
import { PasswordInput } from "~/components/inputs/password";
import { FieldValues, FormState } from "react-hook-form";

interface PasswordFieldProps {
  state: FormState<FieldValues>;
  name?: string;
  label?: string;
  placeholder?: string;
  className?: string;
}

const PasswordField = ({
  state,
  name = "password",
  label = "Password",
  placeholder = "",
  className,
  ...props
}: PasswordFieldProps) => {
  const { errors } = state;
  const hasError = !!errors[name];

  return (
    <FormField
      name={name}
      {...props}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={cn("text-sm")}>{label}</FormLabel>
          <FormControl>
            <PasswordInput
              placeholder={placeholder}
              className={cn(
                "text-sm sm:text-base",
                hasError && "border-red-500",
                className,
              )}
              {...field}
            />
          </FormControl>
          <FormMessage
            className={cn(
              "text-xs text-red-500 opacity-0",
              hasError && "opacity-1",
            )}
          >
            {(errors[name]?.message as string) ?? name}
          </FormMessage>
        </FormItem>
      )}
    />
  );
};

export default PasswordField;
