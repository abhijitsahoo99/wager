import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { NavBar } from "@/components/custom/navbar";
import { OpenGroup } from "@/components/custom/openGroup";

export default async function GroupPage({
  params,
}: {
  params: { groupName: string };
}) {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div>
      <NavBar user={session.user} />
      <main className="max-w-7xl mx-auto p-4">
        <OpenGroup groupName={params.groupName} />
      </main>
    </div>
  );
}
