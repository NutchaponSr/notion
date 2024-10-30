import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.competencies["trash"][":id"]["$patch"]>;
type ResponseType = InferResponseType<typeof client.api.competencies["trash"][":id"]["$patch"]>;

export const useTrashCompetency = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.competencies["trash"][":id"]["$patch"]({
        param
      });

      if (!response.ok) {
        throw new Error("Failed to trash competency");
      }
      
      return await response.json();
    },
    onSuccess: async () => {
      toast.success("Competency trashed");

      queryClient.invalidateQueries({
        predicate: (query) => {
          const [firstKey] = query.queryKey as [string];
          return ["instantCompetencies", "trashs"].includes(firstKey);
        }
      });
    },
    onError: () => {
      toast.error("Failed to trash competency");
    }
  });

  return mutation;
}