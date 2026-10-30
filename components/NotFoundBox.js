import Link from "next/link";

export default function NotFoundBox({ text = "দুঃখিত, এই পাতাটি খুঁজে পাওয়া যায়নি।" }) {
  return (
    <div className="text-center py-20">
      <div className="text-6xl font-bold text-primary">৪০৪</div>
      <p className="mt-3 text-stone-600">{text}</p>
      <Link href="/" className="btn btn-primary mt-6">হোম পেজে ফিরে যান</Link>
    </div>
  );
}
