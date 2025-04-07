"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import Image from "next/image";
import React, { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Create = () => {
  const router = useRouter();
  const [teamName, setTeamName] = useState("");
  const createTeam = useMutation(api.teams.createTeam);
  const { user }: any = useKindeBrowserClient();
  const [loading, setLoading] = useState(false);
  const createNewTeam = async () => {
    if (!user?.email) {
      toast.error("User email is missing");
      return;
    }
    setLoading(true);
    try {
      console.log("Creating team with name", teamName);

      const res = await createTeam({
        teamName: teamName,
        createdBy: user?.email,
      });
      console.log("Team created", res);
      if (res) {
        console.log("Team created successfully", res);

        toast.success("Team created successfully");
        console.log("toast shown");

        router.push("/dashboard");
        console.log("redirecting to dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create team");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-zinc-200 flex flex-col px-10 md:px-40 min-h-screen py-10 md:py-20 w-screen gap-10">
      <div>
        <Image src="/docuflow.png" alt="docuflow" width={200} height={50} />
      </div>
      <div className="flex flex-col gap-10  items-center ">
        <div className="w-full flex flex-col items-center gap-5 ">
          <h1 className="font-extrabold md:text-5xl text-4xl">
            Create a team to collaborate
          </h1>
        </div>
        <div className="flex flex-col gap-4 w-[60%] ">
          <label className="font-semibold text-gray-500">
            Enter you team name
          </label>
          <Input
            placeholder="Team Name"
            className="bg-neutral-50"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>
        <div className="w-[60%] flex justify-center items-center ">
          <Button
            className="bg-blue-600 px-5 w-full hover:bg-blue-400 hover:cursor-pointer"
            disabled={!teamName || loading}
            onClick={createNewTeam}
          >
            {loading ? "Creating..." : "Create Team"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Create;
