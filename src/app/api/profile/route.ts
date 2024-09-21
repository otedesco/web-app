import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ACCESS_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_OPTIONS,
} from "~/config/constants";
import { getCurrentProfile, signIn } from "~/lib/services/cerberus";

export async function GET() {
  const { data } = await getCurrentProfile();

  return NextResponse.json(data);
}
