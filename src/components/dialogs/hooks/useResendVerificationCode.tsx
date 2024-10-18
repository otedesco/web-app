import { useMutation } from "@tanstack/react-query";
import { MutationConfig } from "~/lib/types/react-query";

export const useResendVerificationCode = (
  params: MutationConfig<unknown, unknown, "email" | "phone">,
) => {
  const mutation = useMutation({
    ...params,
    mutationFn: async (method?: "email" | "phone") => {
      const response = await fetch("/api/account/resend-verification-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ method }),
      });

      if (response.ok) return response.json() as Promise<{ token: string }>;
    },
  });

  return mutation;
};
