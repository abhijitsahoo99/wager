"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Loader2, Plus } from "lucide-react";
import { getMilestones, getMilestoneTotalPot } from "@/server/milestone";
import { Milestone } from "@prisma/client";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toggleMilestoneCompletion } from "@/server/milestone";
import { createBet } from "@/server/bet";
import BetList from "./betList";

export const MilestoneList = ({ groupId }: { groupId: string }) => {
  const router = useRouter();
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMilestones, setLoadingMilestones] = useState<
    Record<string, boolean>
  >({});
  const [betAmounts, setBetAmounts] = useState<Record<string, number>>({});
  const [totalPots, setTotalPots] = useState<Record<string, number>>({});

  const fetchMilestonePot = async (milestoneId: string) => {
    const total = await getMilestoneTotalPot(milestoneId);
    setTotalPots((prev) => ({
      ...prev,
      [milestoneId]: total,
    }));
  };

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        setLoading(true);
        const result = await getMilestones(groupId);
        if (result) {
          setMilestones(result);
          result.forEach(async (milestone) => {
            await fetchMilestonePot(milestone.id);
          });
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
    setLoadingMilestones((prev) => ({
      ...prev,
      [milestoneId]: true,
    }));

    const result = await createBet(betAmounts[milestoneId] || 0, milestoneId);
    if (result.success) {
      setBetAmounts((prev) => ({
        ...prev,
        [milestoneId]: 0,
      }));
      await fetchMilestonePot(milestoneId);
    }

    setLoadingMilestones((prev) => ({
      ...prev,
      [milestoneId]: false,
    }));
  };

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
              <p className="text-sm font-medium mt-2">
                Total Pot: {totalPots[milestone.id]?.toFixed(2) || "0.00"}
              </p>
            </div>
            <Button
              variant="outline"
              className={
                "bg-[#F0D9A3] text-[#000000] hover:bg-[#c78e07] hover:opacity-80 text-xs sm:text-sm cursor-pointer font-bold rounded-xl"
              }
              onClick={() => handleCompleted(milestone.id)}
            >
              {milestone.isCompleted ? "Completed" : "Mark Complete"}
            </Button>
          </CardHeader>
          {!milestone.isCompleted && (
            <CardContent className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter Bet Amount"
                  type="number"
                  min="1"
                  step="1"
                  className="text-xs sm:text-sm font-semibold rounded-xl"
                  pattern="^[1-9][0-9]*$"
                  onInput={(e) => {
                    const input = e.currentTarget;
                    if (!input.value.match(/^[1-9][0-9]*$/)) {
                      input.value = input.value.replace(/^0+|[^\d]/g, "");
                    }
                  }}
                  value={betAmounts[milestone.id] || ""}
                  onChange={(e) =>
                    setBetAmounts((prev) => ({
                      ...prev,
                      [milestone.id]: Number(e.target.value),
                    }))
                  }
                />
                <Button
                  className="bg-[#F0CA61] text-[#000000] hover:bg-[#c78e07] hover:opacity-80 text-xs sm:text-sm cursor-pointer font-bold rounded-xl"
                  onClick={() => {
                    handleBetSubmit(milestone.id);
                    window.location.reload();
                  }}
                  disabled={loadingMilestones[milestone.id]}
                >
                  {loadingMilestones[milestone.id] ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Plus className="h-4 w-4 mr-2" />
                  )}
                  Place Bet
                </Button>
              </div>
              <BetList milestoneId={milestone.id} key={milestone.id} />
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
};
