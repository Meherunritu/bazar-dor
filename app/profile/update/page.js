"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfile() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) router.replace("/signin?msg=login-required");
    if (session) setName(session.user.name || "");
  }, [isPending, session, router]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("নাম দিন");
    setLoading(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setLoading(false);
    if (error) return toast.error(error.message || "আপডেট ব্যর্থ হয়েছে");
    toast.success("তথ্য আপডেট হয়েছে");
    router.push("/profile");
  };

  if (isPending || !session) return <div className="skeleton h-48 max-w-md mx-auto" />;

  return (
    <div className="max-w-md mx-auto bg-white border border-base-300 rounded-2xl p-6 mt-4">
      <h1 className="text-2xl font-bold mb-4">তথ্য আপডেট করুন</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input value={name} onChange={(e) => setName(e.target.value)} className="input input-bordered w-full" placeholder="নাম" />
        <button className="btn btn-primary w-full" disabled={loading}>{loading ? "অপেক্ষা করুন..." : "তথ্য আপডেট করুন"}</button>
      </form>
    </div>
  );
}
