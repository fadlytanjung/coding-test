import { apiServerFetch } from "@/libs/api-server";
import EditUser from "@/ui/users/edit";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const p = await params;
  const json = await apiServerFetch(`/v1/users/${p.id}`);

  return <EditUser data={json.data || {}} />;
}
