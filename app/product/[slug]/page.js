import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchProducts } from "@/lib/api";
import { bnPrice, changeClass, pctText, unitBn, toBn } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }) {
  const session = await auth.api.getSession({ headers: headers() });
  if (!session) redirect("/signin?msg=login-required");

  let products = [];
  try { products = await fetchProducts(); } catch { /* handled below */ }
  const p = products.find((x) => x.slug === params.slug);
  if (!p) notFound();

  const mins = p.markets.map((m) => m.min);
  const maxs = p.markets.map((m) => m.max);
  const min = Math.min(...mins);
  const max = Math.max(...maxs);
  const avg = Math.round(p.markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) / p.markets.length);

  const byDivision = {};
  p.markets.forEach((m) => { (byDivision[m.division] ||= []).push(m); });

  return (
    <div>
      <Link href={`/category/${p.category}`} className="text-sm text-primary">← {p.categoryNameBn}</Link>

      <div className="bg-white border border-base-300 rounded-2xl p-6 mt-3">
        <div className="flex items-start gap-4">
          <div className="text-6xl">{p.image}</div>
          <div>
            <h1 className="text-3xl font-bold">{p.nameBn}</h1>
            <p className="text-stone-600 mt-1">
              আজকের গড় দাম {bnPrice(p.today)} টাকা, গতকাল ছিল {bnPrice(p.yesterday)} টাকা।
            </p>
            <div className="flex flex-wrap gap-2 mt-3 items-center">
              <span className="badge badge-outline">{p.categoryIcon} {p.categoryNameBn}</span>
              <span className="badge badge-outline">{unitBn(p.unit)}</span>
              <span className={`badge border-0 ${changeClass(p.change.dir)}`}>{pctText(p.change)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-6 text-center">
          {[["সর্বনিম্ন দাম", min], ["সর্বোচ্চ দাম", max], ["গড় দাম", avg]].map(([label, v]) => (
            <div key={label} className="bg-base-200 rounded-xl p-3">
              <div className="text-xs sm:text-sm text-stone-500">{label}</div>
              <div className="text-lg sm:text-2xl font-bold">{bnPrice(v)} টাকা</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 mt-3 text-center text-sm text-stone-600">
          <div>গতকাল: {bnPrice(p.yesterday)}</div>
          <div>গত সপ্তাহ: {bnPrice(p.lastWeek)}</div>
          <div>গত মাস: {bnPrice(p.lastMonth)}</div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-3">বাজারভিত্তিক আজকের দাম</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {Object.entries(byDivision).map(([division, list]) => (
          <div key={division} className="bg-white border border-base-300 rounded-2xl p-4">
            <h3 className="font-semibold mb-2">{division} বিভাগ <span className="text-stone-400 text-sm">({toBn(list.length)}টি বাজার)</span></h3>
            <table className="table table-sm">
              <thead><tr><th>বাজার</th><th className="text-right">সর্বনিম্ন</th><th className="text-right">সর্বোচ্চ</th></tr></thead>
              <tbody>
                {list.map((m) => (
                  <tr key={m.market}>
                    <td>{m.market}</td>
                    <td className="text-right">{bnPrice(m.min)}</td>
                    <td className="text-right">{bnPrice(m.max)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
