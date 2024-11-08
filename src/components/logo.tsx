import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface LogoProps {
  size: number;
  showTitle?: boolean;
  showDark?: boolean;
}

export const Logo = ({ size, showTitle, showDark }: LogoProps) => {
  return (
    <Link href="/">
      <div className="flex space-x-2 cursor-pointer">
        <Image 
          src="/logo.svg"
          alt="Logo"
          height={size}
          width={size}
          className="block dark:hidden"
        />
        {showDark ? (
          <Image 
            src="/logo.svg"
            alt="Logo"
            height={size}
            width={size}
            className="hidden dark:block"
          />
        ): (
          <Image 
            src="/logo-dark.svg"
            alt="Logo"
            height={size}
            width={size}
            className="hidden dark:block"
          />
        )}
        {showTitle && (
          <span className={cn(
            "text-xl font-semibold tracking-tight",
            showDark ? "text-[#1a1a1a]" : "text-[#1a1a1a] dark:text-white",
          )}>
            Notion
          </span>
        )}
      </div>
    </Link>
  );
}