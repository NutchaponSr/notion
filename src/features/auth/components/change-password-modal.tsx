import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { RectangleEllipsisIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { FormError } from "@/components/form-error";

import { useChangePassword } from "@/features/auth/api/use-change-password";
import { useChangePassword as useChangePasswordModal } from "@/features/auth/hooks/use-change-password";

import { ChangePasswordSchema } from "@/features/auth/schemas";

type ChangePassword = z.infer<typeof ChangePasswordSchema>;

export const ChangePasswordModal = () => {
  const { data } = useSession();
  const changePassword = useChangePassword();
  const { isOpen, onClose } = useChangePasswordModal();

  const id = data?.user.id ?? "";

  const [error, setError] = useState<string | undefined>("");

  const form = useForm<ChangePassword>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    }
  });

  const onSubmit = ({ password, confirmPassword }: ChangePassword) => {
    setError("");

    if (password !== confirmPassword) {
      setError("Your new password does not match");
      return;
    }
  
    changePassword.mutate({
      param: { id },
      json: { password }
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[350px]" showClose>
        <DialogHeader className="flex items-center justify-center">
          <RectangleEllipsisIcon className="size-6 text-[#37352f]" />
          <DialogTitle className="font-medium text-sm text-[#37352f]">
            Change password
          </DialogTitle>
          <DialogDescription className="max-w-[260px] mx-auto mb-4 text-center text-[#37352fa6] text-xs">
            Use a password at least 15 letters long, or at least 6 characters long with both letters and numbers.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField 
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#37352fa6] text-xs font-normal">
                    Enter a new password
                  </FormLabel>
                  <FormControl>
                    <input 
                      {...field}
                      type="password"
                      placeholder="New password"
                      className="max-w-full w-full whitespace-pre-wrap break-words grow text-sm py-1 px-2.5 rounded-sm bg-[#f2f1ee99] focus-visible:outline-none text-[#37352f] shadow-[0px_0px_0px_1px_rgba(15,15,15,0.1)_inset] focus-visible:shadow-[inset_0_0_0_1px_rgba(35,131,226,0.57),0_0_0_2px_rgba(35,131,226,0.35)] placeholder:text-[#bebebb] placeholder:font-light"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#37352fa6] text-xs font-normal">
                    Confirm your new password
                  </FormLabel>
                  <FormControl>
                    <input 
                      {...field}
                      type="password"
                      placeholder="Confirm password"
                      className="max-w-full w-full whitespace-pre-wrap break-words grow text-sm py-1 px-2.5 rounded-sm bg-[#f2f1ee99] focus-visible:outline-none text-[#37352f] shadow-[0px_0px_0px_1px_rgba(15,15,15,0.1)_inset] focus-visible:shadow-[inset_0_0_0_1px_rgba(35,131,226,0.57),0_0_0_2px_rgba(35,131,226,0.35)] placeholder:text-[#bebebb] placeholder:font-light"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormError message={error} className="px-3 py-1.5 text-xs rounded-sm" />
            <Button type="submit" variant="primary" size="md" className="w-full">
              Change password
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}