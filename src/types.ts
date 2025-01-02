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
  icon: IconType;
  variant: IconVariant;
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

export type IconVariant = "BULK" | "SOLID" | "STROKE";
export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
  size?: string | number;
  color?: string;
  fill?: string;
  variant?: IconVariant;
}

export type IconDefinition = Record<IconVariant, JSX.Element>;
export type IconType = (props: IconBaseProps) => JSX.Element;