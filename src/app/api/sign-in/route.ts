import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ACCESS_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_OPTIONS,
} from "~/config/constants";
import { signIn, SignInRequest } from "~/lib/services/cerberus";

export async function POST(request: Request) {
  const body = (await request.json()) as SignInRequest;
  const { data } = await signIn(body);

  cookies().set("accessToken", data.accessToken, ACCESS_TOKEN_COOKIE_OPTIONS);

  cookies().set(
    "refreshToken",
    data.refreshToken,
    REFRESH_TOKEN_COOKIE_OPTIONS,
  );

  cookies().set("isLoggedIn", "true", {
    ...ACCESS_TOKEN_COOKIE_OPTIONS,
    httpOnly: false,
  });

  return NextResponse.json(data);
}
