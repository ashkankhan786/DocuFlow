"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import React, { useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import SideNav from "./_components/SideNav";
import { FilesListContext } from "../_context/FilesListContext";
import { FILE } from "./_components/FileList";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [filesList, setFilesList] = useState<FILE[]>([]);
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
      <div className="w-screen grid grid-cols-4">
        <div className="h-screen lg:w-80 w-64 col-span-1">
          <SideNav />
        </div>
        <div className="col-span-3">{children}</div>
      </div>
    </FilesListContext.Provider>
  );
};

export default DashboardLayout;
