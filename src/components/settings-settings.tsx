import { cn } from "@/lib/utils";
import { useSettings } from "@/stores/use-settings";

export const SettingsSettings = () => {
  const { child } = useSettings();

  return (
    <div className={cn(
      "grow px-[60px] py-9 overflow-auto", 
      child === "setting" ? "block" : "hidden",
    )}>
      Settings
    </div>
  );
}