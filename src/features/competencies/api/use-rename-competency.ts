import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.competencies["rename"][":id"]["$patch"]>;
type ResponseType = InferResponseType<typeof client.api.competencies["rename"][":id"]["$patch"]>;

export const useRenameCompetency = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.competencies["rename"][":id"]["$patch"]({
        json,
        param
      });

      if (!response.ok) {
        throw new Error("Failed to rename competency");
      }
      
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Competency renamed");
      queryClient.invalidateQueries({ queryKey: ["instantCompetencies"] });
    },
    onError: () => {
      toast.error("Failed to rename competency");
    }
  });

  return mutation;
}