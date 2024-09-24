import { NextResponse } from "next/server";
import { signOut, SignUpRequest } from "~/lib/services/cerberus";

export async function POST(request: Request) {
  await signOut();

  return NextResponse.json({ status: "ok" });
}
