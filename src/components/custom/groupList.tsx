"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getGroups } from "@/server/group";
import type { GroupWithMembers } from "@/types/queries";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export const GroupList = () => {
  const router = useRouter();
  const [groups, setGroups] = useState<GroupWithMembers[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true);
        const result = await getGroups();
        if (result.success && result.groups) {
          console.log(result.groups);
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
    return (
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  return (
    <div className="w-full max-w-2xl">
      {groups.map((group) => (
        <Card
          key={group.id}
          className="cursor-pointer hover:border-blue-500 transition-colors w-full max-w-2xl bg-[#F0D9A3] bg-opacity-50 font-roboto mb-4 rounded-xl border-2 border-[#F0D9A3] border-opacity-100"
          onClick={() => {
            const encodedName = encodeURIComponent(group.name);
            console.log("Navigating to group:", group.name); // Debug log
            router.push(`/groups/${encodedName}`);
          }}
        >
          <CardContent className="p-4 gap-4">
            <h4 className="font-semibold">{group.name}</h4>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex -space-x-2">
                {group.members.slice(0, 3).map((member) => (
                  <Image
                    key={member.id}
                    src={member.user.image || "/default-avatar.png"}
                    alt={member.user.name || "Member"}
                    className="w-8 h-8 rounded-full border-2 border-white"
                    width={32}
                    height={32}
                  />
                ))}
              </div>
              {group.members.length > 10 && (
                <span className="text-sm text-gray-500">
                  +{group.members.length - 10} more
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
};
