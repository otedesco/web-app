import { NextResponse } from "next/server";
import {
  AccountDetails,
  getAccountDetailsDetails,
  updateAccountDetails,
} from "~/lib/services/cerberus";

export async function GET() {
  const { data } = await getAccountDetailsDetails();

  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  const body = (await request.json()) as Partial<AccountDetails>;

  const { data } = await updateAccountDetails(body);

  return NextResponse.json(data);
}
