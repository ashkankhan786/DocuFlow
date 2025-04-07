import { Button } from "@/components/ui/button";
import { Link, Save } from "lucide-react";
import Image from "next/image";
import React from "react";

function WorkspaceHeader({
  trigger,
  setTrigger,
}: {
  trigger: boolean;
  setTrigger: (trigger: boolean) => void;
}) {
  return (
    <div className="bg-white border-2 border-b-gray-200 flex items-center justify-between pt-2 pb-2 px-7 ">
      <div className="flex flex-1/2 flex-col gap-1 pt-2">
        <Image src="/docuflow.png" alt="Logo" width={120} height={60} />
        <h2>FileName</h2>
      </div>
      <div className="flex flex-1/2 gap-2 items-center justify-end ">
        <Button
          onClick={() => {
            console.log("Save clicked. Trigger before", trigger);

            setTrigger(true);
            console.log("Trigger after", trigger);
          }}
          className="h-8 text-[12px] gap-2 bg-green-500 hover:bg-green-600"
        >
          Save
          <Save className="h-4 w-4" />
        </Button>
        <Button className="h-8 text-[12px] gap-2 bg-blue-600 hover:bg-blue-700">
          Share
          <Link className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default WorkspaceHeader;
