"use client";

import { useEffect, useMemo, useState } from "react";
import OverviewBox from "./OverviewBox";
import getOverview from "@/actions/getOverview";
import OverviewSelectBox from "./OverviewSelectBox";
import getKpis from "@/actions/getKpis";
import formatMoney from "@/utils/formatMoney";
import {
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";
import months from "@/utils/months";

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

  const chartsData = useMemo(() => {
    return (
      kpisData.history &&
      Object.entries(kpisData.history)
        .sort((a, b) => months.indexOf(a[0]) - months.indexOf(b[0]))
        .map(([key, value]) => ({
          name: key,
          earned: value.totalEarned,
        }))
    );
  }, [kpisData]);

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
                : // @ts-ignore
                  formatMoney(kpisData["totalEarned"]?.toFixed(2) ?? 0)
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

      <div className="flex-1">
        <ResponsiveContainer width="100%">
          <LineChart
            data={chartsData}
            margin={{
              top: 20,
              right: 0,
              left: 0,
              bottom: 35,
            }}
          >
            <CartesianGrid vertical={false} stroke="#c2c5ce" />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{
                fontSize: "10px",
              }}
            />
            <YAxis
              tickLine={false}
              orientation="left"
              yAxisId="left"
              axisLine={false}
              style={{
                fontSize: "10px",
              }}
            />
            <Tooltip />
            <Line yAxisId="left" type="monotone" dataKey="earned" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
};

export default Overview;
