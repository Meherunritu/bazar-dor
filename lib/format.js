const BN = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export const toBn = (v) => String(v).replace(/\d/g, (d) => BN[d]);

// 1850 -> "১,৮৫০"
export const bnPrice = (n) => toBn(Number(n).toLocaleString("en-US", { maximumFractionDigits: 2 }));

const UNITS = {
  kg: "প্রতি কেজি", liter: "প্রতি লিটার", litre: "প্রতি লিটার", l: "প্রতি লিটার",
  dozen: "প্রতি ডজন", piece: "প্রতি পিস", pc: "প্রতি পিস", pcs: "প্রতি পিস", hali: "প্রতি হালি",
};
export const unitBn = (u) => UNITS[String(u).toLowerCase()] || `প্রতি ${u}`;

export const pctText = (change) => {
  const pct = Math.abs(change?.pct ?? 0);
  if (change?.dir === "up") return `▲ ${toBn(pct)}%`;
  if (change?.dir === "down") return `▼ ${toBn(pct)}%`;
  return `— ${toBn(0)}%`;
};

export const changeClass = (dir) =>
  dir === "up" ? "text-green-700 bg-green-100" : dir === "down" ? "text-red-700 bg-red-100" : "text-stone-600 bg-stone-200";

export const banglaDate = () =>
  new Date().toLocaleDateString("bn-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
