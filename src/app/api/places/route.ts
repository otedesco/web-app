import { NextResponse } from "next/server";
import { GOOGLE_MAPS_API_KEY } from "~/config/constants";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const input = searchParams.get("input");

  if (!input) {
    return NextResponse.json({ error: "Input is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        input,
      )}&key=${GOOGLE_MAPS_API_KEY}`,
    );
    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json(
        { error: "Failed to fetch places" },
        { status: 500 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Server error fetching places" },
      { status: 500 },
    );
  }
}
