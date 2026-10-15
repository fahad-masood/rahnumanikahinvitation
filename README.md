# Rahnuma & Fahad · The Nikah Ceremony

A static, maroon-and-green invitation for **Rahnuma Zarrin & Fahad Masood**. Thursday, **12 November 2026 at 6:00 PM IST**, Aman Park, New Delhi, India.

## Develop

Requires Node.js **22.22 or newer** (Node 24 recommended).

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run validate
npm run preview
```

Astro generates the complete invitation in `dist/index.html`. It has no client framework, backend, database, cookies, analytics, external font requests, or map embeds. The invitation, directions, and `.ics` download work with JavaScript disabled. The small external script enables WhatsApp sharing with the current page URL.

For sandboxed environments whose default home directory is read-only, use `npm ci --cache /tmp/rahnuma-npm-cache` and set `ASTRO_TELEMETRY_DISABLED=1` before Astro commands. Use the existing checkout; a separate Git worktree is unnecessary.

## Deploy

### Vercel

Import this repository. The included `vercel.json` selects Astro, runs `npm run build`, and publishes `dist`. Select Node 24. Vercel's `VERCEL_PROJECT_PRODUCTION_URL` automatically supplies the production origin for canonical and social image URLs. When using a custom domain, set **`SITE_URL=https://your-actual-domain`** to that domain before building.

### Netlify

Import the repository, select Node 24, set the build command to `npm run build` and publish directory to `dist`. Netlify's `URL` supplies the production origin. The included `public/_headers` configures security, font and asset caching, and calendar downloads. Set `SITE_URL` to override the origin with a custom domain.

### Any static host

Set `SITE_URL` to the real public origin, run `npm run build && npm run validate`, and publish `dist`. Apply equivalent headers from `public/_headers`. Serve `.ics` as `text/calendar; charset=utf-8`. Serve HTML with revalidation, hashed `/_astro/` assets with immutable caching, and local fonts with weekly caching.

Never set `SITE_URL` to a sample or development address in production. Without an origin, local builds deliberately omit canonical/`og:url` tags and use a relative social image path. Set a real deployment URL for standards-compliant absolute social metadata. Sharing itself always uses the page guests actually opened, without a guessed domain. After deploying, open the public URL on WhatsApp to check the published preview; cached previews may take time to refresh.

## Content and identity

- `src/data/event.ts`: exact event data and bride-first WhatsApp message.
- `src/pages/index.astro`: complete invitation, Arabic Bismillah, and metadata.
- `src/styles/tokens.css`: the complete shared maroon-and-green palette and typography.
- `src/styles/global.css`: responsive composition, motion, and control styles.
- `src/components/`: reusable arch, original vector botanicals, ornaments, and icons.
- `public/nikah.ics`: time-zone-aware event; no end time or contacts have been invented.
- `public/social-preview.png`: 1200 × 630 social card. Its editable source is `design/social-preview.html`; render it at exactly 1200 × 630 after local fonts load.
- `public/fonts/`: self-hosted WOFF2 fonts, licenses, and provenance. The Arabic subset retains all Bismillah shaping and diacritics.
- `design/DESIGN-SYSTEM.md`: reuse instructions for matching invitation projects.

The maroon-and-green design system is self-contained. Keep the tokens, components, typefaces, and layout unchanged when reusing this identity. Event content belongs in a separate project or page and is never bundled into this invitation.

## Validation and privacy

`npm run validate` checks the built invitation, names and order, date, weekday, time zone, venue, directions, calendar encoding and line folding, social metadata, and Arabic language/direction attributes. Mobile layouts and actions were additionally verified in Chromium with and without JavaScript.

The calendar begins at **18:00 Asia/Kolkata (12:30 UTC)** on 12 November 2026. There is intentionally no supplied or inferred end time. Repeated imports use a stable event UID.

Search indexing is discouraged through meta tags, robots rules, and hosting headers; social preview crawlers are allowed. This is a link-shared invitation, not an authenticated guest portal. No RSVP or contact information is collected.
