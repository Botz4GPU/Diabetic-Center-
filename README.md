# Diabetes & Endocrinology Center — Buraydah · Patient Services Page

A bilingual (Arabic / English) "link tree" page for patients. They scan a QR
code, land on this page, and choose a service — WhatsApp, appointments,
phone, directions, health education, social media, and anything else the
center's administration adds.

The medical director manages everything **from the page itself** — there is no
visible admin login anywhere.

---

## How the hidden admin access works

1. Open the page and **tap the green emblem at the top 5 times quickly**
   (within 3 seconds). On a computer you can also open `your-site.com/#staff`.
2. A passcode prompt appears. The default passcode is **`admin1234`**.
3. After entering it, admin controls appear on the same page:
   - **Add link** — title in Arabic & English, short description, URL, and an
     icon chosen from a gallery (WhatsApp, phone, calendar, map, X,
     Instagram, Snapchat, TikTok, YouTube, Telegram, email, and more).
   - **Edit / delete / reorder** any link with the buttons on each card.
   - **QR code** — view and download a print-ready QR of the site.
   - **Backup / Restore** — download the links as a file, restore later.
   - **Change passcode** — do this on first login!
4. **Log out** when done. Patients never see any of this.

> ⚠️ **Change the default passcode immediately** (admin bar → "Change
> passcode"), or set it before first run with the environment variable
> `ADMIN_PASSCODE`.

## Adding the building photo

Copy the photo of the main building into `public/assets/` named exactly
**`building.jpg`**. It automatically becomes the faded background at the top
of the page. Until then, a designed fallback background is shown.

## Running it

Requires [Node.js](https://nodejs.org) 18+.

```bash
npm install
npm start
# → http://localhost:3000
```

### Deploying online (so patients can reach it)

> **Note:** GitHub Pages can't host this app — Pages serves static files only,
> and the links, admin panel, and QR code all need the Node server.

The fastest path is [Render](https://render.com)'s free plan, using the
`render.yaml` blueprint in this repo:

1. Sign up at render.com with your GitHub account.
2. **New + → Blueprint**, choose this repository and your main branch.
3. When prompted, set `ADMIN_PASSCODE` (your initial admin passcode) and
   `PUBLIC_URL` (leave blank the first time; after deploying, set it to the
   `https://….onrender.com` address Render gives you so QR codes are right).
4. Deploy. The site comes up at `https://<service-name>.onrender.com`.

Free-plan caveats: the app sleeps when idle (first visit after a quiet spell
takes ~30–60 s to wake), and the disk is **not persistent** — links edited in
the admin panel reset to `links.seed.json` whenever the service restarts. So
after arranging your links, download a **Backup** from the admin bar; to make
changes permanent, restore that backup after a restart, or keep
`links.seed.json` in the repo up to date. A paid Render disk (or any host
with persistent storage) removes that caveat.

Any other Node host works too — [Railway](https://railway.app), Fly.io, or a
machine inside the hospital. Two things to know:

- **Persistent disk**: links are stored in the `data/` folder. Choose a host
  (or plan) with persistent storage, otherwise edits are lost when the host
  restarts the app. On Railway attach a **Volume** mounted at `/app/data`;
  on Render add a **Disk** mounted at `/opt/render/project/src/data`.
  The Backup button is your safety net either way.
- **Environment variables** (optional):
  - `ADMIN_PASSCODE` — initial admin passcode (only used on first run).
  - `PUBLIC_URL` — the public address of the site (e.g.
    `https://links.example.com`). Used for the generated QR code; if unset,
    the QR uses whatever address the admin is browsing from.
  - `PORT` — defaults to `3000`.

Once deployed, log in as admin → **QR code** → **Download** → print it and
place it at reception and in the clinics.

## Where things live

| Path | Purpose |
|---|---|
| `server.js` | Express server + admin API (passcode, sessions, QR, backup) |
| `public/` | The patient-facing page (HTML/CSS/JS, no build step) |
| `links.seed.json` | The starter links loaded on first run — edit freely |
| `data/` | Created at runtime: live links + passcode hash (not in git) |

The starter links contain **placeholder numbers** (`wa.me/966500000000`,
`tel:+966163000000`) — replace them with the center's real numbers via the
admin editor.
