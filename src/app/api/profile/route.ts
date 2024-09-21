import { NextResponse } from "next/server";

import { getCurrentProfile } from "~/lib/services/cerberus";

export async function GET() {
  const { data } = await getCurrentProfile();

  return NextResponse.json(data);
}
