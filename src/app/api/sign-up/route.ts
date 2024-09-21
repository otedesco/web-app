import { NextResponse } from "next/server";
import { signUp, SignUpRequest } from "~/lib/services/cerberus";

export async function POST(request: Request) {
  const body = (await request.json()) as SignUpRequest;
  const { data } = await signUp(body);

  return NextResponse.json(data);
}
