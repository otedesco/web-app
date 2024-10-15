import SkeletonWrapper from "~/components/skeleton-wrapper";
import {
  FieldFormProps,
  Fields,
  FieldTriggerProps,
  FieldValueProps,
} from "../types";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "~/components/ui";

import { z } from "zod";
import { FieldValues, FormState, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "~/lib/utils";
import { useAccountDetails } from "~/lib/hooks/useAccountDetails";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { useCallback } from "react";

export const key = Fields.govermentId;

export const Value: React.FC<FieldValueProps> = ({ isLoading, data }) => {
  const defaultValue = "Not provided";

  return (
    <SkeletonWrapper className="mt-2 h-5 w-36" isDataReady={!isLoading}>
      <span className="text-muted-foreground">
        {data?.govermentId ? "Provided" : defaultValue}
      </span>
    </SkeletonWrapper>
  );
};

const validator = z.object({
  govermentId: z.string({ required_error: "Goverment ID is required" }).min(3),
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

export const Component: React.FC<FieldFormProps> = ({
  data,
  isLoading,
  onSubmit,
}) => {
  const { updateAccountDetailsAsync, isPending } = useAccountDetails({});

  const form = useForm<z.infer<typeof validator>>({
    resolver: zodResolver(validator),
  });

  const handleSubmit = async (values: z.infer<typeof validator>) => {
    await updateAccountDetailsAsync(values);

    return onSubmit();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col"
      >
        <span className="text-muted-foreground">
          We’ll need to verify your ID before you can publish new properties.
        </span>
        <div className="mt-4 md:w-2/3">
          <Field
            name="govermentId"
            label="Your passport or ID number"
            placeholder={data?.govermentId ?? ""}
            disabled={isLoading}
            state={form.formState}
          />
        </div>

        <Button className="mr-auto mt-4">Save And Continue</Button>
      </form>
    </Form>
  );
};

export const Trigger: React.FC<FieldTriggerProps> = (props) => {
  const { updateAccountDetailsAsync } = useAccountDetails({});

  const handleRemove = useCallback(async () => {
    await updateAccountDetailsAsync({ govermentId: null });
    return props.onSubmit();
  }, []);

  let Component = (
    <Button
      variant="link"
      onClick={() => props.onClick(props.isOpen ? null : key)}
      className="ml-auto items-start p-0 font-medium"
    >
      {props.isOpen ? "Cancel" : "Add"}
    </Button>
  );

  if (props.data?.govermentId) {
    Component = (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className="ml-auto items-start p-0 font-medium"
            variant="link"
          >
            Remove
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will remove your goverment ID, and will not be able to
              publish new properties.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemove}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return Component;
};
