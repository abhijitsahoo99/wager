"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Milestone, Plus } from "lucide-react";
import { useState } from "react";
import { createMilestone } from "@/server/milestone";
export const CreateMilestones = ({
  onMilestonesCreated,
  groupId,
}: {
  onMilestonesCreated: () => void;
  groupId: string;
}) => {
  const [newMilestoneName, setNewMilestoneName] = useState("");

  const handleCreateMilestone = async () => {
    if (!newMilestoneName.trim()) return;

    const result = await createMilestone(newMilestoneName, groupId);
    if (result.success) {
      setNewMilestoneName("");
      onMilestonesCreated();
    } else {
      console.error(result.error);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-2xl">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Milestone className="h-5 w-5 text-xs sm:text-sm" />
          Create New Milestone
        </h3>
      </div>
      <div className="flex  flex-col sm:flex-row gap-2">
        <Input
          placeholder="Enter milestone name"
          type="text"
          value={newMilestoneName}
          onChange={(e) => setNewMilestoneName(e.target.value)}
          className="text-xs sm:text-sm"
        />
        <Button
          onClick={handleCreateMilestone}
          className="bg-[#F0CA61] text-[#000000] hover:bg-[#c78e07] hover:opacity-80 text-xs sm:text-sm cursor-pointer"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Milestone
        </Button>
      </div>
    </div>
  );
};
