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
import { useCallback, useState } from "react";
import { z } from "zod";
import { FieldValues, FormState, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "~/lib/utils";
import { PhoneInput } from "~/components/inputs/phone";
import ResponsiveDialog from "~/components/responsive-dialog";
import { useMutation } from "@tanstack/react-query";
import { MutationConfig } from "~/lib/types/react-query";
import { useUpdateAccount } from "../hooks/useUpdateAccount";
import { Loader2 } from "lucide-react";
import { VerificationCodeDialog } from "~/components/dialogs";
import _ from "lodash";
import { VerificationStatusEnum } from "~/lib/services/cerberus/types";

export const key = Fields.phoneNumber;

export const Value: React.FC<FieldValueProps> = ({ isLoading, data }) => {
  const defaultValue = "Not verified";

  return (
    <SkeletonWrapper className="mt-2 h-5 w-36" isDataReady={!isLoading}>
      <span className="text-muted-foreground">
        {data?.phoneVerificationStatus === VerificationStatusEnum.VERIFIED
          ? "Verified"
          : defaultValue}
      </span>
    </SkeletonWrapper>
  );
};

const validator = z.object({
  phoneNumber: z.string({ required_error: "Phone number is required" }).min(4),
});

export const Component: React.FC<FieldFormProps> = ({
  isLoading,
  onSubmit,
}) => {
  const [isOpen, setOpenModal] = useState<boolean>(false);
  const form = useForm<z.infer<typeof validator>>({
    resolver: zodResolver(validator),
  });

  const { mutateAsync: updateAccount, isPending: isUpdateAccountPending } =
    useUpdateAccount({});

  const handleSubmit = async (values: z.infer<typeof validator>) => {
    await updateAccount(values);
    setOpenModal(true);
  };

  const handleFinish = async () => {
    setOpenModal(false);
    return onSubmit();
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <span className="text-muted-foreground">
          We’ll need to verify your new phone number before you can publish new
          properties.
        </span>
        <div className="mt-4 gap-4">
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <PhoneInput
                    {...field}
                    onChange={field.onChange}
                    name="phoneNumber"
                    className="w-full max-w-[350px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <VerificationCodeDialog
          verificationMethod="phone"
          isOpen={isOpen}
          setOpen={setOpenModal}
          Trigger={
            <Button
              className="mr-auto mt-4 min-w-40"
              onClick={form.handleSubmit(handleSubmit)}
            >
              {isLoading || isUpdateAccountPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Save and verify"
              )}
            </Button>
          }
          onFinish={handleFinish}
        />
      </form>
    </Form>
  );
};

export const Trigger: React.FC<FieldTriggerProps> = (props) => {
  let Label = "Edit";
  if (props.isOpen) {
    Label = "Cancel";
  }

  const handleClick = useCallback(() => {
    props.onClick(props.isOpen ? null : key);
  }, [props]);

  return (
    <Button
      variant="link"
      onClick={handleClick}
      className="ml-auto items-start p-0 font-medium"
    >
      {Label}
    </Button>
  );
};
