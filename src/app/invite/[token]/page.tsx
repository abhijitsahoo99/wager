import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { processInvitation } from "@/server/invite";
import { revalidatePath } from "next/cache";

interface PageProps {
  params: Promise<{
    token: string;
  }>;
}

export default async function InvitePage({ params }: PageProps) {
  const session = await auth();
  const { token } = await params;

  if (!session?.user) {
    const callbackUrl = `/invite/${encodeURIComponent(token)}`;
    return redirect(
      `/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`
    );
  }

  try {
    console.log("Processing invitation for user:", session.user.id);
    const result = await processInvitation(token);
    console.log("Invitation result:", result);

    if (result.success) {
      if ("groupName" in result) {
        revalidatePath("/home");
        revalidatePath("/groups/[groupName]", "page");
        return redirect(`/groups/${encodeURIComponent(result.groupName)}`);
      }
    }

    console.error(
      "Failed to process invitation:",
      "error" in result ? result.error : "Unknown error"
    );
    return redirect("/home");
  } catch (error) {
    console.error("Error processing invitation:", error);
    return redirect("/home");
  }
}
