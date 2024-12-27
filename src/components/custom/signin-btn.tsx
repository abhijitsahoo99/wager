"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export function SignInButton() {
  return (
    <Button
      className="w-full bg-[#F0CA61] text-[#000000] hover:bg-[#c78e07] hover:opacity-80 font-roboto rounded-2xl text-lg px-16 py-6 cursor-pointer"
      onClick={() => signIn("google")}
    >
      Continue with Google
    </Button>
  );
}
