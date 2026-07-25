/* ============================================================
   PrintingHub Dubai — PRODUCT CATALOG (single source of truth)
   ------------------------------------------------------------
   shop.html, index.html and product-page.html all read from
   this file. To add a product, add ONE object to
   PRODUCTS_CATALOG below — no new page needed.

   Fields:
   id           unique slug, used in product-page.html?id=...
   name         display name
   category     must match a slug in CATEGORIES
   price        indicative price in AED (number)
   was          optional old price (shows strike-through + SALE badge)
   unit         what the price applies to ("set of 100", "book"...)
   description  paragraph for the product page
   illustration one of: cards, envelope, book, banner, flyer,
                letterhead, sticker, trifold, greeting, gift
                (used when no `image` is set, and as the fallback if a photo 404s)
   image        OPTIONAL path to a real photo, e.g. "images/my-product.jpg".
                When present it replaces the illustration everywhere.
   imageAlt     OPTIONAL alt text for that photo (defaults to the product name)
   bg           pastel background hex for the product image area
   featured     true = shows in the Home "Bestsellers" grid
   options      array of {label, key, choices[]} → rendered as chips
   specs        array of [key, value] pairs → specs table
   ============================================================ */

const CATEGORIES = [
  { slug: "business-cards",  name: "Business Cards",     icon: "card" },
  { slug: "invitations",     name: "Invitations",        icon: "mail" },
  { slug: "postcards-flyers",name: "Postcards & Flyers", icon: "image" },
  { slug: "letterheads",     name: "Letterheads",        icon: "doc" },
  { slug: "stickers-labels", name: "Stickers & Labels",  icon: "circle" },
  { slug: "brochures",       name: "Brochures",          icon: "folder" },
  { slug: "greeting-cards",  name: "Greeting Cards",     icon: "rect" },
  { slug: "banners-posters", name: "Banners & Posters",  icon: "flag" },
  { slug: "compliment-slips",name: "Compliment Slips",   icon: "square" },
  { slug: "invoice-books",   name: "Invoice Books",      icon: "book" },
  { slug: "corporate-gifts", name: "Corporate Gifts",    icon: "gift" }
];

const PRODUCTS_CATALOG = [

  /* ---------------- Business Cards ---------------- */
  {
    id: "business-card-matte",
    name: "Matte Finish Business Cards",
    category: "business-cards",
    price: 85, was: 110, unit: "set of 100",
    illustration: "cards", bg: "#FFF6E0", featured: true,
    // Real photo (CC0). Products without `image` fall back to the CSS illustration.
    image: "images/business-card-matte.jpg",
    imageAlt: "A stack of blank matte-finish business cards on a wooden desk",
    description: "Premium 400gsm matte-finish business cards with a smooth soft-touch texture. Full-color double-sided printing, custom logo placement, and rounded-corner options available. Popular with law firms, consultancies, and retail businesses across Dubai.",
    options: [
      { label: "Finish", key: "finish", choices: ["Matte", "Soft-Touch Matte", "Matte + Rounded Corners"] },
      { label: "Pack size", key: "tier", choices: ["100 pcs", "250 pcs", "500 pcs", "1000 pcs"] }
    ],
    specs: [["Paper", "400 GSM art card"], ["Print", "Full color, double-sided"], ["Corners", "Square or rounded"], ["Turnaround", "1–2 working days (rush available)"]]
  },
  {
    id: "business-card-gloss",
    name: "Glossy Business Cards",
    category: "business-cards",
    price: 75, unit: "set of 100",
    illustration: "cards", bg: "#EAF3FF",
    description: "Vibrant glossy business cards on 350gsm art card with a high-shine lamination that makes colors pop. A cost-effective everyday card for sales teams, real estate agents, and delivery businesses.",
    options: [
      { label: "Lamination", key: "finish", choices: ["Gloss both sides", "Gloss front only"] },
      { label: "Pack size", key: "tier", choices: ["100 pcs", "250 pcs", "500 pcs", "1000 pcs"] }
    ],
    specs: [["Paper", "350 GSM art card"], ["Print", "Full color, double-sided"], ["Lamination", "High-gloss"], ["Turnaround", "1–2 working days (rush available)"]]
  },
  {
    id: "business-card-spot-uv",
    name: "Spot-UV Premium Business Cards",
    category: "business-cards",
    price: 140, unit: "set of 100",
    illustration: "cards", bg: "#FDEEEE", featured: true,
    description: "Matte-laminated cards with selective high-gloss Spot-UV highlights on your logo or name. The contrast between the velvet matte base and glossy raised accents gives a premium, tactile first impression.",
    options: [
      { label: "Spot-UV area", key: "uvarea", choices: ["Logo only", "Logo + name", "Full custom pattern"] },
      { label: "Pack size", key: "tier", choices: ["100 pcs", "250 pcs", "500 pcs"] }
    ],
    specs: [["Paper", "400 GSM art card + matte lamination"], ["Highlight", "Selective Spot-UV varnish"], ["Print", "Full color, double-sided"], ["Turnaround", "2–3 working days"]]
  },
  {
    id: "business-card-foil",
    name: "Gold Foil Luxury Business Cards",
    category: "business-cards",
    price: 195, unit: "set of 100",
    illustration: "cards", bg: "#FFF6E0",
    description: "Hot-stamped metallic foil cards on thick 600gsm cotton-feel stock. Choose gold, silver, or rose-gold foil for logos and text. The go-to choice for boutiques, salons, and executive personal cards.",
    options: [
      { label: "Foil color", key: "foil", choices: ["Gold", "Silver", "Rose Gold"] },
      { label: "Pack size", key: "tier", choices: ["100 pcs", "250 pcs", "500 pcs"] }
    ],
    specs: [["Paper", "600 GSM cotton-feel stock"], ["Foil", "Hot-stamped metallic"], ["Print", "1–2 colors + foil"], ["Turnaround", "3–4 working days"]]
  },
  {
    id: "business-card-kraft",
    name: "Kraft Eco Business Cards",
    category: "business-cards",
    price: 95, unit: "set of 100",
    illustration: "cards", bg: "#F2EDE4",
    description: "Recycled kraft-board cards with a natural brown texture and crisp single- or two-color printing. An earthy, sustainable look for cafés, organic brands, and creative studios.",
    options: [
      { label: "Print color", key: "printcolor", choices: ["Black ink", "White ink", "Black + red"] },
      { label: "Pack size", key: "tier", choices: ["100 pcs", "250 pcs", "500 pcs"] }
    ],
    specs: [["Paper", "300 GSM recycled kraft board"], ["Print", "1–2 color, double-sided"], ["Look", "Natural fiber texture"], ["Turnaround", "2–3 working days"]]
  },

  /* ---------------- Invitations ---------------- */
  {
    id: "wedding-invitation",
    name: "Wedding Invitation Cards",
    category: "invitations",
    price: 6.5, unit: "card",
    illustration: "envelope", bg: "#EAF3FF", featured: true,
    description: "Elegant custom wedding invitation cards with premium cardstock and envelope included. Choose from classic, modern, or Arabic calligraphy-inspired designs. Foil accents available on request for an extra refined finish.",
    options: [
      { label: "Style", key: "style", choices: ["Classic", "Modern Minimal", "Arabic Calligraphy"] },
      { label: "Pack size", key: "tier", choices: ["50 cards", "100 cards", "200 cards", "500 cards"] }
    ],
    specs: [["Card stock", "300 GSM premium card"], ["Envelope", "Matching color envelope included"], ["Personalization", "Names & event details printed"], ["Turnaround", "3–5 working days"]]
  },
  {
    id: "corporate-invitation",
    name: "Corporate Event Invitations",
    category: "invitations",
    price: 5, unit: "card",
    illustration: "envelope", bg: "#F0F0F0",
    description: "Professional invitations for product launches, gala dinners, and conferences. Printed on heavyweight stock with your brand colors, event agenda, and RSVP details, with matching envelopes.",
    options: [
      { label: "Format", key: "format", choices: ["A6 flat card", "A5 folded", "DL flat card"] },
      { label: "Pack size", key: "tier", choices: ["100 cards", "200 cards", "500 cards"] }
    ],
    specs: [["Card stock", "350 GSM art card"], ["Envelope", "White or kraft envelope included"], ["Print", "Full color, both sides"], ["Turnaround", "2–4 working days"]]
  },
  {
    id: "birthday-invitation",
    name: "Birthday Party Invitations",
    category: "invitations",
    price: 4.5, unit: "card",
    illustration: "envelope", bg: "#FDEEEE",
    description: "Fun, fully customizable birthday invitations for kids and adults — bring your own theme or let our designers create one. Glossy or matte finish with envelopes included.",
    options: [
      { label: "Finish", key: "finish", choices: ["Glossy", "Matte"] },
      { label: "Pack size", key: "tier", choices: ["30 cards", "50 cards", "100 cards"] }
    ],
    specs: [["Card stock", "300 GSM card"], ["Envelope", "Included"], ["Design", "Free theme design support"], ["Turnaround", "2–3 working days"]]
  },
  {
    id: "eid-invitation",
    name: "Ramadan & Eid Invitations",
    category: "invitations",
    price: 5.5, unit: "card",
    illustration: "envelope", bg: "#FFF6E0",
    description: "Beautifully crafted Ramadan iftar and Eid celebration invitations with traditional patterns, crescent motifs, and bilingual Arabic-English text. Gold ink accents available.",
    options: [
      { label: "Style", key: "style", choices: ["Traditional pattern", "Modern geometric", "Gold accent"] },
      { label: "Pack size", key: "tier", choices: ["50 cards", "100 cards", "200 cards"] }
    ],
    specs: [["Card stock", "300 GSM pearl-finish card"], ["Language", "Arabic / English bilingual"], ["Envelope", "Included"], ["Turnaround", "3–4 working days"]]
  },

  /* ---------------- Postcards & Flyers ---------------- */
  {
    id: "a5-flyers",
    name: "A5 Promotional Flyers",
    category: "postcards-flyers",
    price: 220, was: 260, unit: "set of 1000",
    illustration: "flyer", bg: "#FDEEEE", featured: true,
    description: "Full-color A5 flyers on 150gsm gloss art paper — the workhorse of Dubai marketing. Perfect for restaurant promotions, gym offers, and door-to-door distribution. Same-day printing available for rush campaigns.",
    options: [
      { label: "Paper", key: "paper", choices: ["150 GSM gloss", "170 GSM matte", "300 GSM card"] },
      { label: "Pack size", key: "tier", choices: ["500 pcs", "1000 pcs", "2500 pcs", "5000 pcs"] }
    ],
    specs: [["Size", "A5 (148 × 210 mm)"], ["Print", "Full color, single or double-sided"], ["Paper", "150–300 GSM"], ["Turnaround", "Same day – 2 working days"]]
  },
  {
    id: "dl-flyers",
    name: "DL Flyers",
    category: "postcards-flyers",
    price: 180, unit: "set of 1000",
    illustration: "flyer", bg: "#EAF3FF",
    description: "Slim DL-format flyers (99 × 210 mm) that fit standard envelopes and counter-top holders. Ideal for price lists, rate cards, and hotel in-room promotions.",
    options: [
      { label: "Paper", key: "paper", choices: ["135 GSM gloss", "170 GSM matte"] },
      { label: "Pack size", key: "tier", choices: ["500 pcs", "1000 pcs", "2500 pcs"] }
    ],
    specs: [["Size", "DL (99 × 210 mm)"], ["Print", "Full color, double-sided"], ["Fits", "Standard DL envelopes & stands"], ["Turnaround", "1–2 working days"]]
  },
  {
    id: "postcards-standard",
    name: "Marketing Postcards",
    category: "postcards-flyers",
    price: 240, unit: "set of 500",
    illustration: "flyer", bg: "#FFF6E0",
    description: "Thick 300gsm postcards with a writable matte back — great for direct mail campaigns, thank-you notes in e-commerce parcels, and event handouts.",
    options: [
      { label: "Size", key: "size", choices: ["A6 (105 × 148 mm)", "A5 (148 × 210 mm)", "Square 140 × 140 mm"] },
      { label: "Pack size", key: "tier", choices: ["250 pcs", "500 pcs", "1000 pcs"] }
    ],
    specs: [["Paper", "300 GSM card, writable back"], ["Print", "Full color front, mono back"], ["Corners", "Square or rounded"], ["Turnaround", "1–2 working days"]]
  },
  {
    id: "door-hangers",
    name: "Door Hanger Flyers",
    category: "postcards-flyers",
    price: 320, unit: "set of 500",
    illustration: "flyer", bg: "#F0F0F0",
    description: "Die-cut door hangers for residential marketing — cleaning services, food delivery, and home maintenance companies love these. Printed on sturdy 300gsm card with a clean die-cut hook.",
    options: [
      { label: "Finish", key: "finish", choices: ["Gloss", "Matte"] },
      { label: "Pack size", key: "tier", choices: ["250 pcs", "500 pcs", "1000 pcs"] }
    ],
    specs: [["Size", "100 × 275 mm with hook"], ["Paper", "300 GSM card"], ["Cutting", "Die-cut hook, rounded corners"], ["Turnaround", "2–3 working days"]]
  },

  /* ---------------- Letterheads ---------------- */
  {
    id: "letterhead-standard",
    name: "Standard Letterheads",
    category: "letterheads",
    price: 280, unit: "set of 500",
    illustration: "letterhead", bg: "#EAF3FF",
    description: "Crisp A4 letterheads on 100gsm premium laser-safe bond paper. Your logo, contact details, and brand colors printed to exact specification — compatible with all office printers.",
    options: [
      { label: "Paper", key: "paper", choices: ["100 GSM bond", "120 GSM bond"] },
      { label: "Pack size", key: "tier", choices: ["250 sheets", "500 sheets", "1000 sheets"] }
    ],
    specs: [["Size", "A4 (210 × 297 mm)"], ["Paper", "100–120 GSM laser-safe bond"], ["Print", "Full color, single-sided"], ["Turnaround", "1–2 working days"]]
  },
  {
    id: "letterhead-premium",
    name: "Premium Conqueror Letterheads",
    category: "letterheads",
    price: 420, unit: "set of 500",
    illustration: "letterhead", bg: "#FFF6E0",
    description: "Textured Conqueror-brand paper letterheads with a laid or wove finish that communicates establishment and trust. Preferred by legal firms, family offices, and government suppliers.",
    options: [
      { label: "Texture", key: "texture", choices: ["Laid", "Wove", "CX22 Smooth"] },
      { label: "Pack size", key: "tier", choices: ["250 sheets", "500 sheets", "1000 sheets"] }
    ],
    specs: [["Size", "A4 (210 × 297 mm)"], ["Paper", "Conqueror 120 GSM"], ["Print", "Full color + optional foil"], ["Turnaround", "2–3 working days"]]
  },
  {
    id: "letterhead-bilingual",
    name: "Bilingual Arabic-English Letterheads",
    category: "letterheads",
    price: 320, unit: "set of 500",
    illustration: "letterhead", bg: "#F2EDE4",
    description: "Dual-language letterheads with Arabic and English headers laid out to UAE business standards — trade license details, PO box, and TRN formatted correctly for official correspondence.",
    options: [
      { label: "Paper", key: "paper", choices: ["100 GSM bond", "120 GSM bond"] },
      { label: "Pack size", key: "tier", choices: ["250 sheets", "500 sheets", "1000 sheets"] }
    ],
    specs: [["Size", "A4 (210 × 297 mm)"], ["Layout", "Arabic + English dual header"], ["Includes", "TRN / license detail formatting"], ["Turnaround", "2–3 working days"]]
  },
  {
    id: "continuation-sheets",
    name: "Continuation Sheets",
    category: "letterheads",
    price: 220, unit: "set of 500",
    illustration: "letterhead", bg: "#F0F0F0",
    description: "Matching second-page sheets with a lighter footer-only design, so multi-page letters and contracts stay on-brand without repeating the full header.",
    options: [
      { label: "Paper", key: "paper", choices: ["100 GSM bond", "120 GSM bond"] },
      { label: "Pack size", key: "tier", choices: ["250 sheets", "500 sheets", "1000 sheets"] }
    ],
    specs: [["Size", "A4 (210 × 297 mm)"], ["Design", "Footer / side-strip only"], ["Match", "Pairs with your letterhead stock"], ["Turnaround", "1–2 working days"]]
  },

  /* ---------------- Stickers & Labels ---------------- */
  {
    id: "die-cut-stickers",
    name: "Die-Cut Custom Stickers",
    category: "stickers-labels",
    price: 160, unit: "set of 250",
    illustration: "sticker", bg: "#FFF6E0", featured: true,
    description: "Stickers cut precisely to the shape of your logo or artwork — any outline, no background square. Durable vinyl with a 2-year outdoor rating, great for laptops, packaging, and vehicles.",
    options: [
      { label: "Material", key: "material", choices: ["White vinyl", "Clear vinyl", "Holographic"] },
      { label: "Pack size", key: "tier", choices: ["100 pcs", "250 pcs", "500 pcs", "1000 pcs"] }
    ],
    specs: [["Material", "Waterproof vinyl"], ["Cut", "Custom die-cut to artwork shape"], ["Durability", "2-year outdoor rating"], ["Turnaround", "2–3 working days"]]
  },
  {
    id: "round-labels",
    name: "Round Product Labels",
    category: "stickers-labels",
    price: 120, unit: "set of 500",
    illustration: "sticker", bg: "#EAF3FF",
    description: "Classic circular labels for jars, boxes, and bag seals. Supplied on easy-peel sheets or rolls for label applicator machines. Gloss, matte, or kraft paper finishes.",
    options: [
      { label: "Diameter", key: "size", choices: ["3 cm", "5 cm", "7 cm"] },
      { label: "Finish", key: "finish", choices: ["Gloss paper", "Matte paper", "Kraft"] }
    ],
    specs: [["Shape", "Circle, 3–7 cm"], ["Supply", "Sheets or rolls"], ["Adhesive", "Permanent"], ["Turnaround", "1–2 working days"]]
  },
  {
    id: "waterproof-labels",
    name: "Waterproof Bottle Labels",
    category: "stickers-labels",
    price: 210, unit: "set of 500",
    illustration: "sticker", bg: "#EAF6EF",
    description: "Oil- and water-resistant labels engineered for water bottles, cosmetics, and refrigerated food packaging. Colors stay sharp through condensation, ice buckets, and handling.",
    options: [
      { label: "Material", key: "material", choices: ["White BOPP", "Clear BOPP", "Silver BOPP"] },
      { label: "Pack size", key: "tier", choices: ["250 pcs", "500 pcs", "1000 pcs"] }
    ],
    specs: [["Material", "BOPP synthetic film"], ["Resistance", "Water, oil, refrigeration"], ["Application", "Bottles, jars, tubs"], ["Turnaround", "2–3 working days"]]
  },
  {
    id: "clear-stickers",
    name: "Clear Transparent Stickers",
    category: "stickers-labels",
    price: 190, unit: "set of 250",
    illustration: "sticker", bg: "#F0F0F0",
    description: "Crystal-clear stickers that make your artwork look printed directly on glass or packaging. White-ink underlay available so light colors stay visible on dark surfaces.",
    options: [
      { label: "White underlay", key: "underlay", choices: ["No underlay", "Behind logo only", "Full underlay"] },
      { label: "Pack size", key: "tier", choices: ["100 pcs", "250 pcs", "500 pcs"] }
    ],
    specs: [["Material", "Clear vinyl"], ["Ink", "CMYK + white underlay"], ["Best for", "Glass, packaging, windows"], ["Turnaround", "2–3 working days"]]
  },
  {
    id: "sheet-stickers",
    name: "A4 Sticker Sheets",
    category: "stickers-labels",
    price: 6, unit: "sheet",
    illustration: "sticker", bg: "#FDEEEE",
    description: "Full A4 sheets with multiple kiss-cut stickers per sheet — mix shapes and designs on a single sheet. Cost-effective for small businesses that need variety in small runs.",
    options: [
      { label: "Stickers per sheet", key: "layout", choices: ["Up to 6 designs", "Up to 12 designs", "Up to 20 designs"] },
      { label: "Pack size", key: "tier", choices: ["10 sheets", "25 sheets", "50 sheets", "100 sheets"] }
    ],
    specs: [["Size", "A4 sheet, kiss-cut"], ["Material", "Vinyl or paper"], ["Minimum", "10 sheets"], ["Turnaround", "1–2 working days"]]
  },

  /* ---------------- Brochures ---------------- */
  {
    id: "trifold-brochure",
    name: "Tri-Fold Brochures (A4)",
    category: "brochures",
    price: 380, unit: "set of 500",
    illustration: "trifold", bg: "#EAF3FF", featured: true,
    description: "The classic six-panel tri-fold on 170gsm silk paper — roomy enough for a full service menu or company overview, compact enough for counter displays and handouts. Machine-folded with razor-sharp creases.",
    options: [
      { label: "Paper", key: "paper", choices: ["150 GSM gloss", "170 GSM silk", "250 GSM card"] },
      { label: "Pack size", key: "tier", choices: ["250 pcs", "500 pcs", "1000 pcs", "2500 pcs"] }
    ],
    specs: [["Flat size", "A4 → folds to DL"], ["Panels", "6 (tri-fold)"], ["Print", "Full color, both sides"], ["Turnaround", "2–3 working days"]]
  },
  {
    id: "bifold-brochure",
    name: "Bi-Fold Brochures",
    category: "brochures",
    price: 350, unit: "set of 500",
    illustration: "trifold", bg: "#FFF6E0",
    description: "A single elegant center fold creating four generous A5 panels — ideal for event programs, price lists, and premium product one-pagers where images need room to breathe.",
    options: [
      { label: "Paper", key: "paper", choices: ["170 GSM silk", "250 GSM card", "300 GSM card"] },
      { label: "Pack size", key: "tier", choices: ["250 pcs", "500 pcs", "1000 pcs"] }
    ],
    specs: [["Flat size", "A4 → folds to A5"], ["Panels", "4 (bi-fold)"], ["Print", "Full color, both sides"], ["Turnaround", "2–3 working days"]]
  },
  {
    id: "company-profile",
    name: "Company Profile Booklets",
    category: "brochures",
    price: 18, unit: "booklet",
    illustration: "trifold", bg: "#F0F0F0",
    description: "Saddle-stitched company profile booklets from 8 to 48 pages with a heavyweight cover. Free layout consultation to structure your story, services, and portfolio professionally.",
    options: [
      { label: "Pages", key: "pages", choices: ["8 pages", "16 pages", "24 pages", "32+ pages"] },
      { label: "Cover", key: "cover", choices: ["Same as inner", "300 GSM + matte lam", "300 GSM + Spot-UV"] }
    ],
    specs: [["Size", "A4 or A5 portrait"], ["Binding", "Saddle stitch (staples)"], ["Inner paper", "130–170 GSM"], ["Turnaround", "3–5 working days"]]
  },
  {
    id: "menu-printing",
    name: "Restaurant Menus",
    category: "brochures",
    price: 14, unit: "menu",
    illustration: "trifold", bg: "#FDEEEE",
    description: "Spill-resistant laminated menus that survive daily restaurant life. Flat, folded, or multi-page formats with optional QR codes linking to your online ordering page.",
    options: [
      { label: "Format", key: "format", choices: ["A4 flat laminated", "A4 bi-fold", "A3 tri-fold", "Multi-page booklet"] },
      { label: "Pack size", key: "tier", choices: ["25 menus", "50 menus", "100 menus"] }
    ],
    specs: [["Paper", "300 GSM + gloss or matte lamination"], ["Extras", "QR code integration"], ["Wipeable", "Yes, laminated both sides"], ["Turnaround", "2–3 working days"]]
  },

  /* ---------------- Greeting Cards ---------------- */
  {
    id: "corporate-greeting",
    name: "Corporate Greeting Cards",
    category: "greeting-cards",
    price: 7, unit: "card",
    illustration: "greeting", bg: "#EAF3FF",
    description: "Folded greeting cards with your company branding for client appreciation, milestones, and seasonal wishes. Blank or pre-printed message inside, envelopes included.",
    options: [
      { label: "Size", key: "size", choices: ["A6 folded", "A5 folded", "Square 140 mm"] },
      { label: "Pack size", key: "tier", choices: ["50 cards", "100 cards", "250 cards"] }
    ],
    specs: [["Card stock", "300 GSM uncoated or silk"], ["Format", "Folded, envelope included"], ["Inside", "Blank or printed message"], ["Turnaround", "2–3 working days"]]
  },
  {
    id: "eid-greeting",
    name: "Eid & Ramadan Greeting Cards",
    category: "greeting-cards",
    price: 6.5, unit: "card",
    illustration: "greeting", bg: "#EAF6EF",
    description: "Send warm Eid Mubarak and Ramadan Kareem wishes with premium cards featuring crescent, lantern, and geometric designs. Gold foil options and bilingual greetings available.",
    options: [
      { label: "Design", key: "style", choices: ["Crescent & lantern", "Geometric pattern", "Gold foil accent"] },
      { label: "Pack size", key: "tier", choices: ["50 cards", "100 cards", "250 cards"] }
    ],
    specs: [["Card stock", "300 GSM pearl or silk"], ["Language", "Arabic / English"], ["Envelope", "Included"], ["Turnaround", "3–4 working days"]]
  },
  {
    id: "thank-you-cards",
    name: "Thank You Cards",
    category: "greeting-cards",
    price: 5, unit: "card",
    illustration: "greeting", bg: "#FDEEEE",
    description: "Small-format thank-you cards for e-commerce parcels, hotel turndowns, and event favors. A low-cost touch that customers remember — add a discount code to drive repeat orders.",
    options: [
      { label: "Format", key: "format", choices: ["A7 flat", "A6 flat", "A6 folded"] },
      { label: "Pack size", key: "tier", choices: ["100 cards", "250 cards", "500 cards"] }
    ],
    specs: [["Card stock", "300 GSM card"], ["Print", "Full color, both sides"], ["Extras", "QR / promo code printing"], ["Turnaround", "1–2 working days"]]
  },
  {
    id: "new-year-cards",
    name: "New Year Corporate Cards",
    category: "greeting-cards",
    price: 7.5, unit: "card",
    illustration: "greeting", bg: "#FFF6E0",
    description: "Ring in the new year with branded greeting cards for clients and partners. Classic foil numerals, minimalist typography, or festive full-color designs — envelopes and addressing service available.",
    options: [
      { label: "Style", key: "style", choices: ["Foil numerals", "Minimalist", "Festive full-color"] },
      { label: "Pack size", key: "tier", choices: ["50 cards", "100 cards", "250 cards", "500 cards"] }
    ],
    specs: [["Card stock", "300 GSM silk"], ["Foil", "Optional gold / silver"], ["Envelope", "Included, printing optional"], ["Turnaround", "3–4 working days"]]
  },

  /* ---------------- Banners & Posters ---------------- */
  {
    id: "banner-rollup",
    name: "Roll-Up Banner Stand",
    category: "banners-posters",
    price: 195, was: 240, unit: "unit",
    illustration: "banner", bg: "#FDEEEE", featured: true,
    description: "Portable roll-up banner stand, ideal for exhibitions, retail displays, and events. Includes a durable aluminum base, retractable mechanism, and a carry bag. Vivid full-color print on tear-resistant vinyl.",
    options: [
      { label: "Size", key: "size", choices: ["80 × 200 cm", "85 × 200 cm", "100 × 200 cm"] },
      { label: "Material", key: "material", choices: ["Standard Vinyl", "Premium Matte", "Blockout (indoor/outdoor)"] }
    ],
    specs: [["Stand", "Aluminum retractable base"], ["Print material", "Tear-resistant vinyl"], ["Includes", "Carry bag"], ["Turnaround", "1–2 working days (rush available)"]]
  },
  {
    id: "vinyl-banner",
    name: "Outdoor Vinyl Banner",
    category: "banners-posters",
    price: 45, unit: "sqm",
    illustration: "banner", bg: "#EAF3FF",
    description: "Heavy-duty PVC flex banners for shopfronts, construction hoarding, and outdoor events. UV-resistant inks rated for Dubai sun, with reinforced hems and metal eyelets for secure mounting.",
    options: [
      { label: "Material", key: "material", choices: ["440 GSM flex", "510 GSM blockout", "Mesh (wind-through)"] },
      { label: "Finishing", key: "finishing", choices: ["Eyelets all sides", "Pole pockets", "Plain cut"] }
    ],
    specs: [["Material", "PVC flex, UV-resistant inks"], ["Sizing", "Any custom size, per sqm"], ["Finishing", "Welded hems + eyelets"], ["Turnaround", "1–2 working days"]]
  },
  {
    id: "a1-posters",
    name: "A1 Event Posters",
    category: "banners-posters",
    price: 35, unit: "poster",
    illustration: "flyer", bg: "#FFF6E0",
    description: "Large-format A1 posters on premium 200gsm satin photo paper with rich, gallery-quality color. Perfect for event promotion, retail windows, and office wall art.",
    options: [
      { label: "Size", key: "size", choices: ["A2 (420 × 594 mm)", "A1 (594 × 841 mm)", "A0 (841 × 1189 mm)"] },
      { label: "Paper", key: "paper", choices: ["200 GSM satin", "200 GSM gloss", "Backlit film"] }
    ],
    specs: [["Print", "Large-format inkjet, full color"], ["Paper", "200 GSM photo paper"], ["Lamination", "Optional gloss / matte"], ["Turnaround", "Same day – 1 working day"]]
  },
  {
    id: "backdrop-banner",
    name: "Exhibition Backdrop Banner",
    category: "banners-posters",
    price: 850, unit: "unit",
    illustration: "banner", bg: "#F0F0F0",
    description: "Seamless press-conference and exhibition backdrops up to 3 × 6 meters, with pop-up frame or pipe-and-drape mounting. Includes free layout adaptation of your artwork to the frame size.",
    options: [
      { label: "Size", key: "size", choices: ["2.3 × 2.3 m pop-up", "3 × 2.3 m pop-up", "Custom fabric wall"] },
      { label: "Material", key: "material", choices: ["Stretch fabric", "Vinyl", "Blockout fabric"] }
    ],
    specs: [["Frame", "Aluminum pop-up, tool-free"], ["Print", "Dye-sublimation fabric or vinyl"], ["Includes", "Carry case + free layout fitting"], ["Turnaround", "3–4 working days"]]
  },
  {
    id: "xstand-banner",
    name: "X-Stand Display Banner",
    category: "banners-posters",
    price: 145, unit: "unit",
    illustration: "banner", bg: "#EAF6EF",
    description: "Lightweight X-frame banner stand — the budget-friendly alternative to roll-ups for indoor promotions. Tool-free assembly in under a minute, graphics swappable in seconds.",
    options: [
      { label: "Size", key: "size", choices: ["60 × 160 cm", "80 × 180 cm"] },
      { label: "Material", key: "material", choices: ["Standard vinyl", "Premium matte"] }
    ],
    specs: [["Frame", "Fiberglass X-frame"], ["Assembly", "Tool-free, under 1 minute"], ["Swappable", "Graphics replaceable"], ["Turnaround", "1–2 working days"]]
  },

  /* ---------------- Compliment Slips ---------------- */
  {
    id: "compliment-slips",
    name: "Compliment Slips (DL)",
    category: "compliment-slips",
    price: 190, unit: "set of 500",
    illustration: "letterhead", bg: "#EAF3FF",
    description: "DL-size 'with compliments' slips matching your letterhead design — the professional touch for invoices, deliveries, and small gifts sent to clients.",
    options: [
      { label: "Paper", key: "paper", choices: ["100 GSM bond", "120 GSM bond"] },
      { label: "Pack size", key: "tier", choices: ["250 slips", "500 slips", "1000 slips"] }
    ],
    specs: [["Size", "DL (99 × 210 mm)"], ["Paper", "100–120 GSM bond"], ["Print", "Full color, single-sided"], ["Turnaround", "1–2 working days"]]
  },
  {
    id: "compliment-slips-premium",
    name: "Premium Compliment Slips",
    category: "compliment-slips",
    price: 260, unit: "set of 500",
    illustration: "letterhead", bg: "#FFF6E0",
    description: "Compliment slips on textured Conqueror stock with optional foil logo — pairs with our premium letterhead range for a fully coordinated corporate stationery suite.",
    options: [
      { label: "Texture", key: "texture", choices: ["Laid", "Wove", "Smooth"] },
      { label: "Pack size", key: "tier", choices: ["250 slips", "500 slips", "1000 slips"] }
    ],
    specs: [["Size", "DL (99 × 210 mm)"], ["Paper", "Conqueror 120 GSM"], ["Extras", "Optional foil logo"], ["Turnaround", "2–3 working days"]]
  },

  /* ---------------- Invoice Books ---------------- */
  {
    id: "invoice-book-ncr",
    name: "Invoice Book (NCR)",
    category: "invoice-books",
    price: 145, was: 175, unit: "book",
    illustration: "book", bg: "#F0F0F0", featured: true,
    description: "Our Custom NCR Invoice Book is designed to simplify your billing and record-keeping processes, making it an essential tool for businesses of all sizes. Each book features high-quality perforated pages, allowing for easy tear-off invoices that keep your records clean and organized. Custom logo, company details, and Arabic/English bilingual layout included at no extra cost.",
    options: [
      { label: "Size", key: "size", choices: ["A6 105 × 148 mm", "A5 148 × 210 mm", "A4 210 × 297 mm"] },
      { label: "Copies", key: "copies", choices: ["1 Original + 1 Copy", "1 Original + 2 Copies", "1 Original + 3 Copies"] }
    ],
    specs: [["Paper", "NCR carbonless, 55–60 GSM"], ["Binding", "Padded, perforated tear-off"], ["Numbering", "Sequential invoice numbering included"], ["Language", "English / Arabic bilingual layout"], ["Turnaround", "2–3 working days (rush available)"]]
  },
  {
    id: "receipt-book",
    name: "Receipt Books (NCR)",
    category: "invoice-books",
    price: 135, unit: "book",
    illustration: "book", bg: "#EAF3FF",
    description: "Carbonless receipt books with sequential numbering and your company details — instant duplicate records for cash payments, deposits, and collections. VAT-compliant layout available.",
    options: [
      { label: "Size", key: "size", choices: ["A6 105 × 148 mm", "A5 148 × 210 mm"] },
      { label: "Copies", key: "copies", choices: ["1 Original + 1 Copy", "1 Original + 2 Copies"] }
    ],
    specs: [["Paper", "NCR carbonless"], ["Numbering", "Sequential, customizable start"], ["Layout", "VAT-compliant fields"], ["Turnaround", "2–3 working days"]]
  },
  {
    id: "delivery-note-book",
    name: "Delivery Note Books",
    category: "invoice-books",
    price: 140, unit: "book",
    illustration: "book", bg: "#EAF6EF",
    description: "Triplicate delivery note books so your driver, your customer, and your office each keep a signed copy. Fields for item lists, quantities, received-by signature, and vehicle details.",
    options: [
      { label: "Size", key: "size", choices: ["A5 148 × 210 mm", "A4 210 × 297 mm"] },
      { label: "Copies", key: "copies", choices: ["1 Original + 2 Copies", "1 Original + 3 Copies"] }
    ],
    specs: [["Paper", "NCR carbonless"], ["Fields", "Items, qty, signature, vehicle"], ["Binding", "Padded with writing shield"], ["Turnaround", "2–3 working days"]]
  },
  {
    id: "quotation-book",
    name: "Quotation Books",
    category: "invoice-books",
    price: 145, unit: "book",
    illustration: "book", bg: "#FFF6E0",
    description: "Professional NCR quotation books for on-site estimates — contractors, maintenance teams, and trade services can hand a customer a written quote on the spot and keep a copy.",
    options: [
      { label: "Size", key: "size", choices: ["A5 148 × 210 mm", "A4 210 × 297 mm"] },
      { label: "Copies", key: "copies", choices: ["1 Original + 1 Copy", "1 Original + 2 Copies"] }
    ],
    specs: [["Paper", "NCR carbonless"], ["Fields", "Scope, validity, terms"], ["Numbering", "Sequential"], ["Turnaround", "2–3 working days"]]
  },

  /* ---------------- Corporate Gifts ---------------- */
  {
    id: "branded-mugs",
    name: "Branded Ceramic Mugs",
    category: "corporate-gifts",
    price: 22, unit: "mug",
    illustration: "gift", bg: "#FDEEEE", featured: true,
    description: "Classic 11oz ceramic mugs with dishwasher-safe full-color or single-color logo printing. A staple giveaway for onboarding kits, exhibitions, and client gifts.",
    options: [
      { label: "Print", key: "print", choices: ["Single color logo", "Full color wrap", "Inner color + logo"] },
      { label: "Pack size", key: "tier", choices: ["24 mugs", "50 mugs", "100 mugs", "250 mugs"] }
    ],
    specs: [["Capacity", "11 oz ceramic"], ["Print", "Sublimation / pad print"], ["Dishwasher", "Safe"], ["Turnaround", "3–5 working days"]]
  },
  {
    id: "branded-pens",
    name: "Branded Metal Pens",
    category: "corporate-gifts",
    price: 8, unit: "pen",
    illustration: "gift", bg: "#F0F0F0",
    description: "Smooth-writing metal ballpoint pens laser-engraved or printed with your logo. Presentation boxes available for executive gifting.",
    options: [
      { label: "Branding", key: "branding", choices: ["Laser engraving", "UV color print"] },
      { label: "Pack size", key: "tier", choices: ["50 pens", "100 pens", "250 pens", "500 pens"] }
    ],
    specs: [["Body", "Aluminum, soft-touch grip"], ["Ink", "Blue or black, German refill"], ["Branding", "Engraved or printed"], ["Turnaround", "3–4 working days"]]
  },
  {
    id: "branded-notebooks",
    name: "Branded A5 Notebooks",
    category: "corporate-gifts",
    price: 26, unit: "notebook",
    illustration: "gift", bg: "#EAF3FF",
    description: "Hardcover A5 notebooks with debossed or foil logo, elastic closure, and ribbon bookmark. Pair with a branded pen for a complete welcome-kit set.",
    options: [
      { label: "Cover branding", key: "branding", choices: ["Deboss (blind)", "Gold foil", "Silver foil", "Full color print"] },
      { label: "Pack size", key: "tier", choices: ["25 pcs", "50 pcs", "100 pcs", "250 pcs"] }
    ],
    specs: [["Size", "A5, 192 lined pages"], ["Cover", "PU hardcover, 6 colors"], ["Extras", "Elastic band + ribbon"], ["Turnaround", "4–5 working days"]]
  },
  {
    id: "branded-usb",
    name: "Branded USB Drives (16GB)",
    category: "corporate-gifts",
    price: 32, unit: "drive",
    illustration: "gift", bg: "#EAF6EF",
    description: "16GB USB 3.0 flash drives in metal, wood, or card-style bodies with engraved or printed branding. Optional data pre-loading with your company profile or catalog.",
    options: [
      { label: "Body", key: "body", choices: ["Metal swivel", "Wooden", "Credit-card style"] },
      { label: "Pack size", key: "tier", choices: ["25 pcs", "50 pcs", "100 pcs"] }
    ],
    specs: [["Capacity", "16 GB, USB 3.0"], ["Branding", "Engraving or full color"], ["Extras", "Optional file pre-loading"], ["Turnaround", "4–6 working days"]]
  },
  {
    id: "tote-bags",
    name: "Printed Canvas Tote Bags",
    category: "corporate-gifts",
    price: 18, unit: "bag",
    illustration: "gift", bg: "#F2EDE4",
    description: "Reusable natural canvas totes with screen-printed branding — a sustainable giveaway for conferences, retail packaging, and events that people actually keep using.",
    options: [
      { label: "Print", key: "print", choices: ["1 color, 1 side", "2 colors, 1 side", "Full color, both sides"] },
      { label: "Pack size", key: "tier", choices: ["50 bags", "100 bags", "250 bags", "500 bags"] }
    ],
    specs: [["Material", "10oz natural canvas"], ["Handles", "Long shoulder handles"], ["Print", "Screen print / DTG"], ["Turnaround", "4–5 working days"]]
  }
];

/* helpers used across pages */
function getProduct(id) {
  return PRODUCTS_CATALOG.find(p => p.id === id) || null;
}
function getCategory(slug) {
  return CATEGORIES.find(c => c.slug === slug) || null;
}
function productsByCategory(slug) {
  return PRODUCTS_CATALOG.filter(p => p.category === slug);
}
