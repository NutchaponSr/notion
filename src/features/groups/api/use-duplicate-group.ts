import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.groups["duplicate"][":id"]["$post"]>;
type ResponseType = InferResponseType<typeof client.api.groups["duplicate"][":id"]["$post"]>;

export const useDuplicateGroup = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.groups["duplicate"][":id"]["$post"]({
        param
      });

      if (!response.ok) {
        throw new Error("Failed to rename duplicate");
      }
      
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Group duplicated");
      queryClient.invalidateQueries({ queryKey: ["instantGroups"] });
    },
    onError: () => {
      toast.error("Failed to duplicate group");
    }
  });

  return mutation;
}