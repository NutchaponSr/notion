import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.users[":id"]["$patch"]>;
type ResponseType = InferResponseType<typeof client.api.users[":id"]["$patch"]>;

export const useUpdateProfile = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.users[":id"]["$patch"]({
        json,
        param
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Profile updated");
    },
    onError: () => {
      toast.error("Failed to update profile");
    }
  });

  return mutation;
}