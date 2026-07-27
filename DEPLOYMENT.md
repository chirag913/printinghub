# Deploying to GitHub + Vercel (with client admin access)

This gives the client a real login at `printinghubdubai.com/admin.html` where they can
change prices, add products and upload photos, then hit **Publish** — the site updates
itself. They never touch GitHub, Vercel, or any files.

---

## 1. Push to GitHub

Put the contents of this `site/` folder in a repository. You have two options:

| Layout | `SITE_DIR` env var | Vercel "Root Directory" |
|---|---|---|
| Site files at repo root (recommended) | leave unset | leave blank |
| Site kept inside a `site/` sub-folder | `site` | `site` |

These two settings mean different things, so don't mix them up:
- **Vercel Root Directory** tells Vercel where to *serve* from.
- **`SITE_DIR`** tells the publish API where files live *inside the GitHub repo*, because
  the GitHub API always works from the repository root.

`node_modules/` is already gitignored.

## 2. Import into Vercel

1. Go to vercel.com → **Add New → Project** → import the repository.
2. Framework Preset: **Other**. No build command, no output directory.
3. Set Root Directory if you used the sub-folder layout.
4. Deploy.

Vercel installs `@vercel/edge` automatically and picks up `middleware.js` and `api/publish.js`.

## 3. Create the admin login

Vercel → your project → **Settings → Environment Variables**. Add:

| Name | Value | Notes |
|---|---|---|
| `ADMIN_USER` | e.g. `printhub` | the client's username |
| `ADMIN_PASS` | a long random password | give this to the client |

Apply them to **Production** (and Preview if you want protection there too).

> Until both are set, `/admin.html` returns **503 – Admin is not configured**. That is
> deliberate: an unconfigured deployment must never leave the admin wide open.

## 4. Enable one-click publishing

Create a GitHub **fine-grained personal access token**:

1. GitHub → Settings → Developer settings → **Personal access tokens → Fine-grained tokens**
   → *Generate new token*.
2. **Repository access:** Only select repositories → pick this one repo.
3. **Permissions:** Repository permissions → **Contents: Read and write**. Nothing else.
4. Set an expiry you're willing to renew (GitHub will email you before it lapses).

Then add to Vercel Environment Variables:

| Name | Value |
|---|---|
| `GITHUB_TOKEN` | the token you just generated |
| `GITHUB_REPO` | `owner/repository` (e.g. `chirag/printinghub-dubai`) |
| `GITHUB_BRANCH` | `main` — only needed if your default branch differs |
| `SITE_DIR` | only if the site lives in a sub-folder (see step 1) |

**Redeploy** after adding variables — Vercel only picks them up on a new deployment.

Open `/admin.html`: the bar should read *"Publishing to owner/repo (main)"* and the green
**Publish to live site** button becomes active.

---

## How publishing works

1. Client edits in the admin (changes are held in their browser until they publish).
2. **Publish to live site** → uploads any new photos, then the catalog, committing each to
   GitHub through `/api/publish`.
3. The commit triggers Vercel's automatic redeploy.
4. The live site is updated, typically within a minute.

Every change is an ordinary git commit, so **the full history is in GitHub** — you can see
exactly what the client changed and revert anything from there.

## Security notes

- The password is checked at Vercel's edge **before any file is served**, so `admin.html`
  is never delivered to an unauthenticated visitor. This is real access control, not a
  client-side gate that could be bypassed by viewing source or disabling JavaScript.
- The GitHub token stays in Vercel's environment and is never sent to the browser.
- `/api/publish` sits behind the same login, so nobody can post to it anonymously.
- The API only ever writes to `js/products.js` and `images/*` (filenames are validated to
  block path traversal and non-image extensions), so a compromised admin session cannot
  overwrite arbitrary files in the repo.
- Basic Auth sends credentials on every request; Vercel is HTTPS-only, so they're encrypted
  in transit. Use a long, unique password.
- To revoke access: change `ADMIN_PASS` (and redeploy), and delete the GitHub token.

## Changing the password later

Update `ADMIN_PASS` in Vercel and redeploy. Browsers cache Basic Auth credentials for the
session, so tell the client to fully close and reopen their browser after a change.

## If publishing ever breaks

The admin falls back gracefully — **Export products.js** and **Download images** still work,
and you can commit those files to GitHub by hand. The admin shows the exact error, and
`/api/publish` returns plain-English messages for the common causes (wrong repo name,
expired token, missing permission, branch mismatch).

## Local development

`middleware.js` and `api/` only run on Vercel. Locally the admin detects this, disables the
Publish button, and tells you to use Export instead. To exercise the real thing locally:

```bash
npx vercel dev
```

Otherwise a static server is fine for everything except publishing. Use `serve` rather than
`http-server`, because the site uses clean URLs (`/shop`, not `/shop.html`) and `serve`
resolves extensionless paths the same way Vercel does:

```bash
npx serve . -l 8123
```
