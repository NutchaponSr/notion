import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.groups["rename"][":id"]["$patch"]>;
type ResponseType = InferResponseType<typeof client.api.groups["rename"][":id"]["$patch"]>;

export const useRenameGroup = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.groups["rename"][":id"]["$patch"]({
        json,
        param
      });

      if (!response.ok) {
        throw new Error("Failed to rename group");
      }
      
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Group renamed");
      // queryClient.invalidateQueries({ queryKey: ["instantGroups"] });

      queryClient.invalidateQueries({
        predicate: (query) => {
          const [firstKey] = query.queryKey as [string];
          return ["instantGroups", "favorites"].includes(firstKey);
        }
      });
    },
    onError: () => {
      toast.error("Failed to rename group");
    }
  });

  return mutation;
}