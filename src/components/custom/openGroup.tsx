"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getGroupByName, getGroups } from "@/server/group";
import type { GroupWithMembers } from "@/types/queries";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function OpenGroup({ groupName }: { groupName: string }) {
  const [group, setGroup] = useState<GroupWithMembers | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const result = await getGroupByName(groupName);
        if (result.success && result.group) {
          setGroup(result.group);
        }
      } catch (error) {
        console.error("Failed to fetch group:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [groupName]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  if (!group) return <div>Group not found</div>;

  return (
    <div className="space-y-2">
      <Button
        variant="ghost"
        className="mb-4 bg-slate-900 text-base"
        onClick={() => router.push("/home")}
      >
        <ArrowLeft className="h-6 w-6 mr-2" />
        home
      </Button>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{group.name}</h2>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {group.members.map((member) => (
              <img
                key={member.id}
                src={member.user.image || "/default-avatar.png"}
                alt={member.user.name || "Member"}
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            ))}
          </div>
          <Button variant="outline" size="sm">
            Invite Members
          </Button>
        </div>
      </div>
    </div>
  );
}
