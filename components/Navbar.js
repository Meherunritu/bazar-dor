"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { CATEGORIES } from "@/lib/api";
import { banglaDate } from "@/lib/format";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [date, setDate] = useState("");
  useEffect(() => setDate(banglaDate()), []);

  const signOut = async () => {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
  };

  return (
    <header className="bg-white border-b border-base-300">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <Link href="/" className="leading-tight">
          <div className="text-xl sm:text-2xl font-bold text-primary">🛒 বাজার দর</div>
          <div className="text-xs text-stone-500 min-h-4">{date}</div>
        </Link>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="skeleton h-8 w-24" />
          ) : session ? (
            <>
              <Link href="/profile" className="btn btn-sm sm:btn-md btn-ghost">👤 {session.user.name?.split(" ")[0]}</Link>
              <button onClick={signOut} className="btn btn-sm sm:btn-md btn-outline btn-primary">সাইন আউট</button>
            </>
          ) : (
            <>
              <Link href="/signin" className="btn btn-sm sm:btn-md btn-outline btn-primary">সাইন ইন</Link>
              <Link href="/signup" className="btn btn-sm sm:btn-md btn-primary">সাইন আপ</Link>
            </>
          )}
        </div>
      </div>

      <nav className="border-t border-base-300 bg-base-100">
        <div className="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto">
          <Link href="/" className={`px-3 py-2 whitespace-nowrap text-sm border-b-2 ${pathname === "/" ? "border-primary text-primary font-semibold" : "border-transparent hover:text-primary"}`}>হোম</Link>
          {CATEGORIES.map((c) => {
            const active = pathname === `/category/${c.slug}`;
            return (
              <Link key={c.slug} href={`/category/${c.slug}`}
                className={`px-3 py-2 whitespace-nowrap text-sm border-b-2 ${active ? "border-primary text-primary font-semibold bg-green-50" : "border-transparent hover:text-primary"}`}>
                {c.icon} {c.nameBn}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
