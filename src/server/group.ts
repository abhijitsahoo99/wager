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
