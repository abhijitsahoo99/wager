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
  const { token } = params;

  if (!session?.user) {
    return redirect(`/auth/signin?callbackUrl=/invite/${token}`);
  }

  try {
    const result = await processInvitation(token);

    if (result.success && result.groupName) {
      return redirect(`/groups/${encodeURIComponent(result.groupName)}`);
    }

    return redirect("/home");
  } catch (error) {
    console.error("Error processing invitation:", error);
    return redirect("/home");
  }
}
