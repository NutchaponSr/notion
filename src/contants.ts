import AIImage from "../public/AI-V2.png";
import SiteImage from "../public/sites.png"
import WikiImage from "../public/Wiki-V2.png";
import DocsImage from "../public/Docs-V2.png";
import CalendarImage from "../public/calendar.png";
import ProjectImage from "../public/Projects-V2.png";

import { SettingSidebarItem } from "@/types";

import { 
  BookOpenIcon,
  CalendarDayIcon,
  File1Icon,
  GlobeIcon, 
  Settings2Icon, 
  SparklesIcon, 
  TargetIcon, 
  UserCircle1Icon 
} from "@/components/icons";

export const images = [
  {
    label: "Wiki",
    image: WikiImage,
  },
  {
    label: "Docs",
    image: DocsImage,
  },
  {
    label: "Projects",
    image: ProjectImage,
  },
  {
    label: "AI",
    image: AIImage,
  },
  {
    label: "Calendar",
    image: CalendarImage,
  },
  {
    label: "Sites",
    image: SiteImage,
  },
];

export const logoTicker = [
  {
    label: "Affirm",
    src: "./affirm-gr.svg",
  },
  {
    label: "Netflix",
    src: "./netflix-gr.svg",
  },
  {
    label: "Discord",
    src: "./discord-gr.svg",
  },
  {
    label: "Figma",
    src: "./figma-gr.svg",
  },
];

export const buttons = [
  {
    label: "Wiki",
    icon: BookOpenIcon,
  },
  {
    label: "Docs",
    icon: File1Icon,
  },
  {
    label: "Projects",
    icon: TargetIcon,
  },
  {
    label: "AI",
    icon: SparklesIcon,
  },
  {
    label: "Calendar",
    icon: CalendarDayIcon,
  },
  {
    label: "Sites",
    icon: GlobeIcon,
  },
];

export const categories = [
  { 
    label: "Core", 
    query: "CC",
    className: [
      "bg-[#F7E3DE] dark:bg-[#4A302B]",
      "text-[#F7E3DE] fill-[#BC554D] dark:text-[#4A302B] dark:fill-[#B6524B]",
    ],
  },
  { 
    label: "Functional", 
    query: "FC",
    className: [
      "bg-[#D8E5EE]",
      "text-[#D8E5EE] fill-[#527DA5] dark:text-[#23394C] dark:fill-[#527CCA]",
    ],
  },
  { 
    label: "Technical", 
    query: "TC",
    className: [
      "bg-[#DFECDD] dark:bg-[#2C3C31]", 
      "text-[#DFECDD] fill-[#598164] dark:text-[#2C3C31] dark:fill-[#589669]"
    ],
  },
];

export const comfirmDeleteTrash = {
  title: "Are you sure you want to delete \n this stuff from Trash?",
  description: "",
  className: "w-[300px]",
  confirmLabel: "Yes. Delete this stuff",
  cancelLabel: "Cancel",
}

export const settingsSidebars: SettingSidebarItem[] = [
  {
    label: "Account",
    icon: UserCircle1Icon,
    child: "account",
    variant: "SOLID",
  },
  {
    label: "Settings",
    icon: Settings2Icon,
    child: "setting",
    variant: "STROKE",
  },
  {
    label: "Language & Region",
    icon: GlobeIcon,
    child: "language",
    variant: "STROKE",
  },
]