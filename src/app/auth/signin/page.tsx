// src/app/auth/signin/page.tsx
import { auth, signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SignInButton } from "@/components/custom/signin-btn";

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    redirect("/home");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-[#DCAC3B]">
            Welcome to Wager
          </h1>
          <p className="text-muted-foreground text-[#000000]">
            Sign in to your account
          </p>
        </div>
        <SignInButton />
      </div>
    </div>
  );
}
