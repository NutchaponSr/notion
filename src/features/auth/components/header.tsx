import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GlobeIcon } from "@radix-ui/react-icons";

export const Header = () => {
  return (
    <header className="fixed z-[99]">
      <div className="whitespace-nowrap w-full flex flex-col items-center justify-center">
        <div className="flex items-center justify-start w-full px-5 h-[80px] relative overflow-hidden">
          <div className="shrink-0 mr-2.5">
            <Logo size={34} />
          </div>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="ghost" size="sm" className="text-[#91918e] hover:text-[#91918e] h-7 ml-2 px-2 text-sm font-normal">
            <GlobeIcon className="size-4" />
            English
          </Button>
        </div>
      </div>
    </header>
  );
}