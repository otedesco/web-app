import { useMutation } from "@tanstack/react-query";
import { Account } from "~/lib/services/cerberus/types";
import { MutationConfig } from "~/lib/types/react-query";

export const useUpdateAccount = (
  params: MutationConfig<unknown, unknown, Partial<Account>>,
) => {
  const mutation = useMutation({
    ...params,
    mutationFn: async (payload: Partial<Account>) => {
      await fetch("/api/account", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    },
  });

  return mutation;
};
