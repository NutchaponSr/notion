import { cn } from "@/lib/utils";
import { useSettings } from "@/stores/use-settings";
import { ModeToggle } from "./mode-toggle";

export const SettingsSettings = () => {
  const { child } = useSettings();

  return (
    <div className={cn(
      "grow px-[60px] py-9 overflow-auto", 
      child === "setting" ? "block" : "hidden",
    )}>
      <div className="border-b border-[#37352f17] mb-4 pb-3 text-base font-medium text-[#37352f]">
        Settings
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col mr-[10%] w-[60%]">
          <div className="text-sm w-auto text-[#37352f]">
            <h2 className="flex flex-row">Appearance</h2>
          </div>
          <p className="text-xs text-[#37352fa6]">
            Customize how Notion looks on your device.
          </p>
        </div>
        <ModeToggle />
      </div>
    </div>
  );
}