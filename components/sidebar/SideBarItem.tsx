"use client";

import { ReactNode } from "react";
import { useSideBarContext } from "./SideBarContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  icon: ReactNode;
  text: string;
  to: string;
};

const SideBarItem = ({ icon, text, to }: Props) => {
  const { expanded } = useSideBarContext();
  const isActive = usePathname() == to;

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        isActive
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      }`}
    >
      <Link href={to} className="inline-block overflow-hidden">
        {icon}
        <span
          className={`inline-block overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
      </Link>

      {!expanded && (
        <div
          className={`absolute z-10 left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
};

export default SideBarItem;
