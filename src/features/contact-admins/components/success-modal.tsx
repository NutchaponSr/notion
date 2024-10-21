import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogHeader
} from "@/components/ui/dialog";
import { useRequestModal } from "../hooks/use-request-modal";

export const SuccessModal = () => {
  const { isOpen, onClose } = useRequestModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[400px]">
        <DialogHeader className="items-center justify-center">
          <Image 
            src="/app-launch.png"
            alt="AppLaunch"
            width={280}
            height={100}
          />
        </DialogHeader>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl tracking-tight font-semibold dark:text-white text-[#1A1A1A]">
            Request successful
          </h1>
          <p className="text-muted-foreground text-sm text-center dark:text-[#FFFFFF71]">
            You&apos;ll receive a confirmation email soon. <br />Thank you!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}