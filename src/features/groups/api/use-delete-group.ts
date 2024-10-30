import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.groups[":id"]["$delete"]>;
type ResponseType = InferResponseType<typeof client.api.groups[":id"]["$delete"]>;

export const useDeleteGroup = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.groups[":id"]["$delete"]({
        param
      });

      if (!response.ok) {
        throw new Error("Failed to delete group");
      }
      
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Group deleted");
      queryClient.invalidateQueries({ queryKey: ["trashs"] });
    },
    onError: () => {
      toast.error("Failed to delete group");
    }
  });

  return mutation;
}