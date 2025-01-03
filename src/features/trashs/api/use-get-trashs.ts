import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/rpc";

import { useTrashs } from "../stores/use-trashs";

export const useGetTrashs = () => {
  const { isOpen } = useTrashs();

  const query = useQuery({
    enabled: isOpen,
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