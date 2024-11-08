import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="flex w-full p-4 items-center justify-between shadow-[0_-1px_0_rgba(55,53,47,0.09)]">
      <Logo size={28} showTitle showDark />
      <div className="flex items-center gap-x-3">
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>
        <Button variant="ghost" size="sm">
          Terms & Conditions
        </Button>
      </div>
    </footer>
  );
}