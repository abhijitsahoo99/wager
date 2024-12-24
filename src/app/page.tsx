// src/app/page.tsx (Landing/Get Started page)
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SplashScreen } from "@/components/custom/splash-screen";
import { Target } from "lucide-react";

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect("/home");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <SplashScreen />
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-[#DCAC3B] flex items-center justify-center gap-2">
          Welcome to Wager
        </h1>
        <p className="text-sm sm:text-base leading-8 text-muted-foreground text-[#000000]">
          Create and join betting pools with your friends for life's biggest
          moments.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg" className="bg-[#DCAC3B] text-[#000000]">
            <Link href="/auth/signin">Get Started</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
