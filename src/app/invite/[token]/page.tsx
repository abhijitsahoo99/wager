import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { processInvitation } from "@/server/invite";
interface PageProps {
  params: Promise<{
    token: string;
  }>;
}

export default async function InvitePage({ params }: PageProps) {
  const session = await auth();
  const { token } = await params;
  if (!session?.user) {
    return redirect(`/auth/signin?callbackUrl=/invite/${token}`);
  }

  try {
    const result = await processInvitation(token);

    if (result.success) {
      return redirect(`/groups/${result.groupId}`);
    }

    // If we get here, there was an error
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">
          {result.error === "Invalid or expired invitation"
            ? "Invalid Invitation"
            : "Something went wrong"}
        </h1>
        <p className="text-gray-600 mb-6">{result.error}</p>
        <Link href="/home">
          <Button
            variant="ghost"
            className="bg-[#F0CA61] text-[#000000] hover:bg-[#c78e07] hover:opacity-80"
          >
            Go to Home
          </Button>
        </Link>
      </div>
    );
  } catch (error: unknown) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <p className="text-gray-600 mb-6">
          {error instanceof Error
            ? error.message
            : "Failed to process invitation"}
        </p>
        <Link href="/home">
          <Button
            variant="ghost"
            className="bg-[#F0CA61] text-[#000000] hover:bg-[#c78e07] hover:opacity-80"
          >
            Go to Home
          </Button>
        </Link>
      </div>
    );
  }
}
