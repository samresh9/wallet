"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textInput";
import { useState } from "react";
import { createOnRampTransaction } from "../app/lib/actions/createOnRampTransaction";

const SUPPORTED_BANKS = [
  {
    name: "MBL Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "NMB Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [amount, setAmount] = useState(0);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [error, setError] = useState();
  const handleOnClick = async () => {
    try {
      await createOnRampTransaction(provider, amount);
      window.location.href = redirectUrl || "";
    } catch (err: any) {
      setError(err.message);
    }
  };
  return (
    <>
      <Card title="Add Money">
        <div className="w-full">
          <TextInput
            placeholder="Amount"
            label="Amount "
            onChange={(amount) => {
              setAmount(Number(amount));
            }}
          />
          <div className="py-4 text-left">Bank</div>
          <Select
            onSelect={(value) => {
              setRedirectUrl(
                SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
              );
              setProvider(
                SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
              );
            }}
            options={SUPPORTED_BANKS.map((x) => ({
              key: x.name,
              value: x.name,
            }))}
          />
        
          <div className=" flex justify-center pt-4">
            <Button
              onClick={async () => {
                handleOnClick();
              }}
            >
              Add Money
            </Button>
          </div>
        </div>
        {error ? <div className="text-red-700 text-2xl flex justify-center">{error}</div> : null}
      </Card>
    </>
  );
};
