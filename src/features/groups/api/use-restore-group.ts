import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.groups["restore"][":id"]["$patch"]>;
type ResponseType = InferResponseType<typeof client.api.groups["restore"][":id"]["$patch"]>;

export const useReStoreGroup = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.groups["restore"][":id"]["$patch"]({
        param
      });

      if (!response.ok) {
        throw new Error("Failed to restore group");
      }
      
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Group restored");
      queryClient.invalidateQueries({ queryKey: ["instantGroups"] });
    },
    onError: () => {
      toast.error("Failed to restore group");
    }
  });

  return mutation;
}