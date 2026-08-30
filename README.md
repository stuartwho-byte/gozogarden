# Gozo Garden Journal

A small, ad-free, static blog. Built with [Eleventy](https://www.11ty.dev/), deployed on Netlify, comments via [Giscus](https://giscus.app), zero database, zero platform layer.

## 1. Get it onto GitHub

```
cd gozo-garden-blog
git init
git add .
git commit -m "Initial site"
```
Create an empty repo on GitHub (no README/license — you already have files), then:
```
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git branch -M main
git push -u origin main
```

## 2. Connect it to Netlify

In the Netlify dashboard: **Add new site → Import an existing project → GitHub** → pick this repo.
Build settings are already set via `netlify.toml` (`npm run build`, publishes `_site`) — Netlify should detect them automatically. Deploy.

You'll get a random `something-something.netlify.app` address. To rename it: **Site configuration → General → Site details → Change site name** → pick something like `gozo-garden-journal`. That becomes your permanent free subdomain.

**Important:** once you've picked your real subdomain, update it in two places so canonical URLs, RSS, and the sitemap all point somewhere real:
- `src/_data/site.js` → the `url` field
- `src/robots.txt` → the `Sitemap:` line

Commit and push; Netlify redeploys automatically on every push to `main` from here on.

## 3. Turn on comments (Giscus)

Giscus stores comments as GitHub Discussions on your own repo — no third-party database, no ads, and you already have the GitHub account for it.

1. In your repo: **Settings → General → Features → check "Discussions"**.
2. Go to [giscus.app](https://giscus.app), enter your repo name, and follow its setup steps (it checks the giscus app is installed and Discussions is on).
3. It generates a config block with four values: repo, repo ID, category, category ID. Copy those into `src/_data/site.js`, replacing the placeholder `giscus` block.
4. Commit and push.

## 4. Adding a new entry (the actual workflow)

The plan: bring Claude your notes, photos, and whatever's changed in the garden since the last entry (Claude already has the full project history to draw on). Claude drafts the post and hands you two things:

- A `.md` file → drop it into `src/posts/`
- Any images → drop them into `src/images/`

Then:
```
git add .
git commit -m "New entry: <title>"
git push
```
Netlify rebuilds and it's live in about a minute. That's the whole publishing step.

### Post file format, for reference
```markdown
---
title: Post Title
date: 2026-11-15
season: Autumn
excerpt: One or two sentences — used as the homepage summary and the social/search preview.
image: /images/whatever.jpg
imageAlt: Description of the photo, for screen readers and SEO
tags: [drainage, iron chlorosis]
---

Post body in plain markdown.
```
Only `title` and `date` are required — everything else is optional.

## 5. Preview changes locally before pushing

```
npm install
npm run serve
```
Opens a local preview at `http://localhost:8080` that live-reloads as files change.

## 6. SEO basics already wired in

- `sitemap.xml` and `robots.txt` are generated automatically
- Every post gets Open Graph tags, Twitter card tags, and BlogPosting structured data
- Once the site is live at its real address, submit the sitemap URL (`https://your-site.netlify.app/sitemap.xml`) to [Google Search Console](https://search.google.com/search-console) — that's what actually gets you indexed; nothing else here does it automatically

## Design notes

Palette and type are described in `src/css/style.css` as CSS custom properties at the top of the file — change colors/fonts there, nothing else needs touching. The horizontal banded strip that appears on the homepage and every post is a literal (if simplified) cross-section of this garden's actual soil profile — topsoil, then the clay hardpan at 5–7", then the unknown layer below it. It's the one recurring visual element on the site, on purpose.
