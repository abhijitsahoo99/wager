export type NavBarProps = {
  user: {
    name?: string | null;
    image?: string | null;
    email?: string | null;
  } | null;
};

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
    id: string;
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

export type BetWithUser = {
  id: string;
  amount: number;
  milestoneId: string;
  userId: string;
  createdAt: Date;
  user: {
    name: string | null;
    email: string | null;
  };
};
