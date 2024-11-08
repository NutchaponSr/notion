import { useSession } from "next-auth/react";
import { HiOutlineUsers } from "react-icons/hi2";

import { settingsSidebars } from "@/contants";
import { useSettings } from "@/stores/use-settings";

import { ButtonItem } from "@/components/button-item";

import { UserAvatar } from "@/features/auth/components/user-avatar";

export const SettingsSidebar = () => {
  const { data } = useSession();
  const { child, onChild } = useSettings();

  const name = data?.user.name ?? "";
  const email = data?.user.email ?? "";
  const imageUrl = data?.user.image ?? "";

  return (
    <div className="h-full bg-[#fbfbfa] dark:bg-[#ffffff08] w-60 grow-0 shrink-0 rounded-l-lg overflow-y-auto">
      <div className="flex flex-col h-full justify-between pt-2.5 px-1">
        <div className="overflow-auto pb-3">
          <div className="text-xs text-[#37352fa6] dark:text-[#ffffff71] font-semibold items-center flex h-6 px-3 text-ellipsis overflow-hidden">
            Account
          </div>
          <div className="flex items-center h-11 px-3 space-x-2">
            <UserAvatar 
              name={name} 
              imageUrl={imageUrl}
              className="size-5"
              fallbackClassName="size-5 bg-[#2383e2] text-white text-xs"
            />
            <div className="flex flex-col">
              <h2 className="text-sm text-[#37352f] dark:text-[#ffffffcf] whitespace-nowrap overflow-hidden text-ellipsis font-medium">
                {name}
              </h2>
              <p className="text-xs text-[#37352fa6] dark:text-[#ffffff71] whitespace-nowrap overflow-hidden text-ellipsis">
                {email}
              </p>
            </div>
          </div>
          {settingsSidebars.map((item) => (
            <ButtonItem 
              key={item.label}
              label={item.label}
              icon={item.icon}
              onClick={() => onChild(item.child)}
              isActive={child === item.child}
            />
          ))}
          <div className="flex items-center h-[18px] w-full" />
          <div className="text-xs text-[#37352fa6] dark:text-[#ffffff71] font-semibold items-center flex h-6 px-3 text-ellipsis overflow-hidden">
            Workspace
          </div>
          <ButtonItem 
            label="People"
            icon={HiOutlineUsers}
            onClick={() => onChild("people")}
          />
        </div>
      </div>
    </div>
  );
}