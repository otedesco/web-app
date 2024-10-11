import { useQuery } from "@tanstack/react-query";
import { AccountDetails, ProfileDetails } from "../services/cerberus";

const queryFn = async (): Promise<AccountDetails> => {
  const response = await fetch(`/api/account/details`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to get profile details");
  }

  return response.json() as Promise<AccountDetails>;
};

export const useAccountDetails = ({}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["accountDetails"],
    queryFn: queryFn,
    enabled: true,
    refetchOnWindowFocus: true,
  });

  return {
    data,
    isLoading,
  };
};
