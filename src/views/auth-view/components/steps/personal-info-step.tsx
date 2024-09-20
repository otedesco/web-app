import React, { memo, useCallback, useContext } from "react";
import { ChevronRightIcon, Loader2 } from "lucide-react";
import { Button, Input } from "~/components/ui";
import AnimatedStepContainer from "../utils/animated-step-container";
import { useTranslations } from "next-intl";
import { type Control, useForm } from "react-hook-form";
import {
  type PersonalInfoStepForm,
  personalInfoStepValidator,
} from "../../validators";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { useSignUp } from "~/lib/hooks/useSignUp";
// import { type Account, type SignUpRequest } from "~/lib/api/auth/types";
import { AuthContext } from "../../context";
import { toast } from "sonner";
import _ from "lodash";
import { Account, SignUpRequest } from "~/lib/services/cerberus";

const signUpKeys = [
  "email",
  "password",
  "passwordConfirmation",
  "name",
  "lastname",
];

const defaultValues = {
  name: "",
  lastname: "",
};

interface FieldProps {
  name: "name" | "lastname";
  label: string;
  placeholder?: string;
  control: Control<PersonalInfoStepForm>;
  isPending: boolean;
}

export interface PersonalInfoStepProps {
  onSubmit: (values: { token: string }) => void;
}

const Field: React.FC<FieldProps> = ({
  name,
  control,
  label,
  placeholder,
  isPending,
}) => {
  const t = useTranslations("views->auth-view");

  return (
    <FormField
      name={name}
      control={control}
      disabled={isPending}
      render={({ field }) => (
        <FormItem className="space-y-1 sm:space-y-2">
          <FormLabel className="text-xs sm:text-sm">{t(label)}</FormLabel>
          <FormControl>
            <Input
              className="text-sm sm:text-base"
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

const PersonalInfoStep = ({ onSubmit }: PersonalInfoStepProps) => {
  const { formState } = useContext(AuthContext);
  const t = useTranslations("views->auth-view");

  const form = useForm<PersonalInfoStepForm>({
    resolver: zodResolver(personalInfoStepValidator),
    defaultValues,
  });

  const onSuccess = useCallback(
    (data: Account) => {
      if (data?.token) onSubmit({ token: data.token });
    },
    [onSubmit],
  );

  const onError = useCallback(() => {
    toast.error(t("Sign up failed"));
  }, [t]);

  const { signUp, isPending } = useSignUp({ onSuccess, onError });

  const handleSubmit = useCallback(
    (values: PersonalInfoStepForm) => {
      const payload = _.pick({ ...formState, ...values }, signUpKeys);
      signUp(payload as SignUpRequest);
    },
    [formState, signUp],
  );

  return (
    <AnimatedStepContainer className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-3 sm:space-y-4"
        >
          <div className="space-y-2">
            <Field
              name="name"
              control={form.control}
              label="First name"
              placeholder="Jhon"
              isPending={isPending}
            />
            <Field
              name="lastname"
              placeholder="Doe"
              control={form.control}
              label="Last name"
              isPending={isPending}
            />
          </div>

          <Button
            type="submit"
            variant={isPending ? "ghost" : "default"}
            className="group w-full"
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>
                {t("Continue")}
                <ChevronRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </AnimatedStepContainer>
  );
};

export default memo(PersonalInfoStep);
