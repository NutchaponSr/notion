import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.users["change-password"][":id"]["$patch"]>;
type ResponseType = InferResponseType<typeof client.api.users["change-password"][":id"]["$patch"]>;

export const useChangePassword = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.users["change-password"][":id"]["$patch"]({
        json,
        param
      });

      if (!response.ok) {
        throw new Error("Failed to change password");
      }
      
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Password changed");
    },
    onError: () => {
      toast.error("Failed to change password");
    }
  });

  return mutation;
}