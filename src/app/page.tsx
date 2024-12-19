// src/app/page.tsx (Landing/Get Started page)
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SplashScreen } from "@/components/custom/splash-screen";

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect("/home");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <SplashScreen />
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Welcome to Wager
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">
          Create and join betting pools with your friends for life's biggest
          moments.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/auth/signin">Get Started</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
