import Link from "next/link";

import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { UserButton } from "@/features/auth/components/user-button"

export const Navbar = () => {
  const session = useSession();

  return (
    <nav className="flex items-center justify-between w-full h-full">
      <div className="flex items-center gap-1">
        {session && session.data?.user.role === "ADMIN" && (
          <Button variant="ghost" className="dark:text-white" asChild>
            <Link href="/home">
              Overview
            </Link>
          </Button>
        )}
      </div>
      {session.status === "authenticated" ? (
        <UserButton side="right" />
      ) : (
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="dark:hover:bg-[#37352f0f] dark:text-[#1a1a1a]" asChild>
            <Link href="/contact-admins">
              Contact admins
            </Link>
          </Button>
          <Separator orientation="vertical" className="h-5" />
          <Button variant="ghost" className="dark:hover:bg-[#37352f0f] dark:text-[#1a1a1a]" asChild>
            <Link href="/sign-in">
              Log in
            </Link>
          </Button>
          <Button asChild>
            <Link href="/contact-admins">
              Get Notion free
            </Link>
          </Button>
        </div>
      )}
    </nav>
  );
}