import SkeletonWrapper from "~/components/skeleton-wrapper";
import { FieldFormProps, FieldValueProps } from "../types";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
} from "~/components/ui";
import { useState } from "react";
import { z } from "zod";
import {
  Control,
  FieldValues,
  FormState,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "~/lib/utils";

export const Value: React.FC<FieldValueProps> = ({ isLoading, data }) => {
  const defaultValue = "Not provided";

  // const getValue = () =>
  //   data?.legalFirstname && data?.legalLastname
  //     ? `${data.legalFirstname} ${data.legalLastname}`
  //     : defaultValue;

  return (
    <SkeletonWrapper className="mt-2 h-5 w-36" isDataReady={!isLoading}>
      <span className="text-muted-foreground">{defaultValue}</span>
    </SkeletonWrapper>
  );
};

const validator = z.object({
  legalFirstname: z.string({ required_error: "First name is required" }).min(3),
  legalLastname: z.string({ required_error: "Last name is required" }).min(3),
});

interface FieldProps {
  name: keyof typeof validator._type;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  state: FormState<FieldValues>;
}

const Field: React.FC<FieldProps> = ({
  label,
  placeholder,
  state,
  ...props
}) => {
  const { errors } = state;

  const hasError = !!errors[props.name];

  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem className="space-y-1 sm:space-y-2">
          <FormLabel
            className={cn("text-sm sm:text-base", hasError && "text-red-500")}
          >
            {label}
          </FormLabel>
          <FormControl>
            <Input
              className={cn(
                "text-sm sm:text-base",
                hasError && "border-red-500",
              )}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          {hasError && (
            <FormMessage className="text-xs text-red-500" id="error">
              {errors[props.name]?.message as string}
            </FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};

export const Component: React.FC<FieldFormProps> = ({ data, isLoading }) => {
  const form = useForm<z.infer<typeof validator>>({
    resolver: zodResolver(validator),
  });

  const handleSubmit = (values: z.infer<typeof validator>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col"
      >
        <span className="text-muted-foreground">
          We’ll need to verify your new legal name before you can publish new
          properties.
        </span>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <Field
            name="legalFirstname"
            label="First name on ID"
            placeholder={data?.legalFirstname ?? ""}
            disabled={isLoading}
            state={form.formState}
          />
          <Field
            name="legalLastname"
            placeholder={data?.legalLastname ?? ""}
            label="Last name on ID"
            disabled={isLoading}
            state={form.formState}
          />
        </div>

        <Button className="mr-auto mt-4">Save And Continue</Button>
      </form>
    </Form>
  );
};

export const Trigger: React.FC = () => {
  return <></>;
};
