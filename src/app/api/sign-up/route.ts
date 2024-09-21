import { NextApiResponse } from "next";

import { signUp } from "~/lib/services/cerberus";

export async function POST(request: Request, res: NextApiResponse) {
  const body = await request.json();
  await signUp(body);

  return;
}
