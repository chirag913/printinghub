/* ============================================================
   /api/publish — commits catalog changes straight to GitHub.
   ------------------------------------------------------------
   The admin page calls this; GitHub then triggers a Vercel
   redeploy automatically, so the client never touches git.

   This route is protected by middleware.js (same admin login).
   The GitHub token lives only in Vercel's environment — it is
   never sent to the browser.

   Required environment variables:
     GITHUB_TOKEN    fine-grained PAT, "Contents: Read and write"
                     on this repository only
     GITHUB_REPO     "owner/repository"
   Optional:
     GITHUB_BRANCH   defaults to "main"
     SITE_DIR        sub-folder holding the site inside the repo.
                     Leave unset if the site is the repo root;
                     set to "site" if files live in /site.
   ============================================================ */

const API = 'https://api.github.com';

function env() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';
  let dir = (process.env.SITE_DIR || '').replace(/^\/+|\/+$/g, '');
  if (dir) dir += '/';
  return { token, repo, branch, dir };
}

async function gh(path, token, options = {}) {
  const res = await fetch(API + path, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'printinghub-admin',
      ...(options.body ? { 'Content-Type': 'application/json' } : {})
    }
  });
  return res;
}

/* Existing file SHA, required by GitHub to update rather than create. */
async function currentSha(repo, path, branch, token) {
  const res = await gh(`/repos/${repo}/contents/${encodeURI(path)}?ref=${encodeURIComponent(branch)}`, token);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Could not read ${path} from GitHub (${res.status}). ${await res.text()}`);
  const j = await res.json();
  return j.sha || null;
}

async function commitFile({ repo, branch, token }, path, base64, message) {
  const sha = await currentSha(repo, path, branch, token);
  const res = await gh(`/repos/${repo}/contents/${encodeURI(path)}`, token, {
    method: 'PUT',
    body: JSON.stringify({ message, content: base64, branch, ...(sha ? { sha } : {}) })
  });
  if (!res.ok) {
    const text = await res.text();
    if (res.status === 404) {
      throw new Error(
        'GitHub returned 404. Usually this means GITHUB_REPO is wrong, the branch does not exist, ' +
        'or the token lacks "Contents: Read and write" access to this repository.'
      );
    }
    if (res.status === 401 || res.status === 403) {
      throw new Error('GitHub rejected the token (' + res.status + '). Check GITHUB_TOKEN is valid and not expired.');
    }
    if (res.status === 409) {
      throw new Error('Conflict — the file changed on GitHub since this page loaded. Reload the admin and publish again.');
    }
    throw new Error(`GitHub error ${res.status}: ${text.slice(0, 300)}`);
  }
  const j = await res.json();
  return j.commit && j.commit.sha;
}

export default async function handler(req, res) {
  const cfg = env();

  if (req.method === 'GET') {
    // Lets the admin show whether one-click publishing is available.
    return res.status(200).json({
      ready: Boolean(cfg.token && cfg.repo),
      repo: cfg.repo || null,
      branch: cfg.branch,
      dir: cfg.dir || '(repo root)',
      missing: [!cfg.token && 'GITHUB_TOKEN', !cfg.repo && 'GITHUB_REPO'].filter(Boolean)
    });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  if (!cfg.token || !cfg.repo) {
    return res.status(503).json({
      error: 'Publishing is not configured. Set ' +
             [!cfg.token && 'GITHUB_TOKEN', !cfg.repo && 'GITHUB_REPO'].filter(Boolean).join(' and ') +
             ' in the Vercel project settings, then redeploy.'
    });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

  try {
    if (body.type === 'catalog') {
      if (typeof body.content !== 'string' || body.content.length < 50) {
        return res.status(400).json({ error: 'Catalog content missing or too short.' });
      }
      // Guard against committing something that would break the live site.
      if (!body.content.includes('PRODUCTS_CATALOG') || !body.content.includes('CATEGORIES')) {
        return res.status(400).json({ error: 'That does not look like a valid products.js — refusing to publish it.' });
      }
      const path = `${cfg.dir}js/products.js`;
      const b64 = Buffer.from(body.content, 'utf8').toString('base64');
      const sha = await commitFile(cfg, path, b64, body.message || 'Update product catalog via admin');
      return res.status(200).json({ ok: true, path, commit: sha });
    }

    if (body.type === 'image') {
      const name = String(body.name || '');
      if (!/^[a-z0-9][a-z0-9._-]*\.(jpg|jpeg|png|webp)$/i.test(name)) {
        return res.status(400).json({ error: `Unsafe or unsupported image filename: "${name}"` });
      }
      const m = /^data:image\/[a-z+]+;base64,(.+)$/i.exec(String(body.dataUri || ''));
      if (!m) return res.status(400).json({ error: 'Image data was not a valid base64 data URI.' });
      const path = `${cfg.dir}images/${name}`;
      const sha = await commitFile(cfg, path, m[1], `Add product photo ${name} via admin`);
      return res.status(200).json({ ok: true, path, commit: sha });
    }

    return res.status(400).json({ error: 'Unknown publish type. Expected "catalog" or "image".' });
  } catch (err) {
    return res.status(500).json({ error: err.message || String(err) });
  }
}
