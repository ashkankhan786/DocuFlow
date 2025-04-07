"use client";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import SideNavTop, { TEAM } from "./SideNavTop";
import SideNavBottom from "./SideNavBottom";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import { FilesListContext } from "@/app/_context/FilesListContext";

function SideNav() {
  const { filesList, setFilesList } = useContext(FilesListContext);
  const [activeTeam, setActiveTeam] = useState<TEAM>({
    teamName: "",
    createdBy: "",
    _id: "",
  });
  const { user }: any = useKindeBrowserClient();
  const createFile = useMutation(api.files.createFile);
  const onFileCreate = (fileName: string) => {
    console.log("File Name: " + fileName);
    createFile({
      fileName: fileName,
      teamId: activeTeam?._id,
      createdBy: user?.email,
      archive: false,
      document: "",
      whiteboard: "",
    })
      .then((res) => {
        if (res) {
          toast("File created successfully!");
        }
        getFiles();
      })
      .catch((err) => {
        toast("Failed to create file!");
        console.error(err);
      });
  };
  const convex = useConvex();
  const getFiles = async () => {
    const result = await convex.query(api.files.getFiles, {
      teamId: activeTeam?._id,
    });
    setFilesList(result);
    console.log("files : ", result);
  };
  useEffect(() => {
    activeTeam && getFiles();
  }, [activeTeam]);
  return (
    <div className="border-2 border-r-gray-300 h-screen fixed lg:w-80 w-64 p-5 flex flex-col">
      <div className="flex-1/2 ">
        <SideNavTop {...{ activeTeam, setActiveTeam }} />
      </div>
      <div className="">
        <SideNavBottom onFileCreate={onFileCreate} />
      </div>
    </div>
  );
}

export default SideNav;
