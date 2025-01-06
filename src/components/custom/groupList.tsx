"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getGroups } from "@/server/group";
import { GroupWithMembers } from "@/types/queries";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

export const GroupList = () => {
  const [groups, setGroups] = useState<GroupWithMembers[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const result = await getGroups();
        if (result.success && result.groups) {
          setGroups(result.groups);
        } else {
          console.error("Failed to fetch groups:", result.error);
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading groups...</div>;
  }

  if (!groups.length) {
    return <div className="text-center p-4">No groups found</div>;
  }

  return (
    <div className="w-full max-w-2xl">
      {groups.map((group) => (
        <Card
          key={group.id}
          className="cursor-pointer hover:border-blue-500 transition-colors w-full max-w-2xl bg-[#F0D9A3] bg-opacity-50 font-roboto mb-4 rounded-xl border-2 border-[#F0D9A3] border-opacity-100"
          onClick={() =>
            router.push(`/groups/${encodeURIComponent(group.name)}`)
          }
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
