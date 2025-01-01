"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Loader2, Plus } from "lucide-react";
import { getMilestones } from "@/server/milestone";
import { Milestone } from "@prisma/client";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toggleMilestoneCompletion } from "@/server/milestone";
import { createBet } from "@/server/bet";

export const MilestoneList = ({ groupId }: { groupId: string }) => {
  const router = useRouter();
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [betAmount, setBetAmount] = useState(0);

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        setLoading(true);
        const result = await getMilestones(groupId);
        if (result) {
          console.log(result);
          setMilestones(result);
        }
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMilestones();
  }, [groupId]);

  const handleCompleted = async (milestoneId: string) => {
    const result = await toggleMilestoneCompletion(milestoneId);
    if (result.success) {
      setMilestones((prevMilestones) =>
        prevMilestones.map((milestone) =>
          milestone.id === milestoneId
            ? { ...milestone, isCompleted: !milestone.isCompleted }
            : milestone
        )
      );
    }
  };

  const handleBetSubmit = async (milestoneId: string) => {
    const result = await createBet(betAmount, milestoneId);
    if (result.success) {
      setBetAmount(0);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  return (
    <div className="w-full max-w-2xl">
      {milestones.map((milestone) => (
        <Card
          key={milestone.id}
          className={`cursor-pointer hover:border-blue-500 transition-colors w-full max-w-2xl bg-[#F0D9A3] bg-opacity-50 font-roboto mb-4 rounded-xl border-2 border-[#F0D9A3] border-opacity-100`}
        >
          <CardHeader className="flex justify-between items-center">
            <div className="">
              <h4 className="font-semibold">{milestone.name}</h4>
              <p className="text-sm font-medium mt-2">Total Pot: 0.00</p>
            </div>
            <Button
              variant="outline"
              className={
                "bg-[#F0D9A3] text-[#000000] hover:bg-[#c78e07] hover:opacity-80 text-xs sm:text-sm cursor-pointer font-bold"
              }
              onClick={() => handleCompleted(milestone.id)}
            >
              {milestone.isCompleted ? "Completed" : "Mark Complete"}
            </Button>
          </CardHeader>
          {!milestone.isCompleted && (
            <CardContent className="flex justify-between items-center gap-2">
              <Input
                placeholder="Enter Bet Amount"
                type="number"
                min="1"
                step="1"
                className="text-xs sm:text-sm font-semibold"
                pattern="^[1-9][0-9]*$"
                onInput={(e) => {
                  const input = e.currentTarget;
                  if (!input.value.match(/^[1-9][0-9]*$/)) {
                    input.value = input.value.replace(/^0+|[^\d]/g, "");
                  }
                }}
                value={betAmount}
                onChange={(e) => setBetAmount(Number(e.target.value))}
              />
              <Button
                className="bg-[#F0CA61] text-[#000000] hover:bg-[#c78e07] hover:opacity-80 text-xs sm:text-sm cursor-pointer font-bold"
                onClick={() => handleBetSubmit(milestone.id)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Place Bet
              </Button>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
};
