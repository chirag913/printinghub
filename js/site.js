/* ============================================================
   PrintingHub Dubai — shared site chrome & helpers
   Injects the header, footer and floating WhatsApp bubble on
   every page, and provides the product-card renderer used by
   the home, shop and product pages.

   Usage per page:
     <div id="site-header" data-active="shop" data-search></div>
     ...page content...
     <div id="site-footer"></div>
     <script src="js/products.js"></script>
     <script src="js/site.js"></script>
   ============================================================ */

const SITE = {
  waNumber: "971521925902",              // wa.me format: no + or spaces
  phoneDisplay: "+971 52 192 5902",
  email: "hello@printinghubdubai.com",
  addressLines: ["Mall - Office #16, 1st Floor,", "Blue Tin Elite Business Center,", "Al Shindagha, Bur Dubai,", "Dubai, UAE"],
  genericMessage: "Hi PrintingHub Dubai! I'd like to get a quote for a printing order."
};

function waLink(message) {
  return "https://wa.me/" + SITE.waNumber + "?text=" + encodeURIComponent(message || SITE.genericMessage);
}

const WA_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.5 5.3L2 22l4.9-1.3C8.4 21.5 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>';

/* small stroke icons for category lists */
const CAT_ICONS = {
  card:   '<svg viewBox="0 0 24 24" stroke-width="1.8"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M2 10h20"/></svg>',
  mail:   '<svg viewBox="0 0 24 24" stroke-width="1.8"><path d="M3 8l9 6 9-6"/><rect x="3" y="5" width="18" height="14" rx="2"/></svg>',
  image:  '<svg viewBox="0 0 24 24" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M3 17l6-5 5 4 3-2 4 3"/></svg>',
  doc:    '<svg viewBox="0 0 24 24" stroke-width="1.8"><path d="M4 3h16v18l-4-3-4 3-4-3-4 3z"/></svg>',
  circle: '<svg viewBox="0 0 24 24" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M9 12a3 3 0 106 0 3 3 0 00-6 0z"/></svg>',
  folder: '<svg viewBox="0 0 24 24" stroke-width="1.8"><path d="M4 4h11l5 5v11H4z"/><path d="M15 4v5h5"/></svg>',
  rect:   '<svg viewBox="0 0 24 24" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 9h8M8 13h5"/></svg>',
  flag:   '<svg viewBox="0 0 24 24" stroke-width="1.8"><path d="M6 3v18M6 3l12 4-12 4"/></svg>',
  square: '<svg viewBox="0 0 24 24" stroke-width="1.8"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 10h8M8 14h5"/></svg>',
  book:   '<svg viewBox="0 0 24 24" stroke-width="1.8"><rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
  gift:   '<svg viewBox="0 0 24 24" stroke-width="1.8"><path d="M20 12v9H4v-9M2 7h20v5H2z"/><path d="M12 7v14M12 7c-2-4-7-3-6 0M12 7c2-4 7-3 6 0"/></svg>'
};

/* CSS illustration markup, keyed by product.illustration */
const ILLUS_MARKUP = {
  cards: '<div class="illus" role="img" aria-label="Illustration of two fanned business cards"><div class="illus-cards"><div class="c c1"><div class="c-dot"></div><div class="c-ln"></div></div><div class="c c2"><div class="c-dot"></div><div class="c-ln"></div></div></div></div>',
  envelope: '<div class="illus" role="img" aria-label="Illustration of an invitation card in an envelope"><div class="illus-env"><div class="env-body"></div><div class="env-flap"></div><div class="env-card"></div></div></div>',
  book: '<div class="illus" role="img" aria-label="Illustration of a printed invoice book"><div class="illus-book"><div class="book-mock"><div class="bar">LOGO</div><div class="row"></div><div class="row"></div><div class="row"></div><div class="row"></div></div></div></div>',
  banner: '<div class="illus" role="img" aria-label="Illustration of a roll-up banner stand"><div class="illus-banner"><div class="pole"></div><div class="flag"><div class="flag-line l1"></div><div class="flag-line l2"></div></div><div class="base"></div></div></div>',
  flyer: '<div class="illus" role="img" aria-label="Illustration of a stack of printed flyers"><div class="illus-flyer"><div class="sheet s1"></div><div class="sheet s2"></div><div class="sheet s3"><div class="head"></div><div class="ln"></div><div class="ln"></div><div class="ln short"></div><div class="dot"></div></div></div></div>',
  letterhead: '<div class="illus" role="img" aria-label="Illustration of a company letterhead sheet"><div class="illus-letter"><div class="lh-head"><div class="lh-logo"></div><div class="lh-name"></div></div><div class="lh-ln"></div><div class="lh-ln"></div><div class="lh-ln short"></div><div class="lh-ln"></div><div class="lh-ln short"></div><div class="lh-foot"></div></div></div>',
  sticker: '<div class="illus" role="img" aria-label="Illustration of a sheet of round stickers"><div class="illus-sticker"><div class="st st1"></div><div class="st st2"></div><div class="st st3"></div><div class="st st4"></div><div class="peel"></div></div></div>',
  trifold: '<div class="illus" role="img" aria-label="Illustration of a tri-fold brochure"><div class="illus-trifold"><div class="panel p1"><div class="band"></div><div class="tln"></div><div class="tln short"></div></div><div class="panel p2"><div class="band"></div><div class="tln"></div><div class="tln"></div><div class="tln short"></div></div><div class="panel p3"><div class="band"></div><div class="tln"></div><div class="tln short"></div></div></div></div>',
  greeting: '<div class="illus" role="img" aria-label="Illustration of a greeting card with a heart"><div class="illus-greet"><div class="g-back"></div><div class="g-front"><div class="g-band"></div><div class="g-heart"></div><div class="g-ln"></div><div class="g-ln short"></div></div></div></div>',
  gift: '<div class="illus" role="img" aria-label="Illustration of a gift box with ribbon"><div class="illus-gift"><div class="g-box"></div><div class="g-lid"></div><div class="g-ribbon"></div><div class="g-bow"></div></div></div>'
};

/* ---------- header / footer injection ---------- */
const NAV_LINKS = [
  ["/", "Home", "home"],
  ["/shop", "Shop", "shop"],
  ["/services", "Services", "services"],
  ["/about", "About", "about"],
  ["/faq", "FAQ", "faq"],
  ["/contact", "Contact", "contact"]
];

function renderHeader() {
  const mount = document.getElementById("site-header");
  if (!mount) return;
  const active = mount.dataset.active || "";
  const withSearch = mount.dataset.search !== undefined;

  const navHtml = NAV_LINKS.map(([href, label, key]) =>
    '<a href="' + href + '"' + (key === active ? ' class="active"' : '') + '>' + label + '</a>'
  ).join("");

  let html =
    '<div class="top-strip">' +
      '<div class="wrap">' +
        '<span class="offer-msg">Free delivery in Dubai on orders over AED 300</span>' +
        '<span><a href="mailto:' + SITE.email + '">' + SITE.email + '</a><span class="divider">|</span>' +
        '<a href="' + waLink() + '" target="_blank" rel="noopener">' + SITE.phoneDisplay + '</a></span>' +
      '</div>' +
    '</div>' +
    '<header class="site-header">' +
      '<div class="wrap topbar">' +
        '<a href="/" class="logo" aria-label="PrintingHub Dubai home">Printing<span>Hub</span></a>' +
        '<nav class="main-nav" aria-label="Main navigation">' + navHtml + '</nav>' +
        '<div class="header-actions">' +
          '<a href="' + waLink() + '" class="btn-wa-top" target="_blank" rel="noopener">' + WA_ICON + '<span class="wa-label">Order on WhatsApp</span></a>' +
          '<button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false">☰</button>' +
        '</div>' +
      '</div>' +
      '<nav class="mobile-nav" id="mobileNav" aria-label="Mobile navigation">' + navHtml + '</nav>' +
    '</header>';

  if (withSearch) {
    html +=
      '<div class="util-bar">' +
        '<form class="wrap" id="siteSearchForm" role="search" action="/shop" method="get">' +
          '<div class="search-mid">' +
            '<svg viewBox="0 0 24 24" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>' +
            '<input type="text" name="search" id="siteSearchInput" placeholder="Search for products (e.g. business cards, banners...)" aria-label="Search products">' +
          '</div>' +
          '<button class="search-btn" type="submit" aria-label="Search"><svg viewBox="0 0 24 24" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg></button>' +
        '</form>' +
      '</div>';
  }

  mount.outerHTML = html;

  const toggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      const open = mobileNav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
}

function renderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;
  mount.outerHTML =
    '<footer>' +
      '<div class="wrap">' +
        '<div class="foot-grid">' +
          '<div>' +
            '<div class="logo" style="color:#fff;margin-bottom:14px;">Printing<span style="color:var(--red);">Hub</span></div>' +
            '<p style="max-width:250px;">Fast, friendly commercial printing for Dubai businesses since 2012. Order in minutes on WhatsApp.</p>' +
          '</div>' +
          '<div><h2>Company</h2>' +
            '<a href="/about">About Us</a>' +
            '<a href="/services">Our Services</a>' +
            '<a href="/#why-us">Why Choose Us</a>' +
            '<a href="/gallery">Recent Work</a>' +
            '<a href="/testimonials">Testimonials</a>' +
            '<a href="/faq">FAQ</a>' +
          '</div>' +
          '<div><h2>Shop</h2>' +
            '<a href="/shop?cat=business-cards">Business Cards</a>' +
            '<a href="/shop?cat=banners-posters">Banners & Posters</a>' +
            '<a href="/shop?cat=invoice-books">Invoice Books</a>' +
            '<a href="/shop?cat=stickers-labels">Stickers & Labels</a>' +
            '<a href="/shop?cat=corporate-gifts">Corporate Gifts</a>' +
            '<a href="/shop">All Products</a>' +
          '</div>' +
          '<div><h2>Contact</h2>' +
            '<a href="' + waLink() + '" target="_blank" rel="noopener">' + SITE.phoneDisplay + ' (WhatsApp)</a>' +
            '<a href="mailto:' + SITE.email + '">' + SITE.email + '</a>' +
            '<p style="margin-bottom:0;">' + SITE.addressLines.join("<br>") + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="foot-bottom"><span>© 2026 PrintingHub Dubai. All rights reserved.</span><span>printinghubdubai.com</span></div>' +
      '</div>' +
    '</footer>' +
    '<a href="' + waLink() + '" class="wa-float" target="_blank" rel="noopener" aria-label="Chat with PrintingHub Dubai on WhatsApp">' + WA_ICON + '</a>';
}

/* ---------- product visual: real photo when available, illustration otherwise ----------
   Set `image` on a product (e.g. "images/business-card-matte.jpg") and it renders a
   real <img>. Products with no image keep the CSS illustration, so the catalog never
   shows a broken or generic placeholder. `imageAlt` overrides the default alt text. */
/* Accent palette for illustrations. All on-brand, so a grid of products reads as one
   family while no two neighbours look identical. A product can pin its own colour with
   `accent`; otherwise it's derived from the id so it stays stable across page loads. */
const ILLUS_ACCENTS = [
  { ink: '#EF4136', deep: '#8f1526' },   // brand red
  { ink: '#1A1A1A', deep: '#000000' },   // ink black
  { ink: '#F2B90F', deep: '#b8860b' },   // brand yellow
  { ink: '#2B6CB0', deep: '#1a4a80' },   // navy
  { ink: '#2F855A', deep: '#1d5c3d' },   // deep green
  { ink: '#6B46C1', deep: '#4c3191' },   // plum
  { ink: '#C05621', deep: '#8a3c14' },   // terracotta
  { ink: '#4A5568', deep: '#2d3748' }    // slate
];
function accentFor(p) {
  if (p.accent && ILLUS_ACCENTS[p.accent]) return ILLUS_ACCENTS[p.accent];
  let h = 0;
  const s = String(p.id || p.name || '');
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return ILLUS_ACCENTS[h % ILLUS_ACCENTS.length];
}
function illustrationFor(p) {
  const markup = ILLUS_MARKUP[p.illustration] || "";
  if (!markup) return "";
  const a = accentFor(p);
  // slight, deterministic tilt so repeated shapes don't line up mechanically
  let h = 0; const s = String(p.id || '');
  for (let i = 0; i < s.length; i++) h = (h * 17 + s.charCodeAt(i)) >>> 0;
  const tilt = ((h % 7) - 3);
  return '<div class="illus-theme" style="--acc:' + a.ink + ';--acc-deep:' + a.deep +
         ';--tilt:' + tilt + 'deg;">' + markup + '</div>';
}

function productVisual(p, opts) {
  opts = opts || {};
  if (p.image) {
    const alt = p.imageAlt || (p.name + " printed by PrintingHub Dubai");
    const loading = opts.eager ? "" : ' loading="lazy" decoding="async"';
    return '<img class="prod-photo" src="' + p.image + '" alt="' + alt + '"' + loading +
           ' onerror="this.parentNode.classList.add(\'photo-failed\');this.remove();">' +
           '<div class="photo-fallback">' + illustrationFor(p) + '</div>';
  }
  return illustrationFor(p);
}

/* ---------- product card renderer ---------- */
function formatPrice(n) {
  return "Dhs. " + (Number.isInteger(n) ? n : n.toFixed(2));
}

function renderProductCard(p) {
  const cat = getCategory(p.category);
  const illus = productVisual(p);
  const badge = p.was ? '<span class="sale-badge">SALE</span>' : "";
  const wasHtml = p.was ? '<span class="was">' + formatPrice(p.was) + '</span>' : '<span class="unit-note">/ ' + p.unit + '</span>';
  const msg = "Hi PrintingHub Dubai! I'd like to order: " + p.name + " (from " + formatPrice(p.price) + " per " + p.unit + "). Please share details.";
  return (
    '<article class="prod-card" data-product-id="' + p.id + '">' +
      badge +
      '<a href="/product-page?id=' + p.id + '" class="prod-img" style="background:' + p.bg + ';" aria-label="' + p.name + '">' + illus + '</a>' +
      '<div class="prod-body">' +
        '<div class="cat-tag">' + (cat ? cat.name : "") + '</div>' +
        '<h3><a href="/product-page?id=' + p.id + '">' + p.name + '</a></h3>' +
        '<div class="price-line"><span class="now">' + formatPrice(p.price) + '</span>' + wasHtml + '</div>' +
        '<a href="' + waLink(msg) + '" class="btn-mini-wa" target="_blank" rel="noopener">' + WA_ICON + 'Order on WhatsApp</a>' +
      '</div>' +
    '</article>'
  );
}

/* make the whole card clickable (except the WhatsApp button) */
function attachCardClicks(container) {
  (container || document).querySelectorAll(".prod-card[data-product-id]").forEach(function (card) {
    if (card.dataset.clickBound) return;
    card.dataset.clickBound = "1";
    card.style.cursor = "pointer";
    card.addEventListener("click", function (e) {
      if (e.target.closest(".btn-mini-wa") || e.target.closest("a")) return;
      window.location.href = "/product-page?id=" + card.dataset.productId;
    });
  });
}

renderHeader();
renderFooter();
