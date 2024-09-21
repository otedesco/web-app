import { cookies } from "next/headers";

export const getHeaders = () => {
  const accessToken = cookies().get("accessToken")?.value;

  const headers = new Headers();
  if (accessToken) {
    headers.append("Authorization", `Bearer ${accessToken}`);
  }

  return headers;
};
