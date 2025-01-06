"use client";

import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { processInvitation } from "@/server/invite";

export default async function InvitePage({
  params,
}: {
  params: { token: string };
}) {
  const session = await auth();

  if (!session?.user) {
    return redirect(`/auth/signin?callbackUrl=/invite/${params.token}`);
  }

  try {
    const result = await processInvitation(params.token);

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
  } catch (error) {
    // Add error handling
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <p className="text-gray-600 mb-6">Failed to process invitation</p>
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
