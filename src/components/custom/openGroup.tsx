"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import type { GroupWithMembers } from "@/types/queries";

interface GroupDetailsProps {
  group: GroupWithMembers;
}

export function OpenGroup({ group }: GroupDetailsProps) {
  const router = useRouter();

  return (
    <div className="space-y-2">
      <Button
        variant="ghost"
        className="mb-4 text-base"
        onClick={() => router.push("/home")}
      >
        <ArrowLeft className="h-6 w-6 mr-2" />
        home
      </Button>

      <div className="flex justify-between items-center">
        <h2 className="text-lg sm:text-xl">{group.name}</h2>
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
          <Button
            variant="outline"
            className="bg-[#F0CA61] text-[#000000] hover:bg-[#c78e07] hover:opacity-80 text-xs sm:text-sm cursor-pointer "
          >
            Invite Members
          </Button>
        </div>
      </div>
    </div>
  );
}
