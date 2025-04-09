"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import React, { useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import SideNav from "./_components/SideNav";
import { FilesListContext } from "../_context/FilesListContext";
import { FILE } from "./_components/FileList";
import { Menu } from "lucide-react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [filesList, setFilesList] = useState<FILE[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user }: any = useKindeBrowserClient();
  const convex = useConvex();
  const router = useRouter();

  const checkTeam = async () => {
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email,
    });
    if (!result.length) {
      router.push("teams/create");
    }
  };

  useEffect(() => {
    user && checkTeam();
  }, [user]);

  return (
    <FilesListContext.Provider value={{ filesList, setFilesList }}>
      <div className="w-screen h-screen flex flex-col relative">
        {/* Small screen top bar */}
        <div className="md:hidden p-4 flex items-center justify-between border-b shadow-sm fixed z-20 w-full bg-white dark:bg-zinc-900">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-sm flex items-center gap-2 px-2 py-1 "
          >
            <Menu size={22} />
          </button>

          <div className="absolute left-1/2 -translate-x-1/2">
            <img src="/docuflow.png" alt="DocuFlow" className="h-5" />
          </div>
        </div>

        <div className="flex flex-1">
          {/* Sidebar (always visible on md+, toggleable on small) */}
          <div
            className={`${
              isSidebarOpen ? "block" : "hidden"
            } md:block h-full w-64 md:w-80 fixed top-0 bg-white dark:bg-zinc-900`}
          >
            <SideNav />
          </div>

          {/* Main content */}
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    </FilesListContext.Provider>
  );
};

export default DashboardLayout;
