import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/rpc";

export const useGetTrashCompetencies = () => {
  const query = useQuery({
    queryKey: ["trashCompetencies"],
    queryFn: async () => {
      const response = await client.api.competencies["trash"]["$get"]();

      if (!response) {
        throw new Error("Failed to fetch trash competencies");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
}