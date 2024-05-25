"use server";

import connectDB from "@/utils/db";
import { KPIs } from "@/utils/kpis";

const getKpis = async (
  year: number = new Date().getFullYear(),
  month: string = "",
  day: number = -1
) => {
  // @ts-ignore
  let data = KPIs.earned[year];
  if (data && month) {
    month = month[0].toUpperCase() + month.slice(1).toLowerCase();
    data = data[month];
    if (data && day != -1 && day > 0 && day <= 31) {
      data = data[day];
    }
  }

  let formattedData = {};

  if (data) {
    const total = data.totalEarned;
    delete data.totalEarned;

    formattedData = {
      totalEarned: total,
      history: data,
    };
  }

  return JSON.stringify(formattedData);
};

export default getKpis;
