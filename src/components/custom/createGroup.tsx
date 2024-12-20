"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Users } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createGroup } from "@/server/group";

export const CreateGroup = () => {
  const [newGroupName, setNewGroupName] = useState("");
  const router = useRouter();

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) return;

    const result = await createGroup(newGroupName);
    if (result.success) {
      setNewGroupName("");
      router.refresh();
    } else {
      console.error(result.error);
    }
  };

  return (
    <>
      <div className="space-y-6 w-full max-w-2xl">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Users className="h-5 w-5" />
            Create New Group
          </h3>
          <div className="flex  flex-col sm:flex-row gap-2">
            <Input
              placeholder="Enter group name"
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
            <Button onClick={handleCreateGroup}>
              <Plus className="h-4 w-4 mr-2" />
              Create Group
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
