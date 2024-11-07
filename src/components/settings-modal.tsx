import { useSettings } from "@/stores/use-settings";

import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";

import { SettingsSidebar } from "@/components/settings-sidebar";
import { AccountSettings } from "@/components/account-settings";
import { SettingsSettings } from "@/components/settings-settings";

export const SettingsModal = () => {
  const { isOpen, onClose } = useSettings();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[calc(-100px+100vh)] max-h-[715px] p-0">
        <div className="flex flex-row h-full">
          <SettingsSidebar />
          <div className="grow relative h-full overflow-hidden rounded-r-lg">
            <div className="flex flex-col w-full h-full bg-white">
              <AccountSettings />
              <SettingsSettings />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}