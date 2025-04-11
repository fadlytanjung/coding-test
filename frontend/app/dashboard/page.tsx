import Home from "@/ui/home";
import { apiServerFetch } from "@/libs/api-server";
import { SalesRep } from "@/types/sales";
import { MetaType } from "@/ui/users";
import {
  dealsPerClient,
  dealsByRegion,
  totalDealsPerRep,
  dealsByStatus,
  totalDeals,
} from "@/ui/home/actions";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; size?: string; q?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const size = Number(params.size ?? 10);
  const q = params.q ?? "";

  const json = await apiServerFetch("/sales-reps");

  const filteredData = (json.salesReps || []).filter((item: SalesRep) => {
    return (
      item.name.toLowerCase().includes(q.toLowerCase()) ||
      item.role.toLowerCase().includes(q.toLowerCase()) ||
      item.region.toLowerCase().includes(q.toLowerCase())
    );
  });

  const startIndex = (page - 1) * size;
  const paginatedData = filteredData.slice(startIndex, startIndex + size);

  const meta: MetaType = {
    total_data: filteredData.length,
    total_data_on_page: paginatedData,
    page,
    size,
    total_page: Math.ceil(filteredData.length / size),
  };

  const totalDealsValue = totalDeals(filteredData);
  const dealsByClientData = dealsPerClient(filteredData);
  const dealsByRegionData = dealsByRegion(filteredData);
  const dealsByStatusData = dealsByStatus(filteredData);
  const totalDealsPerRepData = totalDealsPerRep(filteredData);

  return (
    <Home
      data={paginatedData}
      meta={meta}
      totalDealsValue={totalDealsValue}
      dealsByClient={dealsByClientData}
      dealsByRegion={dealsByRegionData}
      dealsByStatus={dealsByStatusData}
      totalDealsPerRep={totalDealsPerRepData}
    />
  );
}
