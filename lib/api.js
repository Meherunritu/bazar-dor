const BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.api-store.workers.dev/api/bazardor";

async function get(path) {
  const res = await fetch(`${BASE}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error("API error " + res.status);
  return res.json();
}

export const fetchProducts = (category) =>
  get(category ? `/products?category=${encodeURIComponent(category)}` : "/products");
export const fetchProduct = (slugOrId) => get(`/products/${encodeURIComponent(slugOrId)}`);

export const CATEGORIES = [
  { slug: "chal", nameBn: "চাল", icon: "🍚" },
  { slug: "dal", nameBn: "ডাল", icon: "🫘" },
  { slug: "tel", nameBn: "তেল", icon: "🛢️" },
  { slug: "sobji", nameBn: "সবজি", icon: "🥬" },
  { slug: "mach", nameBn: "মাছ", icon: "🐟" },
  { slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
  { slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
  { slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
];
