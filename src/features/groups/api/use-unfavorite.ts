import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.groups["favorite"][":id"]["$delete"]>;
type ResponseType = InferResponseType<typeof client.api.groups["favorite"][":id"]["$delete"]>;

export const useUnfavorite = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.groups["favorite"][":id"]["$delete"]({
        param
      });

      if (!response.ok) {
        throw new Error("Failed to unfavorite");
      }
      
      return await response.json();
    },
    onSuccess: () => {
      toast.success("unfavorited");
      queryClient.invalidateQueries({ queryKey: ["instantGroups"] });
    },
    onError: () => {
      toast.error("Failed to unfavorite");
    }
  });

  return mutation;
}