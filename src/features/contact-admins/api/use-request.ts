import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.requests.$post>;
type ResponseType = InferResponseType<typeof client.api.requests.$post, 200>;

export const useRequest = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.requests.$post({
        json
      });

      if (!response.ok) {
        throw new Error("Failed to request");
      }

      return await response.json();
    },
    onError: () => {
      toast.error("Failed to request");
    }
  });

  return mutation;
}