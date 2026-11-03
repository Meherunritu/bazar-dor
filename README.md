# 🛒 বাজার দর (BazarDor)

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের (চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ, মসলা) আজকের বাজার দর এক নজরে দেখার ওয়েব অ্যাপ। বিভিন্ন বিভাগের বাজারভিত্তিক সর্বনিম্ন ও সর্বোচ্চ দাম দেখা যায়।

**Live:** (https://bazar-dor-nu-sooty.vercel.app/)

## Technologies
- Next.js 14 (App Router)
- Tailwind CSS + DaisyUI
- BetterAuth (Email/Password, Google, GitHub) with MongoDB
- react-hot-toast

## Key Features
1. Live price ticker (marquee) with ▲/▼ change percentage for every product
2. Home page with top 6 risers, top 6 fallers, and all products in a responsive grid
3. Category pages with skeleton loading, 404-style empty state, and numeric price sorting (Bengali digits shown, sorted by real number)
4. Protected product detail page with min / max / average price and a division-wise market price table
5. BetterAuth sign in / sign up (email + Google + GitHub), toast notifications, and a profile page with name update

## Run locally
```bash
npm install
cp .env.example .env.local   # fill in the values
npm run dev
```
