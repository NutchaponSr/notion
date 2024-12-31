import { InferResponseType } from "hono";
import { IconType } from "react-icons/lib";
import { LucideIcon, TypeIcon } from "lucide-react";

import { client } from "@/lib/rpc";
import { SortDirection } from "@/types";

export type GroupInstant = {
  id: string, 
  name: string, 
  icon: string | null,
  year: string,
  updatedAt: string,
  updatedBy: string,
  isFavorite: boolean;
}

export type GroupSidebarType = InferResponseType<typeof client.api.groups["instant"]["$get"], 200>["data"][0];
export type Group = InferResponseType<typeof client.api.groups.$get, 200>["data"][0];

export type Header = {
  label: string;
  icon: LucideIcon | IconType;
  type: "text" | "number" | "status";
  direction: SortDirection;
}

export const headers: Header[] = [
  {
    label: "Name",
    icon: TypeIcon,
    type: "text",
    direction: "asc"
  }
]
