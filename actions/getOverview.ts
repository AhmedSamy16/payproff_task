"use server";
import { KPIs } from "@/utils/kpis";

const getOverview = async () => {
  return JSON.stringify({
    totalCustomers: KPIs.totalCustomers,
    transactions: KPIs.transactions,
  });
};

export default getOverview;
