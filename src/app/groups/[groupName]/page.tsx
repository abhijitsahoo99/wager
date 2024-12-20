import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { NavBar } from "@/components/custom/navbar";
import { OpenGroup } from "@/components/custom/openGroup";
import { getGroupByName } from "@/server/group";

interface PageProps {
  params: {
    groupName: string;
  };
}

export default async function GroupPage({ params }: PageProps) {
  const session = await auth();
  if (!session) {
    redirect("/auth/signin");
  }

  // Decode the URL-encoded group name
  const decodedGroupName = decodeURIComponent(params.groupName);
  console.log("Fetching group:", decodedGroupName); // Debug log

  const groupResult = await getGroupByName(decodedGroupName);

  if (!groupResult.success || !groupResult.group) {
    console.log("Group not found:", groupResult); // Debug log
    return <div>Group not found</div>;
  }

  return (
    <div>
      <NavBar user={session.user} />
      <main className="max-w-7xl mx-auto p-4">
        <OpenGroup group={groupResult.group} />
      </main>
    </div>
  );
}
