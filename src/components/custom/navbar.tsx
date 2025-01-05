"use client";

import Link from "next/link";
import { Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { NavBarProps } from "@/types/queries";

function getInitials(name: string) {
  const names = name.split(" ");
  if (names.length >= 2) {
    return `${names[0][0]}${names[1][0]}`;
  }
  return `${name[0]}${name[1]}.toUpperCase()`;
}

export function NavBar({ user }: NavBarProps) {
  const router = useRouter();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <Target className="h-6 w-6 text-[#DCAC3B]" />
          <span className="font-bold text-xl text-[#DCAC3B]">Wager</span>
        </Link>

        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative size-8 rounded-full overflow-hidden h-12 w-12"
                aria-label="Open user menu"
              >
                <Avatar>
                  <AvatarImage
                    src={user?.image || ""}
                    alt={user?.name || "User avatar"}
                    referrerPolicy="no-referrer"
                  />
                  <AvatarFallback className="text-[#DCAC3B]">
                    {user?.name ? getInitials(user.name) : "?"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {user?.email && (
                <div className="p-2 text-sm text-muted-foreground ">
                  {user.name}
                </div>
              )}
              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-red-600 dark:text-red-400 "
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
