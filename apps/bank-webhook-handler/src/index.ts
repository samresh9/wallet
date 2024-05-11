import express from "express";
import db from "@repo/db/client";
const app = express();
app.use(express.json());
app.post("/bankWebhook", async (req, res) => {
  //TODO:Zod validation
  console.log(req.body);
  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };
  try {
    const dbData = await db.onRampTransaction.findFirst({
      where: { token: paymentInformation.token },
    });

    console.log(dbData, "db");
    if (dbData?.amount !== paymentInformation.amount) {
      throw new Error("Amount donot match");
    }

    await db.$transaction([
      //update the balance on db
      db.balance.update({
        where: {
          userId: paymentInformation.userId,
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
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error occurred";
    res.status(411).json({
      message: "Error while processing webhook",
      error: errorMessage,
    });
  }
});

app.listen(3003, () => {
  console.log("server started at 3003");
});
