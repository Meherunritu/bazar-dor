"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export default function Profile() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) router.replace("/signin?msg=login-required");
  }, [isPending, session, router]);

  if (isPending || !session) return <div className="skeleton h-48 max-w-md mx-auto" />;
  const u = session.user;

  return (
    <div className="max-w-md mx-auto bg-white border border-base-300 rounded-2xl p-6 mt-4 text-center">
      <div className="avatar placeholder">
        <div className="bg-primary text-primary-content rounded-full w-20">
          {u.image ? <img src={u.image} alt={u.name} /> : <span className="text-3xl">{u.name?.[0]}</span>}
        </div>
      </div>
      <h1 className="text-2xl font-bold mt-3">{u.name}</h1>
      <p className="text-stone-600">{u.email}</p>
      <Link href="/profile/update" className="btn btn-primary mt-5">তথ্য আপডেট করুন</Link>
    </div>
  );
}
