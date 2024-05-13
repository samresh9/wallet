"use server";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnRampTransaction(
  provider: string,
  amount: number
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id) {
      return {
        message: "Unauthenticated request",
      };
    }
    if (!amount) {
      return {
        message: "Please Provide Amount",
      };
    }
    //here in actual system token should come from the bank
    const token = (Math.random() * 1000).toString();
    await prisma.onRampTransaction.create({
      data: {
        token: token,
        userId: Number(session?.user?.id),
        amount: amount,
        status: "Processing",
        startTime: new Date(),
        provider,
      },
    });
    return {
      message: "Done",
    };
  } catch (error) {
    throw new Error("Unable to process ! Try again later");
  }
}
