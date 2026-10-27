# AUDITECH GSM – Backend setup (Supabase + GitHub Pages)

GitHub Pages only hosts static files (HTML/CSS/JS) – it cannot run PHP.
Supabase replaces the PHP layer: Postgres (SQL), login, file storage and
security rules. The site talks to it directly from the browser.

## 1. Create the Supabase project
1. supabase.com → New project (free plan is fine).
2. **SQL Editor → New query** → paste `supabase/schema.sql` → Run.
3. New query → paste `supabase/seed_services.sql` → Run (loads your 513 services).

## 2. Connect the site
Project Settings → API. Copy **Project URL** and the **anon public** key into `config.js`.
(Never use the `service_role` key on the website.)

## 3. Auth settings (Authentication → URL Configuration)
- Site URL: your GitHub Pages address, e.g. `https://USERNAME.github.io/REPO/`
- Add the same address under Redirect URLs.
- Authentication → Providers → Email: keep "Confirm email" ON for real use
  (turn it OFF only while testing).

## 4. Make yourself admin
1. Open the site → Login / Register → create your account (confirm email if asked).
2. SQL Editor, run:
   `update public.profiles set is_admin = true where email = 'YOUR_EMAIL';`
3. Open `admin.html` and log in.

## 5. Publish
Push all files to your GitHub repo (Settings → Pages → deploy from branch).

## How it works
- Member: registers → pays via Binance/M-Pesa → **Add Credit** page → uploads screenshot.
- Admin: **Payments** tab → views screenshot → types the USD amount → Approve (credit added, logged) or Reject.
- Admin can also add/deduct credit directly in **Members**.
- Member orders a service → credit is deducted instantly → admin sees it in **Orders**,
  sets status + reply (code/link). Cancelled/Rejected orders auto-refund once.
- **Services** tab: add, edit price/delivery, hide or delete.
- **Members** tab: change tier (reseller 10% / distributor 20% – edit in `tier_discounts` table).

## Security notes
- Balances, admin flag and order charging can only change through the SQL functions; members cannot edit them.
- Screenshots are in a private bucket; only the owner and admins can open them.
- Payment-method details (Binance ID, Till) are in `app.js` and `add-credit.html`.
- The currency dropdown in the header is still visual only; all prices/credits are USD.
