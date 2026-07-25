# PrintingHub Dubai — Static Website

Production-ready static site for **printinghubdubai.com**. No build step, no backend —
serve the `site/` folder statically (or open `index.html` directly) and it works.
There is no online checkout by design: **every product and CTA leads to a pre-filled
WhatsApp message** to `+971 52 192 5902`.

## Structure

```
site/
├── index.html            Home: hero, categories, bestsellers, Why Choose Us (#why-us), reviews preview
├── shop.html             Full catalog: category filters, live search, "Load more" pagination
├── product-page.html     Data-driven product template — reads ?id=<product-id> from the URL
├── about.html            Story, mission, stats bar, team & facility
├── services.html         6 service cards, each with its own WhatsApp deep-link
├── faq.html              Accordion (turnaround, MOQs, artwork, delivery, payment, rush)
├── contact.html          Map embed, hours, contact form → opens WhatsApp with the message pre-filled
├── gallery.html          Recent-work grid + lightbox  (not in the header nav — footer only)
├── testimonials.html     Review card grid            (not in the header nav — footer only)
├── admin.html            ★ CATALOG ADMIN — add/edit products, prices and photos (see below)
├── middleware.js         Vercel edge auth guarding /admin.html and /api/publish
├── api/publish.js        Commits catalog + photos to GitHub → auto-redeploy
├── DEPLOYMENT.md         GitHub + Vercel setup, admin login, publish token
├── css/styles.css        Single shared stylesheet (design system, photo + illustration rendering)
├── js/products.js        ★ PRODUCT CATALOG — single source of truth (46 products, 11 categories)
├── js/site.js            Shared header/footer/floating-bubble injection + product card renderer
├── images/               Product photography (see "Photos" below)
├── assets/og-image.svg   Social sharing image
├── sitemap.xml
└── robots.txt
```

Header navigation is **Home · Shop · Services · About · FAQ · Contact**.
Gallery and Testimonials still exist and are linked from the footer — delete the two files
and their footer links in `js/site.js` if you want them gone entirely.

---

## Admin dashboard — `admin.html`

This is how you add products, change prices, and attach photos without touching code.

**Because the site is static there is no server to save to**, so the workflow is:

1. Open `admin.html` and make your changes. Edits are held in your browser (localStorage),
   so you can close the tab and come back later without losing work.
2. Click **Export products.js** → replace `js/products.js` on the server with the download.
3. If you added photos, click **Download images** → drop those files into `images/`.

The live site updates the moment those files are uploaded. Nothing you do in the admin
affects the public site until you upload.

**What it does:**
- Edit any price directly in the table (changed prices are outlined in red).
- Add, edit, duplicate and delete products; toggle which ones are Home-page bestsellers.
- Full editor for name, ID, category, price, was-price, unit, description, options
  (the selectable chips) and specifications, with a live preview of the product card.
- Drag-and-drop photo upload. Images are automatically resized to max 1200px and
  compressed to JPEG, so you can upload straight off a phone.
- Import an existing `products.js` or a `.json` array to restore/migrate a catalog.
- The export is validated before it downloads — if it wouldn't parse, it refuses.

### Login & publishing (Vercel)

The admin is protected by a **real username/password checked at Vercel's edge**, before any
file is served — see [DEPLOYMENT.md](DEPLOYMENT.md). Set `ADMIN_USER` and `ADMIN_PASS` as
Vercel environment variables and give those to the client. Until they're set, the admin
returns 503 rather than being left open.

With `GITHUB_TOKEN` and `GITHUB_REPO` also configured, the admin gets a **Publish to live
site** button: it commits the catalog and photos to GitHub, Vercel redeploys automatically,
and the change is live in about a minute. The client never touches GitHub or Vercel, and
every change is a normal git commit you can review or revert.

Export / Download images remain as a manual fallback and work anywhere, including offline.

## How to add a product without the admin

Add one object to `PRODUCTS_CATALOG` in `js/products.js` (copy an existing one). It then
appears automatically in the shop grid, category filters, search, related products, and
gets a working detail page at `product-page.html?id=<your-id>`. The field reference is at
the top of that file.

---

## Photos

Products support real photography via an optional `image` field:

```js
image: "images/business-card-matte.jpg",
imageAlt: "A stack of blank matte-finish business cards on a wooden desk",
```

Any product **without** an `image` falls back to its built-in CSS illustration, so the
catalog never shows a broken or generic placeholder. If a photo path is wrong or the file
is missing, the illustration automatically takes over at runtime.

### Current state: every product has a themed illustration

All 46 products render a CSS illustration tinted with a per-product accent colour, so
neighbouring products in a grid look distinct while staying on brand. The accent is derived
from the product id, so **new products get their own colour automatically** — nothing to
configure. To pin a specific colour, set `accent: <0-7>` on the product (index into
`ILLUS_ACCENTS` in `js/site.js`).

**Why not stock photos?** Two rounds of automated sourcing across openly-licensed image
libraries were attempted and rejected:

- The pools are dominated by museum/archive material (19th-century letterheads, a 1945
  leaflet, a cuneiform receipt tablet) — not modern commercial printing.
- Many "business card" results show **another real company's branding**, including one with
  a named person's email and phone number printed on the card.
- Others carry **watermarks** — including images *tagged CC0* that still had
  "Download Full Size Image from …" burned across them.
- Some photograph **copyrighted artwork** (e.g. a retail rack of Hallmark-style cards).

Roughly one image in twenty was usable, which cannot produce a consistent 46-product
catalog. A grid mixing three photos with forty-three drawings looks broken; a consistent
illustrated set looks deliberate.

> **Do not copy images from other printing companies' websites.** An unwatermarked photo is
> just as copyrighted as a watermarked one — the watermark is only a visible marker, not the
> thing that creates the rights. Copying competitors' product shots onto a commercial site is
> straightforward infringement and invites takedowns and demand letters.

**When you want real photos**, in order of preference:
1. **Shoot your own products.** Best marketing too — customers want to see *your* work.
   Any recent phone on a clean surface near a window is enough. Upload via `admin.html`,
   which resizes, compresses and names the files for you.
2. **Buy stock** from Adobe Stock, Shutterstock, iStock or Envato — their licences cover
   exactly this use. Search terms that work well: "business card mockup blank",
   "letterhead mockup", "roll up banner mockup", "sticker sheet mockup".
3. One verified CC0 photo is kept at `images/business-card-matte.jpg` if you want to see the
   photo path working — re-enable it in `js/products.js` or through the admin.

---

## WhatsApp integration

- Number used everywhere: `971521925902` (wa.me format — no `+` or spaces).
  It is defined **once**, in `SITE.waNumber` in `js/site.js`.
- Header CTA, floating bubble, footer → generic greeting.
- Product page → message rebuilt on every option/quantity change, including product
  name, all selected options, quantity and estimated price.
- Contact form → message built from the form fields; nothing is submitted or stored.

## Before launch

1. **Add real product photos** (see above) — the single biggest visual upgrade.
2. **OG image:** `assets/og-image.svg` works on most platforms, but WhatsApp/Facebook
   prefer PNG/JPG — export a 1200×630 PNG and update the `og:image` tag in `index.html`.
3. **Verify business facts:** prices are realistic placeholders ("indicative" is stated
   on every product page); the stats (25,000+ orders, since 2012, ratings), team names,
   testimonials and business hours are placeholder content — confirm or replace.
4. **Map pin:** the contact-page iframe searches for the address; verify Google Maps
   resolves it to the right building, otherwise replace with an exact-pin embed link.
5. **Set `ADMIN_USER` / `ADMIN_PASS` in Vercel** before going live, and hand the client their
   login — see [DEPLOYMENT.md](DEPLOYMENT.md).
6. Prices exclude VAT (stated in FAQ). Confirm this matches how you quote.

## Local preview

Any static server works, e.g.:

```bash
npx http-server . -p 8123 -c-1
```

then open http://localhost:8123/ — or just double-click `index.html`.
