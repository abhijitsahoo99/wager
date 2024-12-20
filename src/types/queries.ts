export type Group = {
  id: string;
  name: string;
  creatorId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type GroupMember = {
  id: string;
  userId: string;
  user: {
    name: string | null;
    image: string | null;
  };
};

export type GroupWithMembers = Group & {
  members: GroupMember[];
  _count?: {
    bets: number;
  };
  totalPot?: number;
};

