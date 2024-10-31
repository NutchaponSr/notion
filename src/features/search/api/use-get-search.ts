import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/rpc";

import { useSearchCommand } from "@/stores/use-search-command";

export const useGetSearchs = () => {
  const { isOpen } = useSearchCommand();

  const query = useQuery({
    enabled: isOpen,
    queryKey: ["searchs"],
    queryFn: async () => {
      const response = await client.api.searchs.$get();

      if (!response) {
        throw new Error("Failed to fetch searchs");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
}