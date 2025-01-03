"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const createMilestone = async (name: string, groupId: string) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    const milestone = await prisma.milestone.create({
      data: { name, groupId: groupId },
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to create milestone" };
  }
};

export const getMilestones = async (groupId: string) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }
    const milestones = await prisma.milestone.findMany({
      where: {
        groupId: groupId,
      },
    });
    return milestones;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getMilestoneCompleted = async (milestoneId: string) => {
  try {
    const milestone = await prisma.milestone.findUnique({
      where: { id: milestoneId },
    });
    return milestone?.isCompleted ?? false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const toggleMilestoneCompletion = async (milestoneId: string) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }
    const milestone = await prisma.milestone.findUnique({
      where: { id: milestoneId },
    });
    const updateMilestone = await prisma.milestone.update({
      where: { id: milestoneId },
      data: {
        isCompleted: !milestone?.isCompleted,
        completedAt: milestone?.isCompleted ? null : new Date(),
      },
    });
    return { success: true, isCompleted: updateMilestone.isCompleted };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to update milestone completion status",
    };
  }
};

export const getMilestoneTotalPot = async (milestoneId: string) => {
  try {
    const bets = await prisma.bet.findMany({
      where: {
        milestoneId: milestoneId,
      },
    });

    return bets.reduce((total, bet) => total + bet.amount, 0);
  } catch (error) {
    console.error("Error fetching milestone total pot:", error);
    return 0;
  }
};
