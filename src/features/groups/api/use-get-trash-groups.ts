import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/rpc";

export const useGetTrashGroups = () => {
  const query = useQuery({
    queryKey: ["trashGroups"],
    queryFn: async () => {
      const response = await client.api.groups["trash"]["$get"]();

      if (!response) {
        throw new Error("Failed to fetch trash groups");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
}