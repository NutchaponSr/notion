import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.groups["instant"]["$post"]>;
type ResponseType = InferResponseType<typeof client.api.groups["instant"]["$post"]>;

export const useCreateInstantGroup = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.groups["instant"]["$post"]({ json });

      if (!response.ok) {
        throw new Error("Failed to create group");
      }
      
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Group created");
      queryClient.invalidateQueries({ queryKey: ["instantGroups"] });
    },
    onError: () => {
      toast.error("Failed to create group");
    }
  });

  return mutation;
}