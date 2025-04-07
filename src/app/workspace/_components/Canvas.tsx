"use client";
import "@tldraw/tldraw/tldraw.css";
import React, { useEffect, useRef, useState } from "react";
import { FILE } from "@/app/dashboard/_components/FileList";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Tldraw, useEditor } from "@tldraw/tldraw";

function Canvas({
  trigger,
  setTrigger,
  fileId,
  fileData,
}: {
  trigger: boolean;
  setTrigger: (trigger: boolean) => void;
  fileId: any;
  fileData: FILE | undefined;
}) {
  const updateWhiteboard = useMutation(api.files.updateCanvas);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full h-full">
      <Tldraw
        persistenceKey={`tldraw-${fileId}`}
        snapshot={
          fileData?.whiteboard ? JSON.parse(fileData.whiteboard) : undefined
        }
      >
        {mounted && (
          <AutoSave
            trigger={trigger}
            setTrigger={setTrigger}
            fileId={fileId}
            updateWhiteboard={updateWhiteboard}
          />
        )}
      </Tldraw>
    </div>
  );
}

function AutoSave({
  trigger,
  setTrigger,
  fileId,
  updateWhiteboard,
}: {
  trigger: boolean;
  setTrigger: (trigger: boolean) => void;
  fileId: string;
  updateWhiteboard: any;
}) {
  const editor = useEditor();

  useEffect(() => {
    if (trigger) {
      const snapshot = editor.store.getSnapshot();
      const serialized = JSON.stringify(snapshot);

      updateWhiteboard({
        _id: fileId,
        whiteboard: serialized,
      })
        .then((res: any) => {
          console.log("Whiteboard saved", res);
          setTrigger(false); // reset trigger
        })
        .catch((err: any) => {
          console.error("Error saving whiteboard", err);
        });
    }
  }, [trigger]);

  return null;
}

export default Canvas;
