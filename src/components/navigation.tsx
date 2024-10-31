"use client";

import { 
  HomeIcon, 
  InboxIcon, 
  SearchIcon, 
  SettingsIcon, 
  SmileIcon, 
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearchCommand } from "@/stores/use-search-command";

import { NavigationItem } from "@/components/navigation-item";

export const Navigation = () => {
  const router = useRouter();

  const { onOpen: openSearchCommand } = useSearchCommand();

  return (
    <div className="shrink-0 grow-0 pb-2 flex flex-col">
      <NavigationItem icon={SearchIcon} label="Search" onClick={openSearchCommand} />
      <NavigationItem icon={SmileIcon} label="Notion AI" onClick={() => {}} />
      <NavigationItem icon={HomeIcon} label="Home" onClick={() => router.push("/home")} />
      <NavigationItem icon={InboxIcon} label="Inbox" onClick={() => {}} />
      <NavigationItem icon={SettingsIcon} label="Settings" onClick={() => {}} />
    </div>
  );
}