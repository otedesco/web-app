import { NextResponse } from "next/server";
import { ApiReponse, resendVerificationEmail } from "~/lib/services/cerberus";

export async function POST() {
  const [status, result] = await resendVerificationEmail();

  if (status > 400) {
    return NextResponse.json(result, { status });
  }

  return NextResponse.json((result as ApiReponse<unknown>).data, {
    status: 200,
  });
}
