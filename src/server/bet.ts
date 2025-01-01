"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const createBet = async (amount: number, milestoneId: string) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    const bet = await prisma.bet.create({
      data: {
        amount,
        milestoneId,
        userId: session.user.id,
      },
    });
    return { success: true, bet };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to create bet" };
  }
};
