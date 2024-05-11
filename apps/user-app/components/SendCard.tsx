"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textInput";
import { useState } from "react";

const sendPurpose = ["Utility", "Bill Sharing", "Saving"];

export default function SendCard() {
  const [amount, setAmount] = useState(0);
  const [number, setNumber] = useState(0);
  const [remark, setRemark] = useState("");
  const [purpose, setPurpose] = useState(sendPurpose[0] || "");
  return (
    <>
      <div className="h-[90vh]">
        <Center>
          <Card title="Send">
            <div className="flex flex-col ">
              <div>
                <TextInput
                  placeholder="Number"
                  label="Number"
                  onChange={(value) => {
                    setNumber(Number(value));
                  }}
                ></TextInput>
              </div>
              <div>
                <TextInput
                  placeholder="Amount"
                  label="Amount"
                  onChange={(value) => {
                    setAmount(Number(value));
                  }}
                ></TextInput>
              </div>
              <div>
                <TextInput
                  placeholder="Remarks"
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
                    setPurpose(value);
                  }}
                  options={sendPurpose.map((x) => ({
                    key: x,
                    value: x,
                  }))}
                ></Select>
           
              <div className="pt-4 flex justify-center">
                <Button onClick={() => {}}>Send</Button>
              </div>
            </div>
          </Card>
        </Center>
      </div>
    </>
  );
}
