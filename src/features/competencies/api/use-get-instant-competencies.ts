import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/rpc";

export const useGetInstantCompetencies = () => {
  const query = useQuery({
    queryKey: ["instantCompetencies"],
    queryFn: async () => {
      const response = await client.api.competencies["instant"]["$get"]();

      if (!response) {
        throw new Error("Failed to fetch competencies");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
}