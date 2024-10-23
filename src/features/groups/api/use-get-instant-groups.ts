import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/rpc";

export const useGetInstantGroup = () => {
  const query = useQuery({
    queryKey: ["instantGroups"],
    queryFn: async () => {
      const response = await client.api.groups["instant"]["$get"]();

      if (!response) {
        throw new Error("Failed to fetch groups");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
}