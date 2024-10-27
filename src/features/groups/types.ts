import { client } from "@/lib/rpc";
import { InferResponseType } from "hono";

export type GroupInstant = {
  id: string, 
  name: string, 
  icon: string | null,
  year: string,
}

export type GroupSidebarType = InferResponseType<typeof client.api.groups["instant"]["$get"], 200>["data"][0];