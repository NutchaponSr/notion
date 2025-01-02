"use client";

import { useRouter } from "next/navigation";

import { IconVariant } from "@/types";
import { useSettings } from "@/stores/use-settings";
import { useKeyboard } from "@/hooks/use-keyboard";
import { useInboxSidebar } from "@/hooks/use-inbox-sidebar";
import { useSearchCommand } from "@/stores/use-search-command";

import { NavigationItem } from "@/components/navigation-item";

import {
  AiChatIcon,
  HomeIcon,
  InboxIcon,
  SearchIcon,
  Settings1Icon,
} from "@/components/icons";

const iconProps = {
  variant: "BULK" as IconVariant,
  className: "size-[18px]",
  fill: "#91918e",
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
          icon: <AiChatIcon {...iconProps} />,
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
          icon: <Settings1Icon {...iconProps} />,
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