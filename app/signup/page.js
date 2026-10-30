"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const f = new FormData(e.currentTarget);
    const name = f.get("name"), email = f.get("email"), password = f.get("password");
    if (!name || !email || !password) { const m = "সব ঘর পূরণ করুন"; setError(m); toast.error(m); return; }
    if (password.length < 8) { const m = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে"; setError(m); toast.error(m); return; }
    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);
    if (error) { const m = error.message || "সাইন আপ ব্যর্থ হয়েছে"; setError(m); toast.error(m); return; }
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এবার সাইন ইন করুন");
    router.push("/signin");
  };

  const social = (provider) => authClient.signIn.social({ provider, callbackURL: "/" });

  return (
    <div className="max-w-md mx-auto bg-white border border-base-300 rounded-2xl p-6 mt-4">
      <h1 className="text-2xl font-bold mb-4">সাইন আপ</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input name="name" type="text" placeholder="নাম" className="input input-bordered w-full" />
        <input name="email" type="email" placeholder="ইমেইল" className="input input-bordered w-full" />
        <input name="password" type="password" placeholder="পাসওয়ার্ড (কমপক্ষে ৮ অক্ষর)" className="input input-bordered w-full" />
        {error && <p className="text-error text-sm">{error}</p>}
        <button className="btn btn-primary w-full" disabled={loading}>{loading ? "অপেক্ষা করুন..." : "সাইন আপ"}</button>
      </form>
      <div className="divider text-sm">অথবা</div>
      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => social("google")} className="btn btn-outline">Google</button>
        <button onClick={() => social("github")} className="btn btn-outline">GitHub</button>
      </div>
      <p className="text-sm mt-4 text-center">আগেই অ্যাকাউন্ট আছে? <Link href="/signin" className="text-primary font-medium">সাইন ইন করুন</Link></p>
    </div>
  );
}
