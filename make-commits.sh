#!/bin/bash
# Run once inside the project folder: creates 8+ meaningful commits.
git init -b main
c() { git add $1 && git commit -m "$2"; }
c "package.json next.config.mjs postcss.config.js tailwind.config.js jsconfig.json .gitignore .env.example" "chore: set up Next.js, Tailwind and DaisyUI"
c "lib/api.js lib/format.js" "feat: add API helpers and Bengali number formatting"
c "app/globals.css app/layout.js components/ToastFromUrl.js" "feat: add root layout, fonts and toaster"
c "components/Navbar.js components/Footer.js" "feat: build navbar with Bangla date and footer"
c "components/Ticker.js" "feat: add infinite price ticker"
c "components/ProductCard.js components/NotFoundBox.js app/not-found.js app/page.js" "feat: add hero and home product sections"
c "app/category" "feat: add category page with sorting and skeleton loading"
c "lib/auth.js lib/auth-client.js app/api app/signin app/signup" "feat: add BetterAuth sign in and sign up with social login"
c "app/product" "feat: add protected product details page"
c "app/profile" "feat: add profile page and update name feature"
c "README.md" "docs: add README"
git add -A && git commit -m "chore: final cleanup" 2>/dev/null
git log --oneline
