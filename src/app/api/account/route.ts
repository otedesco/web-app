import { NextRequest, NextResponse } from "next/server";
import { Account, ApiReponse, updateAccount } from "~/lib/services/cerberus";

export async function PATCH(req: NextRequest) {
  const payload = (await req.json()) as Partial<Account>;
  const [status, result] = await updateAccount(payload);

  if (status > 400) {
    return NextResponse.json(result, { status });
  }

  return NextResponse.json(
    {},
    {
      status: 200,
    },
  );
}
