import { LucideIcon } from "lucide-react";
import { IconType as ReactIconType } from "react-icons/lib";

export enum Category {
  GROUP = "Group",
  COMPETENCY = "Competency",
}

export type KeyboardType = {
  key: string;
  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;
  action: () => void;
}

export interface SettingSidebarItem {
  label: string;
  icon: ReactIconType | LucideIcon;
  child: SettingChild; 
}

export type SettingChild = "account" | "setting" | "language" | "people";
export type SortDirection = "asc" | "desc"

export interface SortableItem {
  [key: string]: string | number | Date;
}

export interface SortConfig<T> {
  header: keyof T;
  direction: SortDirection;
}

export enum IconVariant {
  STROKE = "STROKE",
  SOLID = "SOLID",
  BULK = "BULK",
}

export type IconStyle = IconVariant;

export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
  size?: string | number;
  color?: string;
  fill?: string;
  variant: IconStyle;
}

export type IconType = (props: IconBaseProps) => JSX.Element;