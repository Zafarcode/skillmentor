"use client";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import * as React from "react";

const LoginForm = () => {
  const [value, setValue] = React.useState("");

  return (
    <div className="space-y-2">
      <InputOTP maxLength={6} value={value} onChange={(value) => setValue(value)} disabled={value.length === 6}>
        <InputOTPGroup>
          <InputOTPSlot className="dark:border-white" index={0} />
        </InputOTPGroup>
        <InputOTPGroup>
          <InputOTPSlot className="dark:border-white" index={1} />
        </InputOTPGroup>
        <InputOTPGroup>
          <InputOTPSlot className="dark:border-white" index={2} />
        </InputOTPGroup>
        <InputOTPGroup>
          <InputOTPSlot className="dark:border-white" index={3} />
        </InputOTPGroup>
        <InputOTPGroup>
          <InputOTPSlot className="dark:border-white" index={4} />
        </InputOTPGroup>
        <InputOTPGroup>
          <InputOTPSlot className="dark:border-white" index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
};

export default LoginForm;
