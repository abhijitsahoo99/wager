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
