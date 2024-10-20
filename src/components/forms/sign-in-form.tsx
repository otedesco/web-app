import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Form } from "../ui";
import { cn } from "~/lib/utils";
import { useSignIn } from "~/lib/cerberus/hooks";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import EmailField from "./form-fields/email-field";
import PasswordField from "./form-fields/password-field";

const validator = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const SignInForm = ({
  onSuccess,
  className,
}: {
  onSuccess: () => void;
  className?: string;
}) => {
  const {
    mutateAsync: signInAsync,
    isPending,
    isError,
    isSuccess,
  } = useSignIn({});
  const form = useForm<z.infer<typeof validator>>({
    resolver: zodResolver(validator),
  });

  const handleSubmit = async (data: z.infer<typeof validator>) => {
    await signInAsync(data);
  };

  useEffect(() => {
    if (isError) {
      form.setError("email", {
        message: "Invalid email or password",
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
          "mb-5 flex flex-col items-center gap-8 px-8 md:px-10 md:py-6",
          className,
        )}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <h2 className="text-2xl font-bold">Welcome back</h2>
        <div className="flex w-full flex-col gap-4 md:w-2/3">
          <EmailField state={form.formState} />
          <PasswordField state={form.formState} />
        </div>

        <Button className="mb-4 min-w-24" disabled={isPending}>
          {isPending ? <Loader2 className="animate-spin" /> : "Sign In"}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
