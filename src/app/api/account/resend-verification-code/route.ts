import { NextRequest, NextResponse } from "next/server";
import { ApiReponse, resendVerificationCode } from "~/lib/services/cerberus";

export async function POST(request: NextRequest) {
  const { method } = (await request.json()) as { method: "email" | "phone" };
  const [status, result] = await resendVerificationCode({ method });

  if (status >= 400) {
    return NextResponse.json(result, { status });
  }

  return NextResponse.json((result as ApiReponse<unknown>).data, {
    status: 200,
  });
}
