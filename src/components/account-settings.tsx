import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils";
import { useSettings } from "@/stores/use-settings";

import { Button } from "@/components/ui/button";

import { ProfileForm } from "@/features/auth/components/profile-form";
import { useChangePassword } from "@/features/auth/hooks/use-change-password";

export const AccountSettings = () => {
  const { data } = useSession();
  const { child } = useSettings();
  const { onOpen: openChangePassword } = useChangePassword();

  const role = data?.user.role ?? "";
  const email = data?.user.email ?? "";

  return (
    <div className={cn(
      "grow px-[60px] py-9 overflow-auto", 
      child === "account" ? "block" : "hidden",
    )}>
      <div className="border-b border-[#37352f17] mb-4 pb-3 text-base font-medium text-[#37352f]">
        My profile
      </div>
      <div className="flex flex-col">
        <ProfileForm />
        <div className="flex items-center h-[48px] w-full" />
      </div>
      <div className="border-b border-[#37352f17] mb-4 pb-3 text-base font-medium text-[#37352f]">
        Account security
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col mr-[10%] w-[60%]">
          <div className="text-sm w-auto text-[#37352f]">
            <h2 className="flex flex-row">Email</h2>
          </div>
          <p className="text-xs text-[#37352fa6]">{email}</p>
        </div>
      </div>
      <div className="flex items-center h-[18px] w-full" />
      <div className="flex items-center justify-between">
        <div className="flex flex-col mr-[10%] w-[60%]">
          <div className="text-sm w-auto text-[#37352f]">
            <h2 className="flex flex-row">Password</h2>
          </div>
          <p className="text-xs text-[#37352fa6]">
            Change your password to login to your account.
          </p>
        </div>
        <Button 
          size="md" 
          onClick={openChangePassword}
          variant="outline" 
          className="text-[#37352f] font-normal"
        >
          Change password
        </Button>
      </div>
      <div className="flex items-center h-[18px] w-full" />
      <div className="flex items-center justify-between">
        <div className="flex flex-col mr-[10%] w-[60%]">
          <div className="text-sm w-auto text-[#37352f]">
            <h2 className="flex flex-row">Role</h2>
          </div>
          <p className="text-xs text-[#37352fa6]">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
}