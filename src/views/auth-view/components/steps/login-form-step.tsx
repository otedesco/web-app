import React, { memo, useEffect } from "react";
import { ChevronRightIcon, Loader2 } from "lucide-react";
import { Button, Input } from "~/components/ui";
import { useTranslations } from "next-intl";
import { type Control, useForm } from "react-hook-form";
import { type SignInStepForm, signInStepValidator } from "../../validators";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { useSignIn } from "~/lib/hooks/useSignIn";
import { toast } from "sonner";

interface FormFieldProps {
  name: "email" | "password";
  label: string;
  placeholder?: string;
  control: Control<SignInStepForm>;
  error?: string;
  type: "email" | "password";
}

const Field: React.FC<FormFieldProps> = ({
  name,
  control,
  label,
  placeholder,
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
            <Input
              className="text-sm sm:text-base"
              placeholder={placeholder}
              type={type}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export interface SignInStepProps {
  onSubmit: (values: Record<string, any>) => void;
}

const defaultValues = {
  email: "",
  password: "",
};

const LogInFormStep: React.FC<SignInStepProps> = (props) => {
  const t = useTranslations("views->auth-view");
  const { signIn, isPending } = useSignIn({
    onSuccess: () => props.onSubmit({}),
    onError: () => toast.error(t("Sign in failed")),
  });
  const form = useForm<SignInStepForm>({
    resolver: zodResolver(signInStepValidator),
    defaultValues,
  });

  const handleSubmit = (values: SignInStepForm) => {
    signIn({ email: values.email, password: values.password });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-3 sm:space-y-4"
      >
        <Field
          name="email"
          type="email"
          control={form.control}
          label="Email address"
          placeholder="you@example.com"
        />
        <Field
          name="password"
          control={form.control}
          label="Password"
          type="password"
        />
        <Button
          type="submit"
          variant={isPending ? "ghost" : "default"}
          className="group mt-2 w-full py-2 text-sm sm:py-3 sm:text-base"
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>
              {t("Log In")}
              <ChevronRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default memo(LogInFormStep);
