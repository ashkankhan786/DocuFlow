"use client";
import { ChevronDown, LayoutGrid, LogOut, Settings, Users } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export interface TEAM {
  teamName: String;
  createdBy: String;
  _id: string;
}
export interface MENU_ITEM {
  title: string;
  path: string;
  icon: any;
}
function SideNavTop({
  activeTeam,
  setActiveTeam,
}: {
  activeTeam: TEAM;
  setActiveTeam: React.Dispatch<React.SetStateAction<TEAM>>;
}) {
  const router = useRouter();
  const { user }: any = useKindeBrowserClient();
  const [teams, setTeams] = useState<TEAM[]>([]);

  const convex = useConvex();
  const getTeamsList = async () => {
    try {
      const result = await convex.query(api.teams.getTeam, {
        email: user?.email,
      });
      console.log("team list", result);
      setTeams(result);
      setActiveTeam(result[0]);
    } catch (e) {
      console.log("Error getting teams list", e);
    }
  };
  const menu = [
    {
      title: "Create team",
      path: "/teams/create",
      icon: Users,
    },
    {
      title: "Settings",
      path: "",
      icon: Settings,
    },
  ];
  const onMenuClick = (item: MENU_ITEM) => {
    if (item.path) {
      router.push(item.path);
    }
  };
  useEffect(() => {
    user && getTeamsList();
  }, [user]);
  return (
    <div>
      <div className="flex flex-col gap-3 dark:text-white">
        <Image src="/docuflow.png" alt="Docuflow" width={120} height={60} />
        <Popover>
          <PopoverTrigger>
            <div className="flex items-center mt-5 md:mt-0 gap-2 px-3 py-1 hover:bg-gray-300 justify-center rounded cursor-pointer">
              <h1 className="text-black dark:text-white font-bold text-base">
                {activeTeam?.teamName}
              </h1>
              <ChevronDown />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-2">
              {teams.map((t) => {
                return (
                  <div
                    className={`${activeTeam?._id === t._id && `bg-blue-400 text-white font-semibold`} hover:bg-blue-400 hover:text-white px-2 py-1 rounded cursor-pointer`}
                    key={t._id}
                    onClick={() => setActiveTeam(t)}
                  >
                    <h1 className="font-medium">{t.teamName}</h1>
                  </div>
                );
              })}
            </div>
            {menu.map((m, idx) => {
              return (
                <div
                  className="flex items-center gap-3 py-2 hover:bg-slate-200 rounded px-1"
                  key={idx}
                  onClick={() => onMenuClick(m)}
                >
                  <m.icon className="h-4" />
                  <h1 className="text-sm font-medium">{m.title}</h1>
                </div>
              );
            })}
            <LogoutLink>
              <div className="flex items-center gap-3 py-2 hover:bg-slate-200 rounded px-1">
                <LogOut className="h-4" />
                <h1 className="text-sm font-medium">Logout</h1>
              </div>
            </LogoutLink>
            {user && (
              <div className="flex gap-3 py-3 items-center">
                <Image
                  src={user?.picture || `/default-avatar.png`}
                  alt="user"
                  width={30}
                  height={15}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <h1 className="text-[14px] font-semibold">
                    {user?.given_name} {user?.family_name}
                  </h1>
                  <h1 className="text-gray-600 text-[12px]">{user?.email}</h1>
                </div>
              </div>
            )}
          </PopoverContent>
        </Popover>

        <div className="dark:bg-zinc-900 bg-white mt-8 hover:bg-slate-200 rounded-md ">
          <Button
            variant="outline"
            className="flex items-center w-full justify-start"
          >
            <LayoutGrid />
            <h1>All Files</h1>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SideNavTop;
