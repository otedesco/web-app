import {
  getProfileDetails,
  Profile,
  ProfileDetails,
  updateProfile,
  updateProfileDetails,
} from "~/lib/services/cerberus";

import { NextResponse } from "next/server";
import { uploadAvatar } from "~/lib/services/blob";

export async function PATCH(request: Request) {
  const body = (await request.json()) as Partial<
    ProfileDetails & Pick<Profile, "avatarUrl">
  >;

  let response = {};
  if (body.avatarUrl) {
    const url = await uploadAvatar(body.avatarUrl, body.id);
    const {
      data: { avatarUrl },
    } = await updateProfile({ avatarUrl: url });
    response = { avatarUrl };
  }

  const { data } = await updateProfileDetails(body);
  response = { ...response, ...data };

  return NextResponse.json(response);
}

export async function GET() {
  const { data } = await getProfileDetails();

  return NextResponse.json(data);
}
