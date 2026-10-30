"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const MESSAGES = {
  "login-required": "এই পাতা দেখতে আগে সাইন ইন করুন",
};

export default function ToastFromUrl() {
  const params = useSearchParams();
  const msg = params.get("msg");
  useEffect(() => {
    if (msg && MESSAGES[msg]) toast.error(MESSAGES[msg], { id: msg });
  }, [msg]);
  return null;
}
