import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.competencies["instant"]["$post"]>;
type ResponseType = InferResponseType<typeof client.api.competencies["instant"]["$post"]>;

export const useCreateInstantCompetency = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.competencies["instant"]["$post"]({ json });

      if (!response.ok) {
        throw new Error("Failed to create competency");
      }
      
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Competency created");
      queryClient.invalidateQueries({ queryKey: ["instantCompetencies"] });
    },
    onError: () => {
      toast.error("Failed to create competency");
    }
  });

  return mutation;
}