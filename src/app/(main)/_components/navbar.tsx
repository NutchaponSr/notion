import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between w-full h-full">
      <div className="flex items-center gap-1">
        <Button variant="ghost" asChild>
          <Link href="/home">
            Overview
          </Link>
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" asChild>
          <Link href="/contact-admins">
            Contact admins
          </Link>
        </Button>
        <Separator orientation="vertical" className="h-5" />
        <Button variant="ghost" asChild>
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
    </nav>
  );
}