import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.competencies[":id"]["$delete"]>;
type ResponseType = InferResponseType<typeof client.api.competencies[":id"]["$delete"]>;

export const useDeleteCompetency = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.competencies[":id"]["$delete"]({
        param
      });

      if (!response.ok) {
        throw new Error("Failed to delete competency");
      }
      
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Competency deleted");
      queryClient.invalidateQueries({ queryKey: ["trashs"] });
    },
    onError: () => {
      toast.error("Failed to delete competency");
    }
  });

  return mutation;
}