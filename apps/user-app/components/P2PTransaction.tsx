import { Card } from "@repo/ui/card";

export const P2PTransaction = ({
  transactions,
}: {
  transactions: {
    starttime: Date;
    amount: number;
    sender: string;
    receiver: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <>
      <Card title="Recent Transactions">
        <div className="pt-2">
          <div className="grid grid-cols-4 text-xl  border-b pb-2 mb-2 text-center">
            <div>Date</div>
            <div>Sender</div>
            <div>Receiver</div>
            <div>Amount</div>
          </div>
          {transactions.map((t) => (
            <div className="grid grid-cols-4 mb-2 ">
              <div>
                <div className="text-sm">Received NPR</div>
                <div className="text-slate-600 text-xs">
                  {t.starttime.toDateString()}
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">{t.sender}</div>
              <div className="flex flex-col justify-center items-center">{t.receiver}</div>
              <div className="flex flex-col justify-center items-center">
                + Rs {t.amount / 100}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
};
