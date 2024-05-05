import express from "express";
import db from "@repo/db/client";
const app = express();

app.post("/bankWebhook", async (req, res) => {
  //TODO:Zod validation
  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };
  try {
    await db.$transaction([
      //update the balance on db
      db.balance.update({
        where: {
          userId: userId,
        },
        data: {
          amount: {
            increment: paymentInformation.amount,
          },
        },
      }),
      db.onRampTransaction.update({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    res.json({
      message: "captured",
    });
  } catch (err) {
    console.log(err);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});
