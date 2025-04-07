"use client";
import { useMutation } from "convex/react";
import React, { useEffect, useRef } from "react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import { FILE } from "@/app/dashboard/_components/FileList";

function Editor({
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
  const ref = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);
  useEffect(() => {
    const initEditor = async () => {
      const EditorJS = (await import("@editorjs/editorjs")).default;
      const Header = (await import("@editorjs/header")).default;
      const List = (await import("@editorjs/list")).default;
      const Checklist = (await import("@editorjs/checklist")).default;

      if (!ref.current) return;

      // if (editorRef.current) {
      //   editorRef.current.destroy();
      //   editorRef.current = null;
      // }

      const editor = new EditorJS({
        holder: ref.current,
        tools: {
          header: {
            class: Header,
            config: {
              placeholder: "Enter a header",
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered",
            },
          },
          checklist: {
            class: Checklist,
            inlineToolbar: true,
          },
        } as any,
        data: fileData?.document
          ? JSON.parse(fileData?.document)
          : {
              blocks: [
                {
                  type: "header",
                  data: {
                    text: "",
                    level: 2,
                  },
                },
              ],
            },
      });
      editorRef.current = editor;
      console.log("Editor initialized", editorRef.current);
    };

    initEditor();
    return () => {
      if (
        editorRef.current &&
        typeof editorRef.current.destroy === "function"
      ) {
        editorRef.current.destroy();
        editorRef.current = null;
        console.log("Editor destroyed");
      }
    };
  }, [fileData]);

  useEffect(() => {
    console.log("trigger", trigger);
    console.log("editor ref", editorRef.current);

    trigger && handleSave();
  }, [trigger]);

  const updateDocument = useMutation(api.files.updateDocument);
  const handleSave = async () => {
    try {
      if (!editorRef.current) throw new Error("Editor is not initialized");
      const outputData = await editorRef.current.save();
      console.log("Saved data:", outputData);
      updateDocument({
        _id: fileId,
        document: JSON.stringify(outputData),
      })
        .then((res) => {
          if (res) console.log("Document updated successfully", res);
          toast("Document updated successfully!");
        })
        .catch((err) => {
          console.error("Error updating document:", err);
          toast.error("Error updating document");
        });
    } catch (err) {
      console.error("Failed to save data:", err);
    } finally {
      setTrigger(false);
    }
  };
  return (
    <div className="">
      <div ref={ref} className="px-3"></div>
    </div>
  );
}

export default Editor;
