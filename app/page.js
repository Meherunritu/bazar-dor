"use client";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/api";
import { CardSkeletons, ProductGrid } from "@/components/ProductCard";

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="mt-10 scroll-mt-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      {subtitle && <p className="text-stone-500 mb-4">{subtitle}</p>}
      <div className={subtitle ? "" : "mt-4"}>{children}</div>
    </section>
  );
}

export default function Home() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(() => setError(true));
  }, []);

  const risers = products ? products.filter((p) => p.change.dir === "up").sort((a, b) => b.change.pct - a.change.pct).slice(0, 6) : [];
  const fallers = products ? products.filter((p) => p.change.dir === "down").sort((a, b) => a.change.pct - b.change.pct).slice(0, 6) : [];

  return (
    <>
      {/* Hero */}
      <section className="grid md:grid-cols-2 gap-8 items-center bg-white border border-base-300 rounded-2xl p-6 md:p-10">
        <div>
          <p className="text-primary font-medium">আজকের বাজার, আপনার হাতের মুঠোয়</p>
          <h1 className="text-3xl md:text-5xl font-bold mt-2 leading-tight">নিত্যপ্রয়োজনীয় পণ্যের দাম এক নজরে</h1>
          <p className="text-stone-600 mt-4">দেশের বিভিন্ন বাজারের চাল, ডাল, তেল, সবজি, মাছ ও মাংসের আজকের দর দেখুন এবং গতকালের সাথে তুলনা করুন।</p>
          <a href="#সব-পণ্য" className="btn btn-primary mt-6">সব পণ্য দেখুন</a>
        </div>
        <div className="grid grid-cols-4 gap-3 text-5xl md:text-6xl justify-items-center bg-base-200 rounded-2xl p-6" aria-hidden="true">
          {["🍚", "🫘", "🛢️", "🥬", "🐟", "🍗", "🥛", "🌶️"].map((e) => <span key={e}>{e}</span>)}
        </div>
      </section>

      {error && <div className="alert alert-error mt-6">ডেটা লোড করা যায়নি। পরে আবার চেষ্টা করুন।</div>}

      <Section title="আজ দাম বেড়েছে ▲">
        {!products ? <CardSkeletons /> : <ProductGrid items={risers} />}
      </Section>
      <Section title="আজ দাম কমেছে ▼">
        {!products ? <CardSkeletons /> : <ProductGrid items={fallers} />}
      </Section>
      <Section id="সব-পণ্য" title="সব পণ্য" subtitle="যেকোনো পণ্যে ক্লিক করে বাজারভিত্তিক দাম দেখুন">
        {!products ? <CardSkeletons n={8} /> : <ProductGrid items={products} />}
      </Section>
    </>
  );
}
