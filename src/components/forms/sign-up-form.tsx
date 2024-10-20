import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldValues, FormState } from "react-hook-form";
import { z } from "zod";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "../ui";
import { cn } from "~/lib/utils";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import EmailField from "./form-fields/email-field";
import PasswordField from "./form-fields/password-field";
import { useSignUp } from "~/lib/cerberus/hooks";

// Field component
interface FieldProps {
  state: FormState<FieldValues>;
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
}

const Field = ({
  state,
  name,
  label,
  placeholder = "",
  className,
  ...props
}: FieldProps) => {
  const { errors } = state;
  const hasError = !!errors[name];

  return (
    <FormField
      name={name}
      {...props}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={cn("text-sm sm:text-base")}>{label}</FormLabel>
          <FormControl>
            <Input
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

const validator = z
  .object({
    email: z.string({ required_error: "Email is required" }).email(),
    password: z.string({ required_error: "Password is required" }).min(8),
    passwordConfirmation: z
      .string({
        required_error: "Password confirmation is required",
      })
      .min(8),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const SignUpForm = ({
  onSuccess,
  className,
}: {
  onSuccess: () => void;
  className?: string;
}) => {
  const { mutateAsync, isPending, isError, isSuccess } = useSignUp({});
  const form = useForm<z.infer<typeof validator>>({
    resolver: zodResolver(validator),
  });

  const handleSubmit = async (data: z.infer<typeof validator>) => {
    await mutateAsync(data);
  };

  useEffect(() => {
    if (isError) {
      form.setError("email", {
        message: "An error occurred during sign up",
      });
    }
    if (isSuccess) {
      onSuccess();
    }
  }, [form, isError, isSuccess, onSuccess]);

  return (
    <Form {...form}>
      <form
        className={cn(
          "mb-6 flex flex-col items-center gap-8 px-8 md:px-10 md:py-6",
          className,
        )}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <h2 className="mt-8 text-2xl font-bold">Create an account</h2>
        <div className="flex w-full flex-col gap-2 md:w-2/3">
          <EmailField state={form.formState} />
          <PasswordField state={form.formState} />
          <PasswordField
            state={form.formState}
            name="passwordConfirmation"
            label="Confirm Password"
            placeholder="Confirm your password"
          />
          {/* <Field
            name="name"
            label="First Name"
            placeholder="Enter your first name"
            state={form.formState}
          />
          <Field
            name="lastname"
            label="Last Name"
            placeholder="Enter your last name"
            state={form.formState}
          /> */}
        </div>

        <Button className="mb-4 min-w-24" disabled={isPending}>
          {isPending ? <Loader2 className="animate-spin" /> : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
