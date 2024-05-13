import { getServerSession } from "next-auth";
import SendCard from "../../../components/SendCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import { P2PTransaction } from "../../../components/P2PTransaction";
import { Center } from "@repo/ui/center";

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getP2PTransactions() {
  const session = await getServerSession(authOptions);
  const transactions = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: Number(session?.user?.id),
    },
    include: {
      fromUser: {
        select: {
          name: true,
        },
      },
      toUser: {
        select: {
          name: true,
        },
      },
    },
  });
  console.log(transactions);
  return transactions.map((t) => ({
    starttime: t.timestamp,
    amount: t.amount,
    sender: t.fromUser.name || "",
    receiver: t.toUser.name || "",
  }));
}
export default async function () {
  const balance = await getBalance();
  const transactions = await getP2PTransactions();
  return (
    <div className="w-full">
      <div className="grid grid-cols-2">
        <SendCard />
        <Center>
          <P2PTransaction transactions={transactions}/>
        </Center>
      </div>
    </div>
  );
}
