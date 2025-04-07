"use client";
import { FilesListContext } from "@/app/_context/FilesListContext";
import React, { useContext, useEffect } from "react";
import moment from "moment";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import { Archive, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export interface FILE {
  archive: boolean;
  createdBy: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _creationTime: number;
  _id: string;
}
function FileList() {
  const { user }: any = useKindeBrowserClient();
  const { filesList } = useContext(FilesListContext);
  const router = useRouter();
  useEffect(() => {
    console.log("Files" + filesList);
  }, [filesList]);
  return (
    <div>
      <div className="overflow-x-auto lg:overflow-x-hidden">
        <table className="min-w-full divide-y-2 divide-gray-200">
          <thead className="ltr:text-left rtl:text-right">
            <tr className="*:font-medium *:text-gray-900">
              <th className="px-3 py-2 whitespace-nowrap">File Name</th>
              <th className="px-3 py-2 whitespace-nowrap">Created At</th>
              <th className="px-3 py-2 whitespace-nowrap">Author</th>
              <th className="px-3 py-2 whitespace-nowrap"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {filesList.map((f: FILE, idx: number) => {
              return (
                <tr className="*:text-gray-900 *:first:font-medium" key={idx}>
                  <td
                    className="px-3 py-2 whitespace-nowrap cursor-pointer"
                    onClick={() => router.push("/workspace/" + f._id)}
                  >
                    {f.fileName}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {moment(f._creationTime).format("DD MMMM YYYY")}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <Image
                      src={user?.picture}
                      alt="User"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreHorizontal />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Archive />
                          Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FileList;
