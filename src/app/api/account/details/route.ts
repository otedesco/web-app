import { NextResponse } from "next/server";
import { getAccountDetailsDetails } from "~/lib/services/cerberus";

export async function GET() {
  const { data } = await getAccountDetailsDetails();

  return NextResponse.json(data);
}
