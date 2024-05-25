"use client";

import { useEffect, useState } from "react";
import OverviewBox from "./OverviewBox";
import getOverview from "@/actions/getOverview";
import OverviewSelectBox from "./OverviewSelectBox";
import getKpis from "@/actions/getKpis";
import formatMoney from "@/utils/formatMoney";

type OverviewData = {
  totalCustomers: number;
  transactions: {
    pending: number;
    approved: number;
    cancelled: number;
  };
};

const Overview = () => {
  const [overviewData, setOverviewData] = useState<OverviewData>({
    totalCustomers: 0,
    transactions: {
      approved: 0,
      cancelled: 0,
      pending: 0,
    },
  });

  const [isKpisDataLoading, setIsKpisDataLoading] = useState(true);
  const [kpisData, setKpisData] = useState({});

  const [date, setDate] = useState({
    year: new Date().getFullYear(),
    month: "",
    day: -1,
  });

  useEffect(() => {
    const fetchOverview = async () => {
      const res = await getOverview();
      const data = JSON.parse(res);
      setOverviewData(data);
    };

    fetchOverview();
  }, []);

  useEffect(() => {
    setIsKpisDataLoading(true);
    const timer = setTimeout(() => {
      const fetchKpis = async () => {
        const res = await getKpis(date.year, date.month, date.day);
        const data = JSON.parse(res);
        setKpisData(data);
        setIsKpisDataLoading(false);
      };

      fetchKpis();
    }, 2000);

    return () => clearTimeout(timer);
  }, [date]);

  return (
    <main className="px-5 py-4 w-full flex flex-col">
      <div>
        <h1 className="font-bold text-xl m-5 ml-0">Overview</h1>
        <div className="flex flex-wrap gap-6">
          <OverviewBox
            title="Approved Transactions"
            amount={overviewData.transactions.approved}
          />
          <OverviewBox
            title="Pending Transactions"
            amount={overviewData.transactions.pending}
          />
          <OverviewBox
            title="Cancelled Transactions"
            amount={overviewData.transactions.cancelled}
          />
          <OverviewBox
            title="Total Customers"
            amount={overviewData.totalCustomers}
          />
        </div>
      </div>

      <div>
        <h2 className="font-bold text-xl m-5 ml-0">Revenue</h2>
        <div className="flex justify-between flex-wrap gap-6">
          <OverviewBox
            title="Earned"
            amount={
              isKpisDataLoading
                ? "loading..."
                : formatMoney(kpisData["totalEarned"]?.toFixed(2) ?? 0)
            }
          />
          <OverviewSelectBox
            year={date.year}
            onYearChange={(value: number) =>
              setDate((old) => ({ ...old, year: value }))
            }
            month={date.month}
            onMonthChange={(value: string) =>
              setDate((old) => ({ ...old, month: value }))
            }
            day={date.day}
            onDayChange={(value: number) =>
              setDate((old) => ({ ...old, day: value }))
            }
          />
        </div>
      </div>
    </main>
  );
};

export default Overview;
