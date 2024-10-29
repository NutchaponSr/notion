import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.competencies["restore"][":id"]["$patch"]>;
type ResponseType = InferResponseType<typeof client.api.competencies["restore"][":id"]["$patch"]>;

export const useReStoreCompetency = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.competencies["restore"][":id"]["$patch"]({
        param
      });

      if (!response.ok) {
        throw new Error("Failed to restore competency");
      }
      
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Competency restored");
      queryClient.invalidateQueries({ queryKey: ["instantCompetencies"] });
    },
    onError: () => {
      toast.error("Failed to restore competency");
    }
  });

  return mutation;
}