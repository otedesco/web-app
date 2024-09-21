import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ACCESS_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_OPTIONS,
} from "~/config/constants";
import { signIn } from "~/lib/services/cerberus";

export async function POST(request: Request, res: NextApiResponse) {
  const body = await request.json();
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
