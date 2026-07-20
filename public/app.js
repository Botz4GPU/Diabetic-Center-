/* Diabetes & Endocrinology Center — Buraydah
   Front-end: public link list + hidden admin layer. */

"use strict";

/* ------------------------------------------------------------------ icons */
/* Hand-drawn 24x24 glyphs, recognizable per service, brand-colored tiles. */

const ICONS = {
  whatsapp: {
    color: "#25d366",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3Z"/><path d="M8.8 8.9c-.3 1.9 3.4 6.3 6.2 6.3.8 0 1.6-.5 1.6-1.2 0-.5-1-1.2-1.7-1.4-.6-.2-1 .5-1.5.4-.9-.3-2.2-1.6-2.5-2.5-.2-.5.6-.9.4-1.5-.2-.7-.8-1.7-1.4-1.7-.6 0-1 .8-1.1 1.6Z" fill="currentColor" stroke="none"/></svg>'
  },
  phone: {
    color: "#0e5c4c",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l1.5 4L8.3 9.8a12.5 12.5 0 0 0 5.9 5.9L15.9 13l4.1 1.5V19a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3 6.2 2 2 0 0 1 5 4Z"/></svg>'
  },
  calendar: {
    color: "#1c6fb8",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 9.5h17M8 3v3.5M16 3v3.5"/><path d="m10.5 14.5 1.5 1.5 3-3.2" /></svg>'
  },
  map: {
    color: "#d1583a",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s6.5-5.6 6.5-10.3A6.5 6.5 0 0 0 5.5 10.7C5.5 15.4 12 21 12 21Z"/><circle cx="12" cy="10.5" r="2.4"/></svg>'
  },
  book: {
    color: "#8a5fb8",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6.5C10.5 5 8.4 4.5 5.5 4.5c-.9 0-1.5.6-1.5 1.4v11.2c0 .8.6 1.4 1.4 1.4 3 0 5.1.5 6.6 2 1.5-1.5 3.6-2 6.6-2 .8 0 1.4-.6 1.4-1.4V5.9c0-.8-.6-1.4-1.5-1.4-2.9 0-5 .5-6.5 2Z"/><path d="M12 6.5v14"/></svg>'
  },
  x: {
    color: "#111111",
    svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 4h2.6l-5.9 6.8L21 20h-5.4l-4.2-5.6L6.5 20H3.9l6.3-7.3L4 4h5.5l3.8 5.1L17.6 4Zm-1 14.4h1.5L8.6 5.5H7L16.6 18.4Z"/></svg>'
  },
  instagram: {
    color: "#d3388f",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.8" cy="7.2" r="1" fill="currentColor" stroke="none"/></svg>'
  },
  snapchat: {
    color: "#e6c50a",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5c2.6 0 4.4 1.9 4.4 4.6v2.2c.6.4 1.2-.4 1.9.1.5.4-.4 1.2-1.2 1.7 1 2 2.6 3 4 3.3-1 1.3-2.4 1.5-3.4 1.6-.4.7-.4 1.3-1.2 1.3-.7 0-1.4-.3-2.5.2-.7.4-1.3 1-2 1s-1.3-.6-2-1c-1.1-.5-1.8-.2-2.5-.2-.8 0-.8-.6-1.2-1.3-1-.1-2.4-.3-3.4-1.6 1.4-.3 3-1.3 4-3.3-.8-.5-1.7-1.3-1.2-1.7.7-.5 1.3.3 1.9-.1V8.1c0-2.7 1.8-4.6 4.4-4.6Z"/></svg>'
  },
  tiktok: {
    color: "#1b1b1f",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4v9.9a3.7 3.7 0 1 1-3.2-3.7"/><path d="M14.5 5.2c.6 2.1 2.1 3.5 4.5 3.8"/></svg>'
  },
  youtube: {
    color: "#e03c31",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12.5" rx="3.5"/><path d="M10.2 9.6v5.3l4.6-2.7-4.6-2.6Z" fill="currentColor" stroke="none"/></svg>'
  },
  telegram: {
    color: "#2a9dd8",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m20.5 4.5-17 6.9 5 1.9M20.5 4.5 18 19l-6.5-4.6M20.5 4.5 8.5 13.3m0 0v4.9l2.9-3"/></svg>'
  },
  mail: {
    color: "#b98a44",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="m4 7 8 6 8-6"/></svg>'
  },
  globe: {
    color: "#17795f",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c-4.7 4.9-4.7 12.1 0 17 4.7-4.9 4.7-12.1 0-17Z"/></svg>'
  },
  app: {
    color: "#5265c4",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="3" width="10" height="18" rx="2.5"/><path d="M10.5 5h3M12 17.8v.1"/></svg>'
  },
  document: {
    color: "#647589",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3.5h8l4 4V20.5H6V3.5Z"/><path d="M14 3.5v4h4M9 12h6M9 15.5h6M9 8.5h2"/></svg>'
  },
  lab: {
    color: "#0d8577",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 3.5h5M10.5 3.5v6.2L5.4 18a2 2 0 0 0 1.8 3h9.6a2 2 0 0 0 1.8-3l-5.1-8.3V3.5"/><path d="M8 14.5h8"/></svg>'
  },
  heart: {
    color: "#c34f6e",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 3c0 5.4-7.5 10-7.5 10Z"/><path d="M5.5 12h3l1.5-2.5 2 4 1.5-2.5h4"/></svg>'
  },
  info: {
    color: "#4a6b8a",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5"/><circle cx="12" cy="7.8" r=".4" fill="currentColor"/></svg>'
  },
  folder: {
    color: "#0e5c4c",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 7a2 2 0 0 1 2-2h4l2 2.5h7a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2V7Z"/><path d="M3.5 10.5h17"/></svg>'
  }
};

/* ------------------------------------------------------------------- i18n */

const I18N = {
  ar: {
    kicker: "تجمع القصيم الصحي",
    title: "مركز السكري والغدد الصماء ببريدة",
    subtitle: "دليلك إلى خدمات المركز — اختر الخدمة التي تحتاجها",
    footer: "مركز السكري والغدد الصماء ببريدة — بتمكين من تجمع القصيم الصحي",
    empty: "لا توجد روابط بعد",
    staffAccess: "دخول الموظفين",
    staffHint: "هذه الصفحة مخصصة لإدارة المركز فقط",
    passcode: "رمز الدخول",
    enter: "دخول",
    cancel: "إلغاء",
    save: "حفظ",
    close: "إغلاق",
    download: "تحميل",
    addLink: "إضافة رابط",
    editLink: "تعديل الرابط",
    fTitleAr: "العنوان (عربي)",
    fTitleEn: "العنوان (إنجليزي)",
    fDescAr: "وصف مختصر (عربي)",
    fDescEn: "وصف مختصر (إنجليزي)",
    fUrl: "الرابط",
    fIcon: "الأيقونة",
    adminMode: "وضع الإدارة",
    qrTitle: "رمز QR",
    qrHint: "اطبعه وضعه في الاستقبال والعيادات",
    backup: "نسخة احتياطية",
    restore: "استرجاع",
    changePass: "تغيير الرمز",
    currentPass: "الرمز الحالي",
    newPass: "الرمز الجديد (٦ خانات فأكثر)",
    logout: "خروج",
    wrongPass: "رمز الدخول غير صحيح",
    tooMany: "محاولات كثيرة — انتظر قليلًا ثم أعد المحاولة",
    badUrl: "الرابط يجب أن يبدأ بـ https:// أو tel: أو mailto:",
    needTitle: "أدخل عنوانًا واحدًا على الأقل",
    saved: "تم الحفظ",
    deleted: "تم حذف الرابط",
    restored: "تم الاسترجاع",
    passChanged: "تم تغيير رمز الدخول",
    weakPass: "الرمز الجديد قصير جدًا",
    confirmDelete: "حذف هذا الرابط؟",
    confirmDeleteGroup: "حذف المجموعة وكل الروابط بداخلها؟",
    netError: "تعذر الاتصال بالخادم",
    restoreBad: "ملف النسخة الاحتياطية غير صالح",
    fGroup: "مجموعة روابط — تفتح قائمة روابط فرعية بدل رابط واحد",
    addInside: "إضافة رابط داخل المجموعة",
    groupEmpty: "لا توجد روابط في هذه المجموعة بعد"
  },
  en: {
    kicker: "Qassim Health Cluster",
    title: "Diabetes and Endocrinology Center — Buraydah",
    subtitle: "Your guide to our services — choose what you need",
    footer: "Diabetes and Endocrinology Center, Buraydah — Empowered by Qassim Health Cluster",
    empty: "No links yet",
    staffAccess: "Staff Access",
    staffHint: "This area is for center administration only",
    passcode: "Passcode",
    enter: "Enter",
    cancel: "Cancel",
    save: "Save",
    close: "Close",
    download: "Download",
    addLink: "Add Link",
    editLink: "Edit Link",
    fTitleAr: "Title (Arabic)",
    fTitleEn: "Title (English)",
    fDescAr: "Short description (Arabic)",
    fDescEn: "Short description (English)",
    fUrl: "URL",
    fIcon: "Icon",
    adminMode: "Admin Mode",
    qrTitle: "QR Code",
    qrHint: "Print it and place it at reception and clinics",
    backup: "Backup",
    restore: "Restore",
    changePass: "Change Passcode",
    currentPass: "Current passcode",
    newPass: "New passcode (6+ characters)",
    logout: "Log out",
    wrongPass: "Wrong passcode",
    tooMany: "Too many attempts — wait a while and try again",
    badUrl: "URL must start with https://, tel: or mailto:",
    needTitle: "Enter at least one title",
    saved: "Saved",
    deleted: "Link deleted",
    restored: "Backup restored",
    passChanged: "Passcode changed",
    weakPass: "New passcode is too short",
    confirmDelete: "Delete this link?",
    confirmDeleteGroup: "Delete this group and every link inside it?",
    netError: "Could not reach the server",
    restoreBad: "Invalid backup file",
    fGroup: "Link group — opens a list of sub-links instead of one link",
    addInside: "Add link inside group",
    groupEmpty: "No links in this group yet"
  }
};

/* ------------------------------------------------------------------ state */

let lang = localStorage.getItem("dec_lang") || "ar";
let links = [];
let admin = false;
let editingId = null;
let selectedIcon = "globe";

const $ = (id) => document.getElementById(id);
const t = (key) => I18N[lang][key] || key;

/* ------------------------------------------------------------------- i18n */

function applyLang() {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  $("langToggle").textContent = lang === "ar" ? "EN" : "ع";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    el.placeholder = t(el.dataset.i18nPh);
  });
  document.title =
    lang === "ar"
      ? "مركز السكري والغدد الصماء ببريدة — خدمات المرضى"
      : "Diabetes & Endocrinology Center Buraydah — Patient Services";
  renderLinks();
}

/* -------------------------------------------------------------- rendering */

function iconTile(name, sizeClass) {
  const icon = ICONS[name] || ICONS.globe;
  return `<span class="${sizeClass}" style="background:linear-gradient(160deg,${icon.color},${shade(icon.color)})">${icon.svg}</span>`;
}

function shade(hex) {
  const n = parseInt(hex.slice(1), 16);
  const dim = (v) => Math.max(0, Math.round(v * 0.72));
  const r = dim(n >> 16), g = dim((n >> 8) & 255), b = dim(n & 255);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[c]);
}

const ADMIN_GLYPHS = {
  up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 14 6-6 6 6"/></svg>',
  down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 10 6 6 6-6"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 5.5 18.5 9.5 8 20H4v-4L14.5 5.5ZM12.5 7.5l4 4"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13M10 11v5M14 11v5"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>'
};

/* Groups the user has expanded — survives re-renders. */
const openGroups = new Set();

const primaryText = (item) =>
  lang === "ar" ? item.title_ar || item.title_en : item.title_en || item.title_ar;
const secondaryText = (item) =>
  lang === "ar" ? item.desc_ar || item.desc_en : item.desc_en || item.desc_ar;

function adminControls(item, index, total, parentId) {
  if (!admin) return "";
  const parent = parentId ? `data-parent="${esc(parentId)}"` : "";
  const addInside = item.type === "group"
    ? `<button class="icon-btn" data-act="add-child" data-id="${item.id}" aria-label="${esc(t("addInside"))}" title="${esc(t("addInside"))}">${ADMIN_GLYPHS.plus}</button>`
    : "";
  return `<span class="link-card__admin">
      ${addInside}
      <button class="icon-btn" data-act="up" data-id="${item.id}" ${parent} ${index === 0 ? "disabled" : ""} aria-label="up">${ADMIN_GLYPHS.up}</button>
      <button class="icon-btn" data-act="down" data-id="${item.id}" ${parent} ${index === total - 1 ? "disabled" : ""} aria-label="down">${ADMIN_GLYPHS.down}</button>
      <button class="icon-btn" data-act="edit" data-id="${item.id}" ${parent} aria-label="edit">${ADMIN_GLYPHS.edit}</button>
      <button class="icon-btn icon-btn--danger" data-act="del" data-id="${item.id}" ${parent} aria-label="delete">${ADMIN_GLYPHS.trash}</button>
    </span>`;
}

const CHEVRON =
  '<svg class="link-card__chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>';

function linkCardHTML(link, index, total, parentId) {
  const desc = secondaryText(link);
  const child = parentId ? " link-card--child" : "";
  return `
    <a class="link-card${child}" ${parentId ? "" : `style="--i:${index}"`} href="${esc(link.url)}"
       ${/^https?:/i.test(link.url) ? 'target="_blank" rel="noopener"' : ""}
       ${admin ? 'data-noclick="1"' : ""}>
      ${iconTile(link.icon, "link-card__icon")}
      <span class="link-card__text">
        <p class="link-card__title">${esc(primaryText(link))}</p>
        ${desc ? `<p class="link-card__desc">${esc(desc)}</p>` : ""}
      </span>
      ${CHEVRON}
      ${adminControls(link, index, total, parentId)}
    </a>`;
}

function groupCardHTML(group, index, total) {
  const desc = secondaryText(group);
  const children = group.children || [];
  const isOpen = openGroups.has(group.id);
  const inner = children.length
    ? children.map((c, i) => linkCardHTML(c, i, children.length, group.id)).join("")
    : `<p class="group__empty">${t("groupEmpty")}</p>`;
  return `
    <div class="group${isOpen ? " is-open" : ""}" style="--i:${index}" data-group-wrap="${esc(group.id)}">
      <div class="link-card link-card--group" role="button" tabindex="0"
           data-group="${esc(group.id)}" aria-expanded="${isOpen}">
        ${iconTile(group.icon, "link-card__icon")}
        <span class="link-card__text">
          <p class="link-card__title">${esc(primaryText(group))}</p>
          ${desc ? `<p class="link-card__desc">${esc(desc)}</p>` : ""}
        </span>
        <span class="group__count">${children.length}</span>
        ${CHEVRON}
        ${adminControls(group, index, total, null)}
      </div>
      <div class="group__children">
        <div class="group__inner">${inner}</div>
      </div>
    </div>`;
}

function renderLinks() {
  const container = $("links");
  if (!links.length) {
    container.innerHTML = `<p class="links__empty">${t("empty")}</p>`;
    return;
  }
  container.innerHTML = links
    .map((item, i) =>
      item.type === "group"
        ? groupCardHTML(item, i, links.length)
        : linkCardHTML(item, i, links.length, null)
    )
    .join("");
  requestAnimationFrame(() => container.classList.add("links--loaded"));
}

/* --------------------------------------------------------------- api layer */

async function api(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw Object.assign(new Error(body.error || "http_" + res.status), {
      code: body.error,
      status: res.status
    });
  }
  return res.json();
}

async function loadLinks() {
  try {
    links = (await api("/api/links")).links;
  } catch {
    links = [];
  }
  renderLinks();
}

async function saveLinks(message) {
  try {
    links = (await api("/api/links", {
      method: "PUT",
      body: JSON.stringify({ links })
    })).links;
    renderLinks();
    if (message) toast(message);
  } catch (err) {
    toast(err.status === 401 ? t("wrongPass") : t("netError"));
    if (err.status === 401) setAdmin(false);
    await loadLinks();
  }
}

/* -------------------------------------------------------------- admin mode */

function setAdmin(value) {
  admin = value;
  document.body.classList.toggle("is-admin", admin);
  $("adminBar").hidden = !admin;
  renderLinks();
}

/* Hidden gesture: 5 quick taps on the emblem (or open the page with #staff). */

let taps = [];

$("emblem").addEventListener("click", () => {
  const emblem = $("emblem");
  emblem.classList.remove("is-tapped");
  void emblem.offsetWidth;
  emblem.classList.add("is-tapped");

  const now = Date.now();
  taps = taps.filter((ts) => now - ts < 3000);
  taps.push(now);
  if (taps.length >= 5) {
    taps = [];
    if (!admin) openModal("passModal", () => $("passInput").focus());
  }
});

if (location.hash === "#staff") {
  window.addEventListener("load", () => {
    setTimeout(() => {
      if (!admin) openModal("passModal", () => $("passInput").focus());
    }, 600);
  });
}

/* ----------------------------------------------------------------- modals */

function openModal(id, after) {
  $(id).hidden = false;
  if (after) setTimeout(after, 60);
}

function closeModal(id) {
  $(id).hidden = true;
}

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.closest("[data-close]")) {
      modal.hidden = true;
    }
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal").forEach((m) => (m.hidden = true));
  }
});

/* ------------------------------------------------------------------ login */

$("passForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const errorEl = $("passError");
  errorEl.hidden = true;
  try {
    await api("/api/login", {
      method: "POST",
      body: JSON.stringify({ passcode: $("passInput").value })
    });
    $("passInput").value = "";
    closeModal("passModal");
    setAdmin(true);
  } catch (err) {
    errorEl.textContent = err.status === 429 ? t("tooMany") : t("wrongPass");
    errorEl.hidden = false;
  }
});

$("btnLogout").addEventListener("click", async () => {
  await api("/api/logout", { method: "POST" }).catch(() => {});
  setAdmin(false);
});

/* ------------------------------------------------------------- link editor */

function buildIconPicker() {
  $("iconPicker").innerHTML = Object.entries(ICONS)
    .map(([name, icon]) =>
      `<button type="button" class="icon-choice${name === selectedIcon ? " is-selected" : ""}"
        data-icon="${name}" style="background:linear-gradient(160deg,${icon.color},${shade(icon.color)})">${icon.svg}</button>`
    )
    .join("");
}

$("iconPicker").addEventListener("click", (e) => {
  const btn = e.target.closest(".icon-choice");
  if (!btn) return;
  selectedIcon = btn.dataset.icon;
  buildIconPicker();
});

let editingParent = null;

function syncGroupSwitch() {
  const isGroup = $("fGroup").checked;
  $("urlField").hidden = isGroup;
  $("fUrl").required = !isGroup;
}

$("fGroup").addEventListener("change", syncGroupSwitch);

function openEditor(link, parentId = null) {
  editingId = link ? link.id : null;
  editingParent = parentId;
  $("editTitle").textContent = t(link ? "editLink" : "addLink");
  $("fTitleAr").value = link?.title_ar || "";
  $("fTitleEn").value = link?.title_en || "";
  $("fDescAr").value = link?.desc_ar || "";
  $("fDescEn").value = link?.desc_en || "";
  $("fUrl").value = link?.url || "";
  selectedIcon = link?.icon || (link?.type === "group" ? "folder" : "globe");
  /* Items inside a group can't themselves be groups (one level only). */
  $("groupSwitch").hidden = Boolean(parentId);
  $("fGroup").checked = link?.type === "group";
  syncGroupSwitch();
  $("editError").hidden = true;
  buildIconPicker();
  openModal("editModal", () => $("fTitleAr").focus());
}

$("btnAdd").addEventListener("click", () => openEditor(null));

$("editForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const errorEl = $("editError");
  errorEl.hidden = true;

  const isGroup = !editingParent && $("fGroup").checked;
  const url = $("fUrl").value.trim();
  if (!isGroup && !/^(https?:\/\/|tel:|mailto:|geo:)/i.test(url)) {
    errorEl.textContent = t("badUrl");
    errorEl.hidden = false;
    return;
  }
  const draft = {
    id: editingId || "",
    icon: selectedIcon,
    title_ar: $("fTitleAr").value.trim(),
    title_en: $("fTitleEn").value.trim(),
    desc_ar: $("fDescAr").value.trim(),
    desc_en: $("fDescEn").value.trim()
  };
  if (!draft.title_ar && !draft.title_en) {
    errorEl.textContent = t("needTitle");
    errorEl.hidden = false;
    return;
  }
  if (isGroup) {
    draft.type = "group";
  } else {
    draft.url = url;
  }

  const list = editingParent
    ? (links.find((l) => l.id === editingParent) || {}).children
    : links;
  if (!list) return;

  if (editingId) {
    const index = list.findIndex((l) => l.id === editingId);
    if (index >= 0) {
      const existing = list[index];
      if (existing.type === "group" && isGroup) {
        draft.children = existing.children || [];
      } else if (existing.type === "group" && !isGroup) {
        /* Turning a group back into a plain link discards its children. */
        if ((existing.children || []).length && !confirm(t("confirmDeleteGroup"))) {
          return;
        }
      } else if (isGroup) {
        draft.children = [];
      }
      list[index] = { ...draft, id: editingId };
    }
  } else {
    if (isGroup) draft.children = [];
    list.push(draft);
  }
  closeModal("editModal");
  await saveLinks(t("saved"));
});

/* Card admin buttons (top level and inside groups) + group toggling. */

function toggleGroup(id) {
  const wrap = document.querySelector(`[data-group-wrap="${CSS.escape(id)}"]`);
  if (!wrap) return;
  const nowOpen = !openGroups.has(id);
  if (nowOpen) openGroups.add(id);
  else openGroups.delete(id);
  wrap.classList.toggle("is-open", nowOpen);
  wrap.querySelector("[data-group]").setAttribute("aria-expanded", nowOpen);
}

$("links").addEventListener("click", async (e) => {
  const btn = e.target.closest("[data-act]");
  if (btn) {
    e.preventDefault();
    e.stopPropagation();
    const { act, id, parent } = btn.dataset;
    const list = parent
      ? (links.find((l) => l.id === parent) || {}).children
      : links;
    if (!list) return;
    const index = list.findIndex((l) => l.id === id);
    if (index < 0 && act !== "add-child") return;

    if (act === "up" && index > 0) {
      [list[index - 1], list[index]] = [list[index], list[index - 1]];
      await saveLinks();
    } else if (act === "down" && index < list.length - 1) {
      [list[index + 1], list[index]] = [list[index], list[index + 1]];
      await saveLinks();
    } else if (act === "edit") {
      openEditor(list[index], parent || null);
    } else if (act === "add-child") {
      openGroups.add(id);
      openEditor(null, id);
    } else if (act === "del") {
      const isGroup = list[index].type === "group";
      if (confirm(t(isGroup ? "confirmDeleteGroup" : "confirmDelete"))) {
        list.splice(index, 1);
        await saveLinks(t("deleted"));
      }
    }
    return;
  }

  const groupCard = e.target.closest("[data-group]");
  if (groupCard) {
    e.preventDefault();
    toggleGroup(groupCard.dataset.group);
    return;
  }

  /* In admin mode the whole card shouldn't navigate away accidentally. */
  const card = e.target.closest("[data-noclick]");
  if (card) e.preventDefault();
});

$("links").addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const groupCard = e.target.closest("[data-group]");
  if (groupCard) {
    e.preventDefault();
    toggleGroup(groupCard.dataset.group);
  }
});

/* ---------------------------------------------------------- QR / passcode */

$("btnQr").addEventListener("click", async () => {
  const url = "/api/qr?ts=" + Date.now();
  $("qrImage").src = url;
  $("qrDownload").href = url;
  openModal("qrModal");
});

$("btnPasscode").addEventListener("click", () => {
  $("curPass").value = "";
  $("newPass").value = "";
  $("passcodeError").hidden = true;
  openModal("passcodeModal", () => $("curPass").focus());
});

$("passcodeForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const errorEl = $("passcodeError");
  errorEl.hidden = true;
  try {
    await api("/api/passcode", {
      method: "POST",
      body: JSON.stringify({ current: $("curPass").value, next: $("newPass").value })
    });
    closeModal("passcodeModal");
    toast(t("passChanged"));
  } catch (err) {
    errorEl.textContent = err.code === "weak_passcode" ? t("weakPass") : t("wrongPass");
    errorEl.hidden = false;
  }
});

/* ------------------------------------------------------- backup / restore */

$("btnBackup").addEventListener("click", () => {
  location.href = "/api/export";
});

$("btnRestore").addEventListener("click", () => $("restoreFile").click());

$("restoreFile").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  e.target.value = "";
  if (!file) return;
  try {
    const parsed = JSON.parse(await file.text());
    const restored = Array.isArray(parsed) ? parsed : parsed.links;
    if (!Array.isArray(restored)) throw new Error("bad");
    links = restored;
    await saveLinks(t("restored"));
  } catch {
    toast(t("restoreBad"));
  }
});

/* ------------------------------------------------------------------ toast */

let toastTimer;
function toast(message) {
  const el = $("toast");
  el.textContent = message;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (el.hidden = true), 2600);
}

/* ------------------------------------------------------------------- boot */

$("langToggle").addEventListener("click", () => {
  lang = lang === "ar" ? "en" : "ar";
  localStorage.setItem("dec_lang", lang);
  applyLang();
});

(async function boot() {
  applyLang();
  await loadLinks();
  try {
    if ((await api("/api/session")).admin) setAdmin(true);
  } catch { /* stay public */ }
})();
