// src/app/auth/signin/page.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SignInButton } from "@/components/custom/signin-btn";

interface PageProps {
  params: Promise<Record<string, never>>;
  searchParams: Promise<{
    callbackUrl?: string;
    inviteToken?: string;
  }>;
}

export default async function SignInPage({ searchParams }: PageProps) {
  const session = await auth();
  const params = await searchParams;

  if (session) {
    // If there's an invite token, redirect back to the invite page
    if (params.inviteToken) {
      return redirect(
        `/invite/${params.inviteToken}?callbackUrl=${params.callbackUrl}`
      );
    }
    return redirect("/home");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-[#DCAC3B]">
            Welcome to Wager
          </h1>
          <p className="text-[#000000] font-roboto text-lg sm:text-xl">
            Sign in to your account
          </p>
        </div>
        <SignInButton callbackUrl={params.callbackUrl} />
      </div>
    </div>
  );
}
