"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textInput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { Purpose } from "@prisma/client";
import { ToastContainer, toast } from "react-toastify";
const sendPurpose: Purpose[] = [
  Purpose.Utility,
  Purpose["Bill_Sharing"],
  Purpose.Saving,
];

export default function SendCard() {
  const [amount, setAmount] = useState(0);
  const [number, setNumber] = useState<string>("");
  const [remark, setRemark] = useState("");
  const [purpose, setPurpose] = useState(sendPurpose[0] || "");

  const resetFiedls = () => {
    setAmount(0);
    setNumber("");
    setRemark("");
    setPurpose(sendPurpose[0] || "");
  };
  const handleOnClick = async () => {
    console.log("here");
    const res = await p2pTransfer(
      number,
      Number(amount) * 100,
      remark,
      purpose as Purpose
    );
    console.log(res);
    if (res.success == "success") {
      resetFiedls();
      toast.success(res.message);
    }
    if (res.success == "error") {
      toast.error(res.message);
    }
  };
  return (
    <>
      <div className="h-[90vh]">
        <Center>
          <Card title="Send">
            <div className="flex flex-col ">
              <div>
                <TextInput
                  placeholder="Number"
                  value={number}
                  label="Number"
                  onChange={(value) => {
                    setNumber(value);
                  }}
                ></TextInput>
              </div>
              <div>
                <TextInput
                  placeholder="Amount"
                  value={amount}
                  label="Amount"
                  onChange={(value) => {
                    setAmount(Number(value));
                  }}
                ></TextInput>
              </div>
              <div>
                <TextInput
                  placeholder="Remarks"
                  value={remark}
                  label="Remarks"
                  onChange={(value) => {
                    setRemark(value);
                  }}
                ></TextInput>
              </div>
              <label className="block mb-2 text-sm font-medium text-gray-900 mt-2">
                Purpose
              </label>
              <Select
                onSelect={(value) => {
                  setPurpose(value as Purpose);
                }}
                options={sendPurpose.map((x) => ({
                  key: x,
                  value: x,
                }))}
              ></Select>
              <div className="pt-4 flex justify-center">
                <Button onClick={handleOnClick}>Send</Button>
              </div>
            </div>
          </Card>
        </Center>
      </div>
    </>
  );
}
