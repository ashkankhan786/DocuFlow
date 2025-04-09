"use client";
import React, { use, useEffect, useState } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import Editor from "../_components/Editor";
import { useConvex } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { FILE } from "@/app/dashboard/_components/FileList";
import dynamic from "next/dynamic";

const Canvas = dynamic(() => import("../_components/Canvas"), {
  ssr: false,
});
function Workspace({ params }: { params: Promise<{ fileId: any }> }) {
  const { fileId } = use(params);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [fileData, setFileData] = useState<FILE>();
  const convex = useConvex();
  const getFileById = async () => {
    const result = await convex.query(api.files.getFileById, { _id: fileId });
    console.log("File result", result);
    setFileData(result);
  };
  useEffect(() => {
    fileId && getFileById();
  }, [fileId]);
  return (
    <div className="md:overflow-y-hidden h-auto">
      <WorkspaceHeader
        trigger={trigger}
        setTrigger={setTrigger}
        fileName={fileData?.fileName}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 h-fit">
        {/*Workspace Layout*/}
        <div className="col-span-1 md:col-span-2">
          <div className="h-[655px] bg-neutral-100 overflow-y-scroll">
            <Editor
              trigger={trigger}
              setTrigger={setTrigger}
              fileId={fileId}
              fileData={fileData}
            />
          </div>
        </div>
        {/* Whiteboard Canvas */}
        <div className="col-span-1 md:col-span-2 min-h-[655px]">
          <Canvas
            trigger={trigger}
            setTrigger={setTrigger}
            fileId={fileId}
            fileData={fileData}
          />
        </div>
      </div>
    </div>
  );
}

export default Workspace;
