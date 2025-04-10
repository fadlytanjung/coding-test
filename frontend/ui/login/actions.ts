"use server";

import env from "@/libs/env";
import { cookies } from "next/headers";
import { LoginSchema, LoginValues } from "./schema";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_API_URL}/v1/auth/login`;

export async function loginAction(values: LoginValues) {
  const parsed = LoginSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Invalid form submission." };
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${env.NEXT_PUBLIC_BASIC_AUTH}`,
      },
      body: JSON.stringify(parsed.data),
    });

    const json = await res.json();

    if (!res.ok) {
      return { success: false, error: json?.message || "Login failed" };
    }

    const cookieStore = await cookies();
    cookieStore.set("access_token", json.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 2,
    });

    return { success: true, data: json };
  } catch (err) {
    return { success: false, error: "Something went wrong!" };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
}
