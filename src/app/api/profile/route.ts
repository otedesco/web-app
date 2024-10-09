import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { uploadAvatar } from "~/lib/services/blob";

import {
  getCurrentProfile,
  Profile,
  updateProfile,
} from "~/lib/services/cerberus";

export async function GET() {
  const { data } = await getCurrentProfile();

  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  const body = (await request.json()) as Partial<Profile>;

  if (body.avatarUrl) {
    body.avatarUrl = await uploadAvatar(body.avatarUrl, body.id);
  }

  const { data } = await updateProfile(body);

  return NextResponse.json(data);
}
