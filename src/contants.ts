import AIImage from "../public/AI-V2.png";
import SiteImage from "../public/sites.png"
import WikiImage from "../public/Wiki-V2.png";
import DocsImage from "../public/Docs-V2.png";
import CalendarImage from "../public/calendar.png";
import ProjectImage from "../public/Projects-V2.png";


import { 
  BookOpenTextIcon, 
  SparklesIcon, 
  GlobeIcon, 
  CalendarDaysIcon, 
  TargetIcon, 
  FileTextIcon 
} from "lucide-react";

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
    icon: BookOpenTextIcon,
  },
  {
    label: "Docs",
    icon: FileTextIcon,
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
    icon: CalendarDaysIcon,
  },
  {
    label: "Sites",
    icon: GlobeIcon,
  },
];