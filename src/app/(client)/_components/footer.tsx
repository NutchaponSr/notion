import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="flex w-full p-4 items-center justify-between shadow-[0_-1px_0_rgba(55,53,47,0.09)] dark:shadow-[0_-1px_0_rgba(255,255,255,0.094)]">
      <Logo size={28} showTitle />
      <div className="flex items-center gap-x-3">
        <Button variant="ghost" size="sm" className="dark:text-white">
          Privacy Policy
        </Button>
        <Button variant="ghost" size="sm" className="dark:text-white">
          Terms & Conditions
        </Button>
      </div>
    </footer>
  );
}