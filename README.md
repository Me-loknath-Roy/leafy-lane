# Leafy Lane — React + Redux Shop (Meets 50‑pt rubric)

A minimal SPA that fulfils the entire assignment rubric: landing page, product listing grouped by category, header with cart count, and a full cart page (increase/decrease/delete/checkout/continue shopping).

## 1) Prerequisites
- Node.js 20+ and npm 10+
- A GitHub account and a new repo (e.g., `leafy-lane`)

## 2) Run locally
```bash
npm install
npm run dev
```
Open the printed local URL.

## 3) Project structure
```
leafy-lane/
├─ .github/workflows/deploy.yml      # GitHub Pages CI
├─ index.html
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
├─ vite.config.js
└─ src/
   ├─ App.jsx
   ├─ index.css
   └─ main.jsx
```

## 4) GitHub setup
1. Create a **public** repo on GitHub (e.g., `leafy-lane`).
2. Initialize and push:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
   git push -u origin main
   ```

## 5) GitHub Pages deploy (automatic)
- In `vite.config.js`, set the correct base:
  ```js
  // base: '/leafy-lane/'
  ```
  Replace `leafy-lane` with your repo name and **uncomment** it.

- Go to your repo Settings → **Pages**:
  - Source: **GitHub Actions**

- The included workflow will build and publish to Pages on every push to `main`.
- Your site will be available at:
  `https://<YOUR_USERNAME>.github.io/<REPO_NAME>/`

## 6) Manual build (optional)
```bash
npm run build
npx serve dist
```

## 7) Rubric checklist (quick demo steps)
- Landing page: open Home → verify background, company name, paragraph, CTA to Shop.
- Product listing: 6 plants; grouped by categories (Succulents, Low Light, Tropical, Flowering).
- Add to Cart: click Add → button disables, cart badge increments, item appears in Cart.
- Header: visible on Shop and Cart; cart badge shows total items; use nav to move between pages.
- Cart page: verify thumbnails, names, unit price; + and − adjust quantities, totals update; Delete removes an item; Checkout alerts “Coming Soon”; Continue Shopping to Shop.

## 8) Notes
- Prices are in INR. Feel free to tweak product data in `App.jsx`.
- Tailwind is preconfigured; classes are in components.
