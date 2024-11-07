import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";
import { useSearchCommand } from "@/stores/use-search-command";

import { client } from "@/lib/rpc";

export type ResponseType = InferResponseType<typeof client.api.searchs.$get, 200>["data"]["data"];

export const useGetSearchs = (
  sort: string | null,
  from?: string,
  to?: string,
  type?: string,
  search?: string,
) => {
  const { isOpen } = useSearchCommand();

  const query = useQuery({
    enabled: isOpen,
    queryKey: ["searchs", { sort, from, to, search, type }],
    queryFn: async () => {
      const response = await client.api.searchs.$get({
        query: {
          sort: sort ?? "",
          from,
          to,
          type,
          search
        }
      });

      if (!response) {
        throw new Error("Failed to fetch searchs");
      }

      const { data } = await response.json();
      return data;
    },
    refetchOnWindowFocus: false,
  });

  return query;
}