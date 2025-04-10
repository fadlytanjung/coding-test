"use server";

import { MetaType } from "@/ui/users";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function apiServerFetch<T = any>(
  endpoint: string,
  init?: RequestInit
): Promise<{
  status: string;
  message: string;
  data?: T;
  meta?: MetaType
}> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    redirect("/login");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}${endpoint}`, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (res.status === 401) {
    redirect("/api/logout");
  }

  const json = await res.json();

  return json;
}
