"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const createGroup = async (name: string) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    const group = await prisma.group.create({
      data: {
        name,
        creatorId: session.user.id,
        members: {
          create: {
            userId: session.user.id,
          },
        },
      },
    });
    return { success: true, group };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to create group" };
  }
};

export const getGroups = async () => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    const groups = await prisma.group.findMany({
      where: {
        members: {
          some: {
            userId: session.user.id,
          },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
        // bets: true,
      },
    });

    // Calculate total pot for each group
    // const groupsWithTotalPot = groups.map(group => ({
    //   ...group,
    //   totalPot: group.bets.reduce((sum, bet) => sum + bet.amount, 0),
    // }));

    return { success: true, groups };
  } catch (error) {
    console.error("Failed to fetch groups:", error);
    return { success: false, error: "Failed to fetch groups" };
  }
};

export const getGroupByName = async (groupName: string) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    const group = await prisma.group.findFirst({
      where: {
        name: groupName,
        members: {
          some: {
            userId: session.user.id,
          },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (!group) {
      return { success: false, error: "Group not found" };
    }

    return { success: true, group };
  } catch (error) {
    console.error("Failed to fetch group:", error);
    return { success: false, error: "Failed to fetch group" };
  }
};
