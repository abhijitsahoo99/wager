// components/custom/dashboard-content.tsx
"use client";

import { CreateGroup } from "@/components/custom/createGroup";
import { GroupList } from "@/components/custom/groupList";

export const DashboardContent = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-12">
      <CreateGroup />
      <GroupList />
    </div>
  );
};
