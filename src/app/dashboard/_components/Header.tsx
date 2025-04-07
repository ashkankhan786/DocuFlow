import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Search, Send } from "lucide-react";
import Image from "next/image";
import React from "react";

function Header() {
  const { user }: any = useKindeBrowserClient();
  return (
    <div className="w-full flex items-center justify-end p-6 gap-1">
      <div className="flex items-center gap-2 border rounded-md p-1">
        <Search />
        <input
          type="text"
          placeholder="Search"
          className="outline-none text-gray-600 w-32 md:w-44 lg:w-56"
        />
      </div>
      <div>
        <Image
          src={user?.picture || "/default-avatar.png"}
          alt="User"
          width={35}
          height={35}
          className="rounded-full"
        />
      </div>
      <Button className="bg-blue-600 hover:bg-blue-700">
        <Send />
        Invite
      </Button>
    </div>
  );
}

export default Header;
