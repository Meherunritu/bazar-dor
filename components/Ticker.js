"use client";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/api";
import { bnPrice, pctText, unitBn } from "@/lib/format";

export default function Ticker() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetchProducts().then((d) => setItems(Array.isArray(d) ? d : [])).catch(() => {});
  }, []);

  if (!items.length) return <div className="h-9 bg-stone-900" />;

  const row = items.map((p, i) => (
    <span key={i} className="mx-5 whitespace-nowrap text-sm text-stone-100">
      {p.image} {p.nameBn} {bnPrice(p.today)} টাকা/{unitBn(p.unit).replace("প্রতি ", "")}{" "}
      <span className={p.change.dir === "up" ? "text-green-400" : p.change.dir === "down" ? "text-red-400" : "text-stone-400"}>
        {pctText(p.change)}
      </span>
    </span>
  ));

  return (
    <div className="marquee bg-stone-900 overflow-hidden py-2">
      <div className="marquee-track">
        <div className="flex">{row}</div>
        <div className="flex" aria-hidden="true">{row}</div>
      </div>
    </div>
  );
}
