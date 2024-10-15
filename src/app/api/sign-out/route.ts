import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ACCESS_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_OPTIONS,
} from "~/config/constants";
import { signOut } from "~/lib/services/cerberus";

export async function POST() {
  await signOut();

  cookies().set("accessToken", "", ACCESS_TOKEN_COOKIE_OPTIONS);

  cookies().set("refreshToken", "", REFRESH_TOKEN_COOKIE_OPTIONS);

  cookies().set("isLoggedIn", "false", {
    ...ACCESS_TOKEN_COOKIE_OPTIONS,
    httpOnly: false,
  });

  return NextResponse.json({ status: "ok" });
}
