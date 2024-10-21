"use client";

import { ChevronsUpDownIcon, Loader, LogOutIcon, MoreHorizontalIcon, SettingsIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "./user-avatar";
import { Button } from "@/components/ui/button";

export const UserButton = () => {
  const { data, status } = useSession();

  if (status === "loading") return <Loader className="size-4 animate-spin text-muted-foreground" />
  
  const name = data?.user.name ?? "";
  const role = data?.user.role ?? "";
  const email = data?.user.email ?? "";
  const imageUrl = data?.user.image ?? "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
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
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" side="bottom" align="end" sideOffset={16}>
      <div className="flex flex-col">
          <div className="flex items-center justify-between px-1 pt-1.5">
            <p className="text-xs text-muted-foreground overflow-hidden">{ email }</p>
            <button className="h-5 w-5 hover:bg-muted flex justify-center items-center rounded-sm">
              <MoreHorizontalIcon className="size-4 text-muted-foreground" />
            </button>
          </div>
          <div className="flex items-center justify-start py-1.5 px-1.5 space-x-2">
            <UserAvatar 
              name={name}
              imageUrl={imageUrl}
              className="rounded-md size-8 justify-center items-center"
              fallbackClassName="rounded-md size-8 bg-[#008AF2] text-accent font-medium"
            />
            <div className="flex flex-col">
              <p className="text-sm line-clamp-1">{ name }&apos;s Notion</p>
              <p className="text-xs text-muted-foreground">
                Role · <span className="font-medium underline">{ role }</span>
              </p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        {/* TODO: Settings modal */}
        <DropdownMenuItem onClick={() => {}}>
          <SettingsIcon className="size-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOutIcon className="size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}