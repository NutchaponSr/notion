import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/rpc";

export const useGetFavorites = () => {
  const query = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const response = await client.api.groups["favorite"]["$get"]();

      if (!response) {
        throw new Error("Failed to fetch favorites");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
}