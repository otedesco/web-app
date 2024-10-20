import SkeletonWrapper from "~/components/skeleton-wrapper";
import {
  FieldFormProps,
  Fields,
  FieldTriggerProps,
  FieldValueProps,
} from "../types";
import { Button, Form, Input, Label } from "~/components/ui";
import { useCallback } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "~/components/inputs/address";

import { LocationProvider } from "~/components/inputs/address/context";
import { useAccountDetails } from "~/lib/cerberus/hooks";

export const key = Fields.address;

export const Value: React.FC<FieldValueProps> = ({ isLoading, data }) => {
  const defaultValue = "Not provided";

  const haveData = data?.country && data?.state && data?.city && data?.address;

  return (
    <SkeletonWrapper className="mt-2 h-5 w-36" isDataReady={!isLoading}>
      <span className="text-muted-foreground">
        {haveData ? data?.address : defaultValue}
      </span>
    </SkeletonWrapper>
  );
};

const validator = z.object({
  country: z.string(),
  state: z.string(),
  city: z.string(),
  address: z.string(),
  zipcode: z.string(),
});

export const Component: React.FC<FieldFormProps> = ({
  data,
  isLoading,
  onSubmit,
}) => {
  const { mutateAsync, isPending } = useAccountDetails({});

  const form = useForm<z.infer<typeof validator>>({
    resolver: zodResolver(validator),
  });

  const handleSubmit = async (values: z.infer<typeof validator>) => {
    await mutateAsync(values);

    return onSubmit();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col"
      >
        <span className="text-muted-foreground">
          Use a permanent address where you can receive mail.
        </span>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <LocationProvider>
            <div className="flex flex-col text-xs">
              <Label className="text-sm sm:text-base">Country</Label>
              <CountrySelect
                disabled={isLoading}
                currentValue={data?.country}
                onSelect={(country) => form.setValue("country", country.name)}
                className="mt-2"
              />
            </div>
            <div className="col-span-2 flex flex-col text-xs">
              <Label className="text-sm sm:text-base">Address</Label>
              <Input
                type="text"
                className="mt-2"
                onChange={(v) => form.setValue("address", v.target.value)}
                placeholder={data?.address ?? ""}
              />
            </div>
            <div className="flex flex-col text-xs">
              <Label className="text-sm sm:text-base">State</Label>
              <StateSelect
                disabled={isLoading}
                currentValue={data?.state}
                className="mt-2"
                onSelect={(state) => form.setValue("state", state.name)}
              />
            </div>
            <div className="flex flex-col text-xs">
              <Label className="text-sm sm:text-base">City</Label>
              <CitySelect
                disabled={isLoading}
                className="mt-2"
                currentValue={data?.city}
                onSelect={(city) => form.setValue("city", city.name)}
              />
            </div>
            <div className="flex flex-col">
              <Label className="text-sm sm:text-base">ZIP code</Label>
              <Input
                type="text"
                className="mt-2"
                placeholder={data?.zipcode ?? ""}
                onChange={(v) => form.setValue("zipcode", v.target.value)}
              />
            </div>
          </LocationProvider>
        </div>

        <Button className="mr-auto mt-4" disabled={isPending}>
          Save and continue
        </Button>
      </form>
    </Form>
  );
};

export const Trigger: React.FC<FieldTriggerProps> = (props) => {
  let Label = "Add";
  if (
    props.data?.address ||
    props.data?.country ||
    props.data?.state ||
    props.data?.city
  ) {
    Label = "Edit";
  }
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
