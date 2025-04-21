import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  return (
    <div className="w-full shadow-md ">
      <div className="w-[80%] mx-auto py-5 flex items-center justify-between">
        <div className="font-bold text-2xl">OpenLibrary</div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
