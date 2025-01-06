import { redirect } from "next/navigation";
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

    if (result.success && result.groupName) {
      return redirect(`/groups/${encodeURIComponent(result.groupName)}`);
    }

    return redirect("/home");
  } catch (error) {
    console.error("Error processing invitation:", error);
    return redirect("/home");
  }
}
