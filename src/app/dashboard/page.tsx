"use client";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation, useQuery } from "convex/react";
import React, { useEffect } from "react";
import { api } from "../../../convex/_generated/api";
import Header from "./_components/Header";
import FileList from "./_components/FileList";

function Dashboard() {
  const { user }: any = useKindeBrowserClient();
  const createUser = useMutation(api.user.createUser);
  const convex = useConvex();
  const checkUser = async () => {
    const result = await convex.query(api.user.getUser, { email: user?.email });
    if (!result?.length) {
      createUser({
        name: user.given_name,
        email: user.email,
        image: user.picture,
      }).then((res) => {
        console.log(res);
      });
    }
  };
  useEffect(() => {
    if (user) {
      console.log("user: ", user);
      checkUser();
    }
  }, [user]);
  return (
    <div className="lg:ml-4 md:pl-20 ml-5 mr-5 md:mr-7 ">
      <Header />
      <FileList />
    </div>
  );
}

export default Dashboard;
