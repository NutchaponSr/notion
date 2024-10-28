import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.groups["favorite"][":id"]["$post"]>;
type ResponseType = InferResponseType<typeof client.api.groups["favorite"][":id"]["$post"]>;

export const useFavorite = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.groups["favorite"][":id"]["$post"]({
        param
      });

      if (!response.ok) {
        throw new Error("Failed to favorite");
      }
      
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Favorited");
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: () => {
      toast.error("Failed to favorite");
    }
  });

  return mutation;
}