"use client";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LastPageIcon from "@mui/icons-material/LastPage";
import { ReactNode, useState } from "react";
import SidebarContextProvider from "./SideBarContext";

type Props = {
  children: ReactNode;
};

const SideBar = ({ children }: Props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside className="h-screen w-fit">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <h1
            className={`overflow-hidden transition-all font-bold ${
              expanded ? "w-32" : "w-0"
            }`}
          >
            Pay<span className="text-indigo-400">Proff</span>
          </h1>
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <FirstPageIcon /> : <LastPageIcon />}
          </button>
        </div>

        <SidebarContextProvider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContextProvider>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Business Account</h4>
              <span className="text-xs text-gray-600">
                business@payproff.com
              </span>
            </div>
            <MoreVertIcon />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default SideBar;
