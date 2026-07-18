/*
 * Diabetes and Endocrinology Center — Buraydah
 * Patient services link page + hidden admin API.
 *
 * Storage: plain JSON files under ./data (created on first run).
 * Auth:    passcode -> HMAC-signed session cookie. No accounts, no database.
 */

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const express = require("express");
const QRCode = require("qrcode");

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_DIR = path.join(__dirname, "data");
const CONFIG_FILE = path.join(DATA_DIR, "config.json");
const LINKS_FILE = path.join(DATA_DIR, "links.json");
const SEED_FILE = path.join(__dirname, "links.seed.json");

const SESSION_HOURS = 12;
const COOKIE_NAME = "dec_admin";
const DEFAULT_PASSCODE = process.env.ADMIN_PASSCODE || "admin1234";

/* ---------------------------------------------------------------- storage */

function ensureData() {
  fs.mkdirSync(DATA_DIR, { recursive: true });

  if (!fs.existsSync(CONFIG_FILE)) {
    const salt = crypto.randomBytes(16).toString("hex");
    const config = {
      salt,
      passcodeHash: hashPasscode(DEFAULT_PASSCODE, salt),
      secret: crypto.randomBytes(32).toString("hex"),
      publicUrl: process.env.PUBLIC_URL || ""
    };
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
  }

  if (!fs.existsSync(LINKS_FILE)) {
    const seed = fs.existsSync(SEED_FILE)
      ? fs.readFileSync(SEED_FILE, "utf8")
      : "[]";
    fs.writeFileSync(LINKS_FILE, seed);
  }
}

function readConfig() {
  return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));
}

function writeConfig(config) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

function readLinks() {
  try {
    const links = JSON.parse(fs.readFileSync(LINKS_FILE, "utf8"));
    return Array.isArray(links) ? links : [];
  } catch {
    return [];
  }
}

function writeLinks(links) {
  const tmp = LINKS_FILE + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(links, null, 2));
  fs.renameSync(tmp, LINKS_FILE);
}

/* ------------------------------------------------------------------- auth */

function hashPasscode(passcode, salt) {
  return crypto.scryptSync(String(passcode), salt, 32).toString("hex");
}

function timingSafeEq(a, b) {
  const ba = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  return ba.length === bb.length && crypto.timingSafeEqual(ba, bb);
}

function signSession(secret, expiresAt) {
  const mac = crypto
    .createHmac("sha256", secret)
    .update("admin:" + expiresAt)
    .digest("hex");
  return mac + "." + expiresAt;
}

function verifySession(secret, token) {
  if (typeof token !== "string") return false;
  const dot = token.lastIndexOf(".");
  if (dot < 0) return false;
  const expiresAt = Number(token.slice(dot + 1));
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;
  return timingSafeEq(token, signSession(secret, expiresAt));
}

function getCookie(req, name) {
  const header = req.headers.cookie || "";
  for (const part of header.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === name) return decodeURIComponent(rest.join("="));
  }
  return null;
}

function isAdmin(req) {
  return verifySession(readConfig().secret, getCookie(req, COOKIE_NAME));
}

function requireAdmin(req, res, next) {
  if (!isAdmin(req)) return res.status(401).json({ error: "unauthorized" });
  next();
}

/* Simple in-memory throttle for passcode attempts. */
const attempts = new Map();
function throttled(ip) {
  const now = Date.now();
  const entry = attempts.get(ip) || { count: 0, resetAt: now + 15 * 60 * 1000 };
  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + 15 * 60 * 1000;
  }
  entry.count += 1;
  attempts.set(ip, entry);
  return entry.count > 10;
}

/* -------------------------------------------------------------- validation */

const ALLOWED_SCHEMES = /^(https?:\/\/|tel:|mailto:|geo:)/i;
const MAX_LINKS = 60;
const MAX_TEXT = 160;

function cleanText(value) {
  return typeof value === "string" ? value.trim().slice(0, MAX_TEXT) : "";
}

function sanitizeLink(raw) {
  if (!raw || typeof raw !== "object") return null;
  const url = typeof raw.url === "string" ? raw.url.trim() : "";
  if (!ALLOWED_SCHEMES.test(url) || url.length > 500) return null;

  const link = {
    id: typeof raw.id === "string" && /^[\w-]{1,40}$/.test(raw.id)
      ? raw.id
      : crypto.randomBytes(6).toString("hex"),
    icon: typeof raw.icon === "string" && /^[\w-]{1,32}$/.test(raw.icon)
      ? raw.icon
      : "globe",
    url,
    title_ar: cleanText(raw.title_ar),
    title_en: cleanText(raw.title_en),
    desc_ar: cleanText(raw.desc_ar),
    desc_en: cleanText(raw.desc_en)
  };
  if (!link.title_ar && !link.title_en) return null;
  return link;
}

/* ------------------------------------------------------------------ routes */

app.use(express.json({ limit: "256kb" }));

app.get("/api/links", (req, res) => {
  res.json({ links: readLinks() });
});

app.get("/api/session", (req, res) => {
  res.json({ admin: isAdmin(req) });
});

app.post("/api/login", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "?";
  if (throttled(String(ip))) {
    return res.status(429).json({ error: "too_many_attempts" });
  }
  const config = readConfig();
  const given = hashPasscode(req.body?.passcode || "", config.salt);
  if (!timingSafeEq(given, config.passcodeHash)) {
    return res.status(401).json({ error: "wrong_passcode" });
  }
  const expiresAt = Date.now() + SESSION_HOURS * 3600 * 1000;
  const token = signSession(config.secret, expiresAt);
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_HOURS * 3600}`
  );
  res.json({ ok: true });
});

app.post("/api/logout", (req, res) => {
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`
  );
  res.json({ ok: true });
});

/* Full replace keeps add / edit / delete / reorder as one operation. */
app.put("/api/links", requireAdmin, (req, res) => {
  const incoming = Array.isArray(req.body?.links) ? req.body.links : null;
  if (!incoming) return res.status(400).json({ error: "bad_request" });
  const links = incoming.slice(0, MAX_LINKS).map(sanitizeLink).filter(Boolean);
  writeLinks(links);
  res.json({ links });
});

app.post("/api/passcode", requireAdmin, (req, res) => {
  const { current, next } = req.body || {};
  const config = readConfig();
  if (!timingSafeEq(hashPasscode(current || "", config.salt), config.passcodeHash)) {
    return res.status(401).json({ error: "wrong_passcode" });
  }
  if (typeof next !== "string" || next.length < 6 || next.length > 64) {
    return res.status(400).json({ error: "weak_passcode" });
  }
  config.salt = crypto.randomBytes(16).toString("hex");
  config.passcodeHash = hashPasscode(next, config.salt);
  writeConfig(config);
  res.json({ ok: true });
});

app.get("/api/qr", requireAdmin, async (req, res) => {
  const config = readConfig();
  const url =
    config.publicUrl ||
    `${req.headers["x-forwarded-proto"] || req.protocol}://${req.headers.host}`;
  try {
    const png = await QRCode.toBuffer(url, {
      type: "png",
      width: 1024,
      margin: 2,
      color: { dark: "#123f36", light: "#ffffff" }
    });
    res.setHeader("Content-Type", "image/png");
    res.send(png);
  } catch {
    res.status(500).json({ error: "qr_failed" });
  }
});

app.get("/api/export", requireAdmin, (req, res) => {
  res.setHeader("Content-Disposition", "attachment; filename=links-backup.json");
  res.json({ links: readLinks() });
});

app.use(express.static(path.join(__dirname, "public")));

ensureData();
app.listen(PORT, () => {
  console.log(`Diabetes & Endocrinology Center links page on http://localhost:${PORT}`);
});
