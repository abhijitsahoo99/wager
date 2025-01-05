"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { getBets } from "@/server/bet";
import { BetWithUser } from "@/types/queries";

const BetList = ({ milestoneId }: { milestoneId: string }) => {
  const [loading, setLoading] = useState(true);
  const [bets, setBets] = useState<BetWithUser[]>([]);

  useEffect(() => {
    const fetchBets = async () => {
      try {
        setLoading(true);
        const bets = await getBets(milestoneId);
        if (bets) {
          console.log(bets);
          setBets(bets);
        }
      } catch (error) {
        console.error("Failed to fetch bets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBets();
  }, [milestoneId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Card
        className={`cursor-pointer hover:border-blue-500 transition-colors w-full max-w-2xl bg-[#F0D9A3] bg-opacity-50 font-roboto mb-4 rounded-xl border-2 border-[#F0D9A3] border-opacity-100 p-4`}
      >
        <CardHeader>
          <CardTitle className="text-base font-bold p-0">Bet List</CardTitle>
        </CardHeader>
        {bets.map((bet) => (
          <CardContent
            key={bet.id}
            className="flex justify-between border-2 border-[#F0D9A3] border-opacity-100 rounded-xl py-2 mb-2"
          >
            <p>{bet.user.name || bet.user.email || "Anonymous"}</p>
            <p>{bet.amount.toFixed(2)}</p>
          </CardContent>
        ))}
        <CardContent className="flex justify-between border-2 border-[#F0D9A3] border-opacity-100 rounded-xl py-2">
          <p className="text-base font-bold">Total</p>
          <p className="text-base font-bold">
            {bets.reduce((total, bet) => total + bet.amount, 0).toFixed(2)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BetList;
