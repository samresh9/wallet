import { Card } from "@repo/ui/card";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    starttime: Date;
    amount: number;
    status: string;
    provider: string;
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
          <div className="grid grid-cols-3 text-2xl  border-b pb-2 mb-2"> 
          <div>Date</div>
          <div>Status</div>
          <div>Amount</div>
          </div>
          {transactions.map((t) => (
            <div className="grid grid-cols-3 mb-2 ">
              <div>
                <div className="text-sm">Received NPR</div>
                <div className="text-slate-600 text-xs">
                  {t.starttime.toDateString()}
                </div>
              </div>
              <div>
                {/* <div className="text-sm">Status</div> */}
                <div
                  className={`text-xl flex flex-col justify-center ${t.status === "Success" ? "text-green-500" : "text-red-500"}`}
                >
                  {t.status}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                + Rs {t.amount / 100}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
};
