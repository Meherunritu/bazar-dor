"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const f = new FormData(e.currentTarget);
    const email = f.get("email"), password = f.get("password");
    if (!email || !password) { const m = "ইমেইল ও পাসওয়ার্ড দিন"; setError(m); toast.error(m); return; }
    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);
    if (error) { const m = error.message || "সাইন ইন ব্যর্থ হয়েছে"; setError(m); toast.error(m); return; }
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push("/");
    router.refresh();
  };

  const social = (provider) => authClient.signIn.social({ provider, callbackURL: "/" });

  return (
    <div className="max-w-md mx-auto bg-white border border-base-300 rounded-2xl p-6 mt-4">
      <h1 className="text-2xl font-bold mb-4">সাইন ইন</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input name="email" type="email" placeholder="ইমেইল" className="input input-bordered w-full" />
        <input name="password" type="password" placeholder="পাসওয়ার্ড" className="input input-bordered w-full" />
        {error && <p className="text-error text-sm">{error}</p>}
        <button className="btn btn-primary w-full" disabled={loading}>{loading ? "অপেক্ষা করুন..." : "সাইন ইন"}</button>
      </form>
      <div className="divider text-sm">অথবা</div>
      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => social("google")} className="btn btn-outline">Google</button>
        <button onClick={() => social("github")} className="btn btn-outline">GitHub</button>
      </div>
      <p className="text-sm mt-4 text-center">অ্যাকাউন্ট নেই? <Link href="/signup" className="text-primary font-medium">সাইন আপ করুন</Link></p>
    </div>
  );
}
