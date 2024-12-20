// src/app/dashboard/page.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { NavBar } from "@/components/custom/navbar";
import { SplashScreen } from "@/components/custom/splash-screen";
// import { CreateGroupDialog } from "@/components/custom/create-group-dialog";
// import { GroupsList } from "@/components/custom/groups-list";
import { CreateGroup } from "@/components/custom/createGroup";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div>
      <SplashScreen />
      <NavBar user={session.user} />
      <main className="max-w-7xl mx-auto p-4 space-y-6">
        <div className="flex justify-center items-center">
          <CreateGroup />
        </div>
        {/* <GroupsList userId={session.user.id} /> */}
      </main>
    </div>
  );
}
