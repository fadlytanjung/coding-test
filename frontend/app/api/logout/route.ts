import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  const cookie = await cookies();
  cookie.delete("access_token");
  redirect("/login?expired=1");
}
