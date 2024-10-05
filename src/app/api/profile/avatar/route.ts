import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { updateProfile } from "~/lib/services/cerberus";

export async function PUT(request: Request) {
  const body = (await request.json()) as { file: string; profileId: string };
  const format = body.file.split(";")[0]?.split("/")[1];
  const filename = `avatar/${body.profileId}.${format}`;
  const file = Buffer.from(body.file.split("base64,")[1]!, "base64");
  const blob = await put(filename, file, {
    access: "public",
  });

  const { data } = await updateProfile({
    avatarUrl: blob.url,
  });

  return NextResponse.json(data);
}
