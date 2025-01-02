import { InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { SortDirection, IconType } from "@/types";
                
import { TextFontIcon } from "@/components/icons";

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
  icon: IconType;
  type: "text" | "number" | "status";
  direction: SortDirection;
}

export const headers: Header[] = [
  {
    label: "Name",
    icon: TextFontIcon,
    type: "text",
    direction: "asc"
  },
]
