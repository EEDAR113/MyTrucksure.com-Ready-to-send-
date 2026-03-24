# MyTrucksure — Insurance Technology Website

A multi-page static website showcasing insurance technology solutions, partnerships, and industry events. Built with pure HTML, CSS, and JavaScript — no frameworks or build tools required.

---

## Folder Structure

```
├── index.html                        ← Homepage
├── README.md                         ← This file
├── css/
│   └── styles.css                    ← Global stylesheet
├── js/
│   ├── script.js                     ← Shared JavaScript (navbar, interactions, nav search)
│   └── search-index.js               ← Full-text search index (all page content)
├── images/                           ← All image assets
│   ├── MyTrucksure_logo.png          ← Primary site logo (navbar)
│   └── (banners, event photos, partner logos, etc.)
├── pages/
│   ├── partners.html                 ← Partners page
│   ├── solutions.html                ← Solutions page
│   ├── events.html                   ← Events listing page
│   ├── contact.html                  ← Contact page
│   ├── search.html                   ← Site-wide search results page
│   └── events/                       ← Individual event detail pages
│       ├── itc-vegas.html
│       ├── insurtech-chicago.html
│       ├── mcief.html
│       ├── insurtech-ny.html
│       └── atd-show.html
```

### How paths work

- `index.html` references CSS/JS as `css/styles.css`, `js/script.js`, and `js/search-index.js`, and images as `images/filename`.
- Files inside `pages/` use `../css/styles.css`, `../js/script.js`, `../js/search-index.js`, and `../images/filename`.
- Files inside `pages/events/` use `../../css/styles.css`, `../../js/script.js`, `../../js/search-index.js`, and `../../images/filename`.

> **Important:** The `images/` folder must stay at the root level. Moving it will break image paths across all pages.

---

## Pages Overview

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Landing page with hero section, benefits carousel, coverages, and contact strip |
| Partners | `pages/partners.html` | Partner organizations and collaborations |
| Solutions | `pages/solutions.html` | Insurance technology solutions offered |
| Events | `pages/events.html` | Listing of all industry events |
| Contact | `pages/contact.html` | Contact information and form |
| Search | `pages/search.html` | Site-wide full-text search results page |
| ITC Vegas | `pages/events/itc-vegas.html` | ITC Vegas event details |
| InsurTech Chicago | `pages/events/insurtech-chicago.html` | InsurTech Chicago event details |
| MCIEF | `pages/events/mcief.html` | MCIEF event details |
| InsurTech NY | `pages/events/insurtech-ny.html` | InsurTech New York event details |
| ATD Show | `pages/events/atd-show.html` | ATD Show event details |

---

## Site-Wide Search

The site includes a client-side full-text search system that works entirely in the browser with no server required.

### How it works

1. **Search icon in the navbar** — Every page has a 🔍 icon in the navbar (next to the hamburger menu on mobile). Clicking it expands a text input. Pressing Enter navigates to the search results page.
2. **Search results page** (`pages/search.html`) — Reads the `?q=` query parameter, searches the index, and displays matching pages with highlighted snippets. Typing in the search bar updates results live and also updates the URL.
3. **Search index** (`js/search-index.js`) — A JavaScript file containing the plain-text content of every page in an array. This is loaded on all pages so the navbar search can redirect to the results page with the query.

### Search result highlights

Matching terms in the search results are wrapped in `<mark class="search-highlight">` tags and displayed with a **yellow background**, making it easy to spot where the query appears in each page's content.

### Maintaining the search index

When you add or edit a page, you must update `js/search-index.js` to keep search results accurate:

1. Open `js/search-index.js`.
2. Find the entry for the page you changed (matched by `title` and `url`), or add a new entry if it's a new page.
3. Update the `content` field with the page's plain text (strip all HTML tags — just the readable text content).
4. Save and deploy.

**Entry format:**
```javascript
{
  title: "Page Title",              // Displayed in search results
  url: "pages/example.html",       // Relative to site root (index.html level)
  content: "All the visible text…"  // Plain text, no HTML
}
```

> **Tip:** The `url` field must be relative to the site root. For event detail pages, use `pages/events/filename.html`.

### Files involved

| File | Purpose |
|------|---------|
| `js/search-index.js` | Contains the searchable text content of every page |
| `pages/search.html` | The search results page (reads `?q=` and renders results) |
| `js/script.js` | Contains `initNavSearch()` which powers the navbar search icon on all pages |
| `css/styles.css` | Contains `.search-page-*` and `.search-highlight` styles |

---

## Homepage Benefits Carousel

The "Benefits of MyTrucksure SaaS" section on the homepage uses a custom carousel with the following behavior:

- **Auto-rotates every 2 seconds** — slides advance automatically on a timer.
- **Mouse drag / touch swipe** — users can grab and drag to switch slides manually; the auto-timer pauses during interaction and resumes after.
- **Fixed-height viewport** — the carousel container is a fixed 160 px tall so that arrows, dots, and surrounding page content never shift position when slides change.
- **Arrows & dots stay in place** — navigation controls are absolutely positioned and do not reflow.
- **Pauses on hover** — auto-rotation pauses when the mouse is over the carousel area.

The carousel logic is self-contained in an inline `<script>` block at the end of the benefits section in `index.html`. It does not depend on `js/script.js`.

### Adjusting the carousel

| Setting | Where to change | Default |
|---------|----------------|---------|
| Rotation speed | `var autoDelay = 2000;` in the inline script inside `index.html` | 2 000 ms (2 s) |
| Viewport height | `.benefits-carousel-viewport { height: 160px; }` in the inline `<style>` block | 160 px |
| Drag sensitivity | `var threshold = 40;` in the inline script | 40 px |

---

## Running Locally

No installation needed. Just open the files in a browser:

1. Download or clone this repository.
2. Open `index.html` in any modern browser (Chrome, Safari, Firefox, Edge).
3. Navigate using the site's navbar — all links use relative paths so everything works locally.

Alternatively, for a local server experience (avoids occasional browser restrictions on local files):

```bash
# Using Python (pre-installed on Mac/Linux)
cd YOUR-REPO-FOLDER
python3 -m http.server 8000
# Then open http://localhost:8000 in your browser
```

---

## Deploying to Cloud Services

This is a static site (HTML/CSS/JS only) with no server-side code, so it works on any static hosting platform. Below are step-by-step instructions for the most common options.

### Option 1 — GitHub Pages (current setup)

1. Push the code to a GitHub repository.
2. Go to **Settings → Pages**.
3. Set source to **Deploy from a branch**, choose `main` branch, root folder `/`.
4. Click **Save**. The site will be live at `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/` within a few minutes.

### Option 2 — Cloudflare Pages

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create application** → **Pages**.
2. Connect your GitHub account and select this repository.
3. Leave the build settings empty (no build command or output directory needed — it's already static HTML).
4. Click **Save and Deploy**.

### Option 3 — Netlify

1. Go to [netlify.com](https://www.netlify.com/) and sign in.
2. Click **Add new site → Import an existing project**.
3. Connect to GitHub and select this repository.
4. Leave build command blank, set publish directory to `/` (root).
5. Click **Deploy site**.

Alternatively, drag and drop: download the repo as a ZIP, unzip it, then drag the entire folder onto Netlify's deploy page.

### Option 4 — Vercel

1. Go to [vercel.com](https://vercel.com/) and sign in.
2. Click **Add New → Project**, then import this GitHub repository.
3. Framework preset: select **Other**.
4. Leave all build settings empty, click **Deploy**.

### Option 5 — AWS S3 + CloudFront

1. Create an S3 bucket in the [AWS Console](https://aws.amazon.com/console/).
2. Enable **Static website hosting** in bucket properties. Set index document to `index.html`.
3. Upload all files and folders from this repo into the bucket (maintain the folder structure).
4. Set the bucket policy to allow public read access.
5. (Optional) Set up a CloudFront distribution pointing to the S3 bucket for HTTPS and caching.

### Option 6 — Traditional Web Hosting (FTP)

1. Log in to your hosting provider's control panel (cPanel, Plesk, etc.).
2. Open the **File Manager** or connect via an FTP client (like FileZilla).
3. Upload all files and folders to the `public_html/` (or `www/`) directory, keeping the same folder structure.
4. The site will be live at your domain.

---

## How to Edit Content

### Editing an existing page

1. Open the `.html` file in a code editor (VS Code recommended — free at [code.visualstudio.com](https://code.visualstudio.com)).
2. Find the section you want to change and edit the text, links, or images.
3. **Update `js/search-index.js`** — if you changed any visible text, update the corresponding `content` field in the search index so search results stay accurate.
4. Save and refresh your browser to preview.
5. Commit and push to deploy.

### Adding a new event page

1. Copy any existing event file in `pages/events/` (e.g., `itc-vegas.html`).
2. Rename it (e.g., `new-event.html`).
3. Open it and replace the event name, date, description, and image references.
4. Add a link to the new page in `pages/events.html`:
   ```html
   <a href="events/new-event.html">New Event Name</a>
   ```
5. **Add a new entry to `js/search-index.js`** with the page's title, URL (`pages/events/new-event.html`), and plain-text content.
6. Save, commit, and push.

### Adding a new top-level page

1. Copy any existing page from `pages/` (e.g., `partners.html`).
2. Rename it (e.g., `new-page.html`).
3. Replace the content, keeping the navbar and footer intact.
4. Add a navigation link in every page's navbar pointing to the new page (update `index.html` and all files in `pages/` and `pages/events/` — path depth matters).
5. **Add a new entry to `js/search-index.js`** with the page's title, URL (`pages/new-page.html`), and plain-text content.
6. Save, commit, and push.

### Updating styles

All styles live in `css/styles.css`. Changes here apply globally across every page.

### Replacing images

Place new images in the `images/` folder and update the `src` attribute in the relevant HTML files. Keep filenames lowercase with no spaces (use hyphens instead).

---

## Tech Stack

- **HTML5** — semantic markup for all pages
- **CSS3** — responsive design, custom properties, flexbox/grid layouts
- **JavaScript (vanilla)** — navbar toggle, scroll interactions, benefits carousel, client-side search, no frameworks
- **No build step** — edit and deploy directly, no `npm install` or compilation needed

---

## Changelog

### 2025-03-24

- **Site-wide search added** — A full-text search system was added across all pages. A search icon in the navbar expands an inline text input; pressing Enter navigates to a dedicated search results page (`pages/search.html`). Results display page titles with content snippets and matching terms highlighted in yellow. The search runs entirely client-side using a JavaScript index file (`js/search-index.js`).
- **New files:** `pages/search.html` (search results page), `js/search-index.js` (search index containing all page content).
- **Modified files:** All HTML pages (navbar updated with search form), `css/styles.css` (search page and highlight styles added), `js/script.js` (navbar search interaction logic added).
- **Old search overlay removed** — The previous inline search overlay on `index.html` (which only matched page titles/keywords) was replaced with the new full-text search system.

### 2025-03-18

- **Logo updated** — Navbar logo changed from `official_logo.png` to `MyTrucksure_logo.png`. The new file must be present in the `images/` folder.
- **Benefits carousel rebuilt** — The "Benefits of MyTrucksure SaaS" section now uses a fixed-height viewport (160 px) so the page no longer jumps when slides switch. Arrows and dots are absolutely positioned and stay in place. Slides auto-rotate every 2 seconds and support mouse drag and touch swipe. Auto-rotation pauses on hover or during drag interaction.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Images not showing | Verify the `images/` folder is at the root and paths use the correct number of `../` for the file's depth |
| New logo not appearing | Confirm `MyTrucksure_logo.png` is in the `images/` folder and the filename matches exactly (case-sensitive) |
| CSS not loading | Check that the `<link>` tag in the HTML `<head>` points to the correct relative path for `styles.css` |
| Page links broken (404) | Make sure filenames are lowercase and match the `href` values exactly — file names are case-sensitive on most servers |
| Carousel not auto-rotating | Check the browser console for JS errors; the inline script in `index.html` must run after the carousel HTML |
| Search returns no results | Verify that the page content was added to `js/search-index.js` and the file is loaded (check for 404 in browser console) |
| Search not working on a page | Confirm the page includes both `<script src="...search-index.js">` and `<script src="...script.js">` with the correct relative paths |
| Changes not appearing on live site | Clear browser cache (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows) or wait a few minutes for the hosting provider to redeploy |
| GitHub Pages shows old version | Go to repo Settings → Pages and confirm the correct branch is selected; allow up to 5 minutes for changes to propagate |
