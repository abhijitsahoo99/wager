"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getGroups } from "@/server/group";
import { GroupWithMembers } from "@/types/queries";

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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <div
          key={group.id}
          className="p-4 border rounded-lg cursor-pointer hover:shadow-md"
          onClick={() =>
            router.push(`/groups/${encodeURIComponent(group.name)}`)
          }
        >
          <h3 className="font-semibold">{group.name}</h3>
          <p className="text-sm text-gray-500">
            Members: {group.members.length}
          </p>
        </div>
      ))}
    </div>
  );
};
