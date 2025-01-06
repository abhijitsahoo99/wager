"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const createInvitation = async (params: { groupId: string }) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    // Check if user is member of the group
    const isMember = await prisma.groupMember.findFirst({
      where: {
        groupId: params.groupId,
        userId: session.user.id,
      },
    });

    if (!isMember) {
      throw new Error("Not authorized to create invites for this group");
    }

    const invitation = await prisma.invitation.create({
      data: {
        groupId: params.groupId,
        token: crypto.randomUUID(),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
      },
    });

    const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL}/invite/${invitation.token}`;
    return { success: true, inviteUrl };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to create invitation" };
  }
};

export const processInvitation = async (token: string) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    // Use transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // Verify invitation
      const invitation = await tx.invitation.findFirst({
        where: {
          token,
          expiresAt: {
            gt: new Date(),
          },
          // Only find unused invitations
          usedAt: null,
        },
        include: {
          group: true,
        },
      });

      if (!invitation) {
        throw new Error("Invalid or expired invitation");
      }

      // Check if already a member
      const existingMember = await tx.groupMember.findUnique({
        where: {
          userId_groupId: {
            userId: session.user.id,
            groupId: invitation.groupId,
          },
        },
      });

      if (existingMember) {
        return {
          success: true,
          groupId: invitation.groupId,
          groupName: invitation.group.name,
        };
      }

      // Add user to group
      await tx.groupMember.create({
        data: {
          userId: session.user.id,
          groupId: invitation.groupId,
        },
      });

      // Mark invitation as used
      await tx.invitation.update({
        where: { id: invitation.id },
        data: {
          usedAt: new Date(),
          usedBy: session.user.id,
        },
      });

      return {
        success: true,
        groupId: invitation.groupId,
        groupName: invitation.group.name,
      };
    });

    return result;
  } catch (error) {
    console.error("Process invitation error:", error);
    return { success: false, error: "Failed to process invitation" };
  }
};
