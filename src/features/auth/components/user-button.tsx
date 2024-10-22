"use client";

import {useSession } from "next-auth/react";
import { ChevronDownIcon, ChevronsUpDownIcon, Loader } from "lucide-react";

import { Button } from "@/components/ui/button";

import { UserAvatar } from "@/features/auth/components/user-avatar";
import { UserWrapper } from "@/features/auth/components/user-wrapper";

interface UserButtonProps {
  side: "left" | "right";
}

export const UserButton = ({ 
  side,
}: UserButtonProps) => {
  const { data, status } = useSession();

  const name = data?.user.name ?? "";
  const imageUrl = data?.user.image ?? "";

  
  if (status === "loading") return <Loader className="size-4 animate-spin text-muted-foreground" />

  if (side === "left") {
    return (
      <div className="block shrink-0 grow-0">
        <UserWrapper align="center" alignOffset={16}>
          <button className="flex items-center h-8 w-full hover:bg-[#00000008] focus-visible:ring-0 focus-visible:outline-none p-1">
            <div className="flex items-center w-auto min-h-[27px] h-8 overflow-hidden space-x-2">
              <UserAvatar
                name={name}
                imageUrl={imageUrl}
                className="rounded-md size-7 justify-center items-center"
                fallbackClassName="rounded-md size-7 bg-[#008AF2] text-accent font-medium"
              />
              <div className="flex-1 whitespace-nowrap min-w-0 overflow-hidden text-ellipsis">
                <div className="flex items-center justify-start">
                  <div className="flex items-center whitespace-nowrap overflow-hidden text-ellipsis">
                    <div className="text-[#37352f] text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis mr-1">
                      {name}&apos;s Notion
                    </div>
                    <div className="flex justify-center items-center grow-0 shrink-0 size-4 ml-0.5 text-[#A4A4A2] ">
                      <ChevronDownIcon className="size-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </UserWrapper>
        <div className="h-1.5" />
      </div>
    );
  }
  
  if (side === "right") {
    return (
      <UserWrapper align="end" sideOffset={16}>
        <Button variant="ghost" className="flex justify-center items-center gap-x-2 hover:bg-accent max-h-8 pl-2 pr-1 h-8 rounded-md">
          <div className="flex items-center gap-x-1">
            <ChevronsUpDownIcon className="size-4 text-[#999]" />
            <div className="text-sm font-medium">
              {name}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <UserAvatar 
              name={name}
              imageUrl={imageUrl}
              className="rounded-md size-7 justify-center items-center"
              fallbackClassName="rounded-md size-7 bg-[#008AF2] text-accent font-medium"
            />
          </div>
        </Button>
      </UserWrapper>
    );
  }
}