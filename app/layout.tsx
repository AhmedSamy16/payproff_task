import type { Metadata } from "next";
import "./globals.css";
import SideBar from "@/components/sidebar/SideBar";
import SideBarItem from "@/components/sidebar/SideBarItem";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BarChartIcon from "@mui/icons-material/BarChart";

export const metadata: Metadata = {
  title: "PayProff",
  description: "PayProff page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex">
        <SideBar>
          <SideBarItem icon={<PeopleAltIcon />} text="Customers" active />
          <SideBarItem icon={<AttachMoneyIcon />} text="Payments" />
          <SideBarItem icon={<BarChartIcon />} text="Overview" />
        </SideBar>
        {children}
      </body>
    </html>
  );
}
