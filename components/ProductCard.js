import Link from "next/link";
import { bnPrice, changeClass, pctText, unitBn } from "@/lib/format";

export default function ProductCard({ p }) {
  return (
    <Link href={`/product/${p.slug}`} className="card bg-white border border-base-300 hover:border-primary hover:shadow-md transition">
      <div className="card-body p-4 gap-1">
        <div className="text-4xl">{p.image}</div>
        <h3 className="font-semibold text-lg mt-1">{p.nameBn}</h3>
        <p className="text-sm text-stone-500">{unitBn(p.unit)}</p>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-base-300">
          <div>
            <div className="text-xs text-stone-500">আজকের দাম</div>
            <div className="font-bold">{bnPrice(p.today)} টাকা</div>
          </div>
          <span className={`badge border-0 font-medium ${changeClass(p.change.dir)}`}>{pctText(p.change)}</span>
        </div>
      </div>
    </Link>
  );
}

export function CardSkeletons({ n = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: n }).map((_, i) => <div key={i} className="skeleton h-40 w-full" />)}
    </div>
  );
}

export function ProductGrid({ items }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((p) => <ProductCard key={p.id} p={p} />)}
    </div>
  );
}
