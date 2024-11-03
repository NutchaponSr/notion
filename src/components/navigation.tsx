"use client";

import { 
  HomeIcon, 
  InboxIcon, 
  SearchIcon, 
  SettingsIcon, 
  SmileIcon, 
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearchCommand } from "@/hooks/use-search-command";

import { NavigationItem } from "@/components/navigation-item";
import { useKeyboard } from "@/hooks/use-keyboard";

export const Navigation = () => {
  const router = useRouter();

  const { onOpen: openSearchCommand } = useSearchCommand();

  useKeyboard([
    { key: "k", ctrl: true, action: () => openSearchCommand() }
  ]);

  return (
    <div className="shrink-0 grow-0 pb-2 flex flex-col">
      <NavigationItem icon={SearchIcon} label="Search" onClick={openSearchCommand} showBadge />
      <NavigationItem icon={SmileIcon} label="Notion AI" onClick={() => {}} />
      <NavigationItem icon={HomeIcon} label="Home" onClick={() => router.push("/home")} />
      <NavigationItem icon={InboxIcon} label="Inbox" onClick={() => {}} />
      <NavigationItem icon={SettingsIcon} label="Settings" onClick={() => {}} />
    </div>
  );
}