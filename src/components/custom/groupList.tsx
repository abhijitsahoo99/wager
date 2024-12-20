"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getGroups } from "@/server/group";
import type { GroupWithMembers } from "@/types/queries";
import { useRouter } from "next/navigation";

export function GroupList() {
  const router = useRouter();
  const [groups, setGroups] = useState<GroupWithMembers[]>([]);
  const [currentView, setCurrentView] = useState<"groups" | "groupDetail">(
    "groups"
  );
  const [selectedGroup, setSelectedGroup] = useState<GroupWithMembers | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const result = await getGroups();
        if (result.success && result.groups) {
          setGroups(result.groups);
        }
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderGroups = () => (
    <div className="flex flex-col items-center">
      {groups.map((group) => (
        <Card
          key={group.id}
          className="cursor-pointer hover:border-blue-500 transition-colors w-full max-w-2xl"
          onClick={() => router.push(`/${group.name}`)}
        >
          <CardContent className="p-4">
            <h4 className="font-semibold">{group.name}</h4>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex -space-x-2">
                {group.members.slice(0, 3).map((member) => (
                  <img
                    key={member.id}
                    src={member.user.image || "/default-avatar.png"}
                    alt={member.user.name || "Member"}
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                ))}
              </div>
              {group.members.length > 3 && (
                <span className="text-sm text-gray-500">
                  +{group.members.length - 3} more
                </span>
              )}
            </div>
            <p className="text-sm font-medium mt-2">
              Total Pot: ${group.totalPot?.toFixed(2) || "0.00"}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
  return <div className="space-y-6">{renderGroups()}</div>;
}
