import { NextResponse } from "next/server";
import { signOut } from "~/lib/services/cerberus";

export async function POST() {
  await signOut();

  return NextResponse.json({ status: "ok" });
}
