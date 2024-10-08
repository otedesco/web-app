import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

import {
  getCurrentProfile,
  Profile,
  updateProfile,
} from "~/lib/services/cerberus";

const uploadAvatar = async (fileString?: string, profileId?: string) => {
  if (!fileString) return;

  if (!fileString.startsWith("data:image/")) {
    throw new Error("Invalid file format");
  }

  const format = fileString.split(";")[0]?.split("/")[1];
  const filename = `avatar/${profileId}.${format}`;
  const file = Buffer.from(fileString.split("base64,")[1]!, "base64");
  const blob = await put(filename, file, {
    access: "public",
  });

  return blob.url;
};

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
