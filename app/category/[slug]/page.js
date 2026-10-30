"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { CATEGORIES, fetchProducts } from "@/lib/api";
import { CardSkeletons, ProductGrid } from "@/components/ProductCard";
import NotFoundBox from "@/components/NotFoundBox";

export default function CategoryPage() {
  const { slug } = useParams();
  const category = CATEGORIES.find((c) => c.slug === slug);
  const [items, setItems] = useState(null);
  const [sort, setSort] = useState("default");

  useEffect(() => {
    if (!category) { setItems([]); return; }
    setItems(null);
    fetchProducts(slug).then((d) => setItems(Array.isArray(d) ? d : [])).catch(() => setItems([]));
  }, [slug]);

  // prices are numbers in the API, so this sorts numerically (not as strings)
  const sorted = useMemo(() => {
    if (!items) return null;
    const list = [...items];
    if (sort === "asc") list.sort((a, b) => Number(a.today) - Number(b.today));
    if (sort === "desc") list.sort((a, b) => Number(b.today) - Number(a.today));
    return list;
  }, [items, sort]);

  if (!category) return <NotFoundBox text="এই ক্যাটাগরিটি খুঁজে পাওয়া যায়নি।" />;
  if (sorted && sorted.length === 0) return <NotFoundBox text="এই ক্যাটাগরিতে কোনো পণ্য নেই।" />;

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <h1 className="text-3xl font-bold">{category.icon} {category.nameBn}</h1>
        <label className="flex items-center gap-2">
          <span className="text-sm text-stone-600">সাজান:</span>
          <select className="select select-bordered select-sm sm:select-md" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>
      {!sorted ? <CardSkeletons n={8} /> : <ProductGrid items={sorted} />}
    </>
  );
}
