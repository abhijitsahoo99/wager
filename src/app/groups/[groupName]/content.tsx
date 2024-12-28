"use client";

import { CreateMilestones } from "@/components/custom/createMilestones";

export const GroupContent = ({ groupId }: { groupId: string }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-12">
      <CreateMilestones
        onMilestonesCreated={() => {
          window.location.reload();
        }}
        groupId={groupId}
      />
      {/* <MilestoneList /> */}
    </div>
  );
};
