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