import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/rpc";

export const useGetTrashs = () => {
  const query = useQuery({
    queryKey: ["trashs"],
    queryFn: async () => {
      const response = await client.api.trashs.$get();

      if (!response) {
        throw new Error("Failed to fetch trashs");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
}