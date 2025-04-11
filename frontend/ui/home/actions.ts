import { SalesRep } from "@/types/sales";

export const dealsPerClient = (salesReps: SalesRep[]) => {
  const clientDeals: Record<string, number> = {};
  salesReps.forEach((rep) => {
    rep.deals.forEach((deal) => {
      if (!clientDeals[deal.client]) {
        clientDeals[deal.client] = 0;
      }
      clientDeals[deal.client] += deal.value;
    });
  });
  return clientDeals;
};

export const dealsByRegion = (salesReps: SalesRep[]) => {
  const regionDeals: Record<string, number> = {};
  salesReps.forEach((rep) => {
    if (!regionDeals[rep.region]) {
      regionDeals[rep.region] = 0;
    }
    rep.deals.forEach((deal) => {
      regionDeals[rep.region] += deal.value;
    });
  });
  return regionDeals;
};

export const totalDealsPerRep = (salesReps: SalesRep[]) => {
  return salesReps.map((rep) => {
    const totalValue = rep.deals.reduce((total, deal) => total + deal.value, 0);
    return { name: rep.name, totalValue };
  });
};

export const dealsByStatus = (salesReps: SalesRep[]) => {
  const statusCount = { "Closed Won": 0, "In Progress": 0, "Closed Lost": 0 };
  salesReps.forEach((rep) => {
    rep.deals.forEach((deal) => {
      statusCount[deal.status] += 1;
    });
  });
  return statusCount;
};

export const totalDeals = (salesReps: SalesRep[]) => {
  return salesReps.reduce((total, rep) => {
    return (
      total + rep.deals.reduce((repTotal, deal) => repTotal + deal.value, 0)
    );
  }, 0);
};
