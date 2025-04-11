"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { AddUserValues, UpdateUserValues } from "./schema";
import { apiServerFetch } from "@/libs/api-server";

export async function createUserAction(data: Partial<AddUserValues>) {
  const json = await apiServerFetch("/v1/users", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return json;
}

export async function deleteUserAction(id: number) {
  const res = await apiServerFetch(`/v1/users/${id}`, {
    method: "DELETE",
  });

  if (res.status === "success") {
    revalidatePath("/dashboard/users", "page");
    revalidateTag("/dashboard/users");
  }

  return res;
}


export async function updateUserAction(data: Partial<UpdateUserValues>, id: string) {
  const json = await apiServerFetch(`/v1/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return json;
}
