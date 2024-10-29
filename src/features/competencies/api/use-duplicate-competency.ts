import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.competencies["duplicate"][":id"]["$post"]>;
type ResponseType = InferResponseType<typeof client.api.competencies["duplicate"][":id"]["$post"]>;

export const useDuplicateCompetency = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.competencies["duplicate"][":id"]["$post"]({
        param
      });

      if (!response.ok) {
        throw new Error("Failed to duplicate competency");
      }
      
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Competency duplicated");
      queryClient.invalidateQueries({ queryKey: ["instantCompetencies"] });
    },
    onError: () => {
      toast.error("Failed to duplicate competency");
    }
  });

  return mutation;
}