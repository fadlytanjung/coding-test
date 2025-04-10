import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) return NextResponse.json({ user: null }, { status: 401 });

  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString("utf8")
    );

    return NextResponse.json({ user: payload });
  } catch {
    return NextResponse.json({ user: null }, { status: 400 });
  }
}
