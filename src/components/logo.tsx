import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  size: number;
  showTitle?: boolean;
}

export const Logo = ({ size, showTitle }: LogoProps) => {
  return (
    <Link href="/">
      <div className="flex space-x-2 cursor-pointer">
        <Image 
          src="/logo.svg"
          alt="Logo"
          height={size}
          width={size}
        />
        {showTitle && (
          <span className="text-xl font-semibold tracking-tight">
            Notion
          </span>
        )}
      </div>
    </Link>
  );
}