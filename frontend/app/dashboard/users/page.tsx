import User, { MetaType } from "@/ui/users";
import { apiServerFetch } from "@/libs/api-server";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; size?: string; q?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const size = Number(params.size ?? 10);
  const q = params.q ?? "";

  const json = await apiServerFetch(
    `/v1/users?page=${page}&size=${size}&q=${q}`
  );

  return <User data={json.data} meta={json.meta as MetaType} />;
}
