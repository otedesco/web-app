"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import AvatarField from "./form-fields/avatar-field";
import { cn } from "~/lib/utils";
import { useUpdateProfile } from "~/lib/cerberus/hooks";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  avatarUrl: z.string().optional(),
  name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
});

export function SetUpProfileForm({
  onSuccess,
  className,
}: {
  onSuccess?: () => void;
  className: string;
}) {
  const { isPending, mutateAsync } = useUpdateProfile({});
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await mutateAsync(values);
    onSuccess?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "mb-5 flex w-full flex-col items-center gap-8 px-8 md:px-10 md:py-6",
          className,
        )}
      >
        <AvatarField control={form.control} name="avatarUrl" />
        <div className="flex w-full flex-col gap-4 md:w-2/3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder={"enter your name"}
                    {...field}
                  />
                </FormControl>
                <FormMessage
                  className={cn(
                    "text-xs text-red-500 opacity-0",
                    form.formState.errors.name && "opacity-1",
                  )}
                >
                  {form.formState.errors.name?.message ?? "Name"}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder={"enter your last name"}
                    {...field}
                  />
                </FormControl>
                <FormMessage
                  className={cn(
                    "text-xs text-red-500 opacity-0",
                    form.formState.errors.lastname && "opacity-1",
                  )}
                >
                  {form.formState.errors.lastname?.message ?? "Last name"}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
        <Button className="mb-4 min-w-24" disabled={isPending}>
          {isPending ? <Loader2 className="animate-spin" /> : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
}
