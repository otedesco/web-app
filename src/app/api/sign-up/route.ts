import { signUp, SignUpRequest } from "~/lib/services/cerberus";

export async function POST(request: Request) {
  const body = (await request.json()) as SignUpRequest;
  await signUp(body);

  return;
}
