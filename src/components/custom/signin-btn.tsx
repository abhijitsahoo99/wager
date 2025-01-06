"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

interface SignInButtonProps {
  callbackUrl?: string;
}

export function SignInButton({ callbackUrl }: SignInButtonProps) {
  return (
    <Button
      className="w-full bg-[#F0CA61] text-[#000000] hover:bg-[#c78e07] hover:opacity-80 font-roboto rounded-2xl text-lg px-16 py-6 cursor-pointer"
      onClick={() => signIn("google", { callbackUrl: callbackUrl || "/home" })}
    >
      Sign in with Google
    </Button>
  );
}
