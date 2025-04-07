"use client";
import { Button } from "@/components/ui/button";
import { Archive, Flag, Github } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

function SideNavBottom({ onFileCreate }: any) {
  const [fileName, setFileName] = useState("");
  const menuList = [
    {
      id: 1,
      title: "Getting Started",
      icon: Flag,
      path: "",
    },
    {
      id: 2,
      title: "Github",
      icon: Github,
      path: "",
    },
    {
      id: 3,
      title: "Archive",
      icon: Archive,
      path: "",
    },
  ];
  return (
    <div>
      {menuList.map((menu) => (
        <div
          key={menu.id}
          className="flex items-center gap-3 py-1 hover:bg-gray-300 cursor-pointer rounded-md px-1"
        >
          <menu.icon className="h-4" />
          <h1 className="">{menu.title}</h1>
        </div>
      ))}
      <Dialog>
        <DialogTrigger className="w-full">
          <div className="mt-3 w-full">
            <div className="w-full bg-blue-500 hover:bg-blue-700 cursor-pointer text-white py-1 rounded-md">
              New File
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
            <DialogDescription>
              <Input
                placeholder="Enter file name"
                className="mt-3"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                className="bg-blue-500 hover:bg-blue-700"
                disabled={fileName.length < 3}
                onClick={() => {
                  onFileCreate(fileName);
                  setFileName("");
                }}
              >
                Create
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SideNavBottom;
