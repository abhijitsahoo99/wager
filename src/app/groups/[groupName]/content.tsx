"use client";

import { CreateMilestones } from "@/components/custom/createMilestones";
import { MilestoneList } from "@/components/custom/milestoneList";

export const GroupContent = ({ groupId }: { groupId: string }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-12">
      <CreateMilestones groupId={groupId} />
      <MilestoneList groupId={groupId} />
    </div>
  );
};
