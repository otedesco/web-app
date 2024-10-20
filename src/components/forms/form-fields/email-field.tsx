import { FormControl, FormLabel, FormMessage } from "~/components/ui/form";
import { FieldValues, FormState } from "react-hook-form";
import { FormField, FormItem, Input } from "~/components/ui";
import { cn } from "~/lib/utils";

interface EmailFieldProps {
  state: FormState<FieldValues>;
  name?: string;
  label?: string;
  placeholder?: string;
  className?: string;
}

const EmailField = ({
  state,
  name = "email",
  label = "Email",
  placeholder = "Email",
  className,
  ...props
}: EmailFieldProps) => {
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
            <Input
              type="email"
              className={cn(
                "text-sm sm:text-base",
                hasError && "border-red-500",
                className,
              )}
              placeholder={placeholder}
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

export default EmailField;
