import { NextResponse } from "next/server";
import { verifyAccount, VerifyAccountRequest } from "~/lib/services/cerberus";

export async function POST(request: Request) {
  const body = (await request.json()) as VerifyAccountRequest;
  await verifyAccount(body);

  return NextResponse.json({ success: true });
}
