import { NextApiResponse } from "next";

import { verifyAccount } from "~/lib/services/cerberus";

export async function POST(request: Request, res: NextApiResponse) {
  const body = await request.json();
  await verifyAccount(body);

  return;
}
