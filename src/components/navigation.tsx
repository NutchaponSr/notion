"use client";

import HomeIcon from "@/components/icons/home";
import InboxIcon from "@/components/icons/inbox";
import SearchIcon from "@/components/icons/search";
import SettingsIcon from "@/components/icons/settings";
import MagicWandIcon from "@/components/icons/magic-wand";

import { useRouter } from "next/navigation";
import { useKeyboard } from "@/hooks/use-keyboard";
import { useInboxSidebar } from "@/hooks/use-inbox-sidebar";
import { useSearchCommand } from "@/stores/use-search-command";

import { useSettings } from "@/stores/use-settings";

import { NavigationItem } from "@/components/navigation-item";

const iconProps = {
  width: 18,
  height: 18,
  color: "#91918e",
};

export const Navigation = () => {
  const router = useRouter();

  const { toggle } = useInboxSidebar();
  const { onOpen: openSettingsModal } = useSettings();
  const { onOpen: openSearchCommand } = useSearchCommand();

  useKeyboard([
    { key: "k", ctrl: true, action: () => openSearchCommand() }
  ]);

  return (
    <div className="shrink-0 grow-0 pb-2 flex flex-col">
      {[
        {
          icon: <SearchIcon {...iconProps} />,
          label: "Search",
          onClick: openSearchCommand,
          showBadge: true
        },
        {
          icon: <MagicWandIcon {...iconProps} />,
          label: "Notion AI",
          onClick: () => {}
        },
        {
          icon: <HomeIcon {...iconProps} />,
          label: "Home", 
          onClick: () => router.push("/home")
        },
        {
          icon: <InboxIcon {...iconProps} />,
          label: "Inbox",
          onClick: toggle
        },
        {
          icon: <SettingsIcon {...iconProps} />,
          label: "Settings",
          onClick: openSettingsModal
        }
      ].map(item => (
        <NavigationItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          onClick={item.onClick}
          showBadge={item.showBadge}
        />
      ))}
    </div>
  );
}