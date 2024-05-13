"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
import { Purpose } from "@prisma/client";
export async function p2pTransfer(
  to: string,
  amount: number,
  remarks: string,
  purpose: Purpose
) {
  try {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if (!from) {
      throw new Error("Error While Sending");
    }
    const toUser = await prisma.user.findFirst({
      where: { number: to },
    });

    if (!toUser) {
      throw new Error("Receiver User Not Found");
    }
    // TODO: Add the db lock and also update the p2p table and handle the errors
    await prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)}`;
      const fromBalance = await tx.balance.findUnique({
        where: { userId: Number(from) },
      });
      if (!fromBalance || fromBalance.amount < amount) {
        throw new Error("Insufficient funds");
      }
      await tx.balance.update({
        where: { userId: Number(from) },
        data: { amount: { decrement: amount } },
      });

      await tx.balance.update({
        where: { userId: toUser.id },
        data: { amount: { increment: amount } },
      });
      await tx.p2pTransfer.create({
        data: {
          fromUserId: Number(from),
          toUserId: toUser.id,
          amount,
          timestamp: new Date(),
          remarks,
          purpose,
        },
      });
    });
    return {
      success: "success",
      message: "Transfer successful",
    };
  } catch (error: any) {
    return {
      success: "error",
      message: error.message || "An unknown error occured",
    };
  }
}
