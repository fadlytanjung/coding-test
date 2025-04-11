import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const payload = jwt.decode(token);

    if (!payload) {
      return NextResponse.json({ user: null }, { status: 400 });
    }

    return NextResponse.json({ user: payload });
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 400 });
  }
}
