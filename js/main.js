"use strict";

/* ===== Tiện ích ===== */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* ===== 1. Menu mobile ===== */
const menuBtn = $("#menuBtn");
const navList = $("#navList");

menuBtn.addEventListener("click", () => {
  const open = navList.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.textContent = open ? "✕" : "☰";
});
$$(".nav__link").forEach(link =>
  link.addEventListener("click", () => {
    navList.classList.remove("open");
    menuBtn.textContent = "☰";
    menuBtn.setAttribute("aria-expanded", "false");
  })
);

/* ===== 2. Hiệu ứng gõ chữ ở banner ===== */
const typingEl = $("#typing");
let roleIdx = 0, charIdx = 0, deleting = false;

function type() {
  const roles = dyn().roles;
  const word = roles[roleIdx % roles.length];
  charIdx += deleting ? -1 : 1;
  typingEl.textContent = word.slice(0, charIdx);

  let delay = deleting ? 45 : 90;
  if (!deleting && charIdx === word.length) { deleting = true; delay = 1400; }
  else if (deleting && charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; delay = 400; }
  setTimeout(type, delay);
}
type();

/* ===== 3. Scroll: thanh tiến trình, nút lên đầu, menu active ===== */
const progress = $("#progress");
const toTop = $("#toTop");
const sections = $$("main section[id]");
const navLinks = $$(".nav__link");

window.addEventListener("scroll", () => {
  const scrolled = document.documentElement.scrollTop;
  const total = document.documentElement.scrollHeight - innerHeight;
  progress.style.height = `${(scrolled / total) * 100}%`;
  toTop.classList.toggle("show", scrolled > 400);

  let current = sections[0].id;
  sections.forEach(sec => { if (scrolled >= sec.offsetTop - 120) current = sec.id; });
  navLinks.forEach(link => link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`));
});
toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

/* ===== 4. Thanh kỹ năng chạy khi cuộn tới ===== */
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      $(".skill__bar span", entry.target).style.width = `${entry.target.dataset.level}%`;
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
$$(".skill").forEach(skill => skillObserver.observe(skill));

/* ===== 5. Lọc dự án ===== */
const filters = $$(".filter");
const cards = $$(".card");

filters.forEach(btn =>
  btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    const type = btn.dataset.filter;
    cards.forEach(card =>
      card.classList.toggle("is-hidden", type !== "all" && card.dataset.category !== type)
    );
  })
);

/* ===== 6. Modal chi tiết dự án ===== */
const modal = $("#modal");

function openModal(id) {
  const data = dyn().projects[id];
  $("#modalTitle").textContent = data.title;
  $("#modalMeta").textContent = data.meta;
  $("#modalDesc").textContent = data.desc;
  $("#modalRoleTitle").textContent = dyn().roleLabel;
  $("#modalList").innerHTML = data.points.map(p => `<li>${p}</li>`).join("");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  $("#modalClose").focus();
}
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}
$$("[data-modal]").forEach(btn => btn.addEventListener("click", () => openModal(btn.dataset.modal)));
$("#modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

/* ===== 7. Form liên hệ + kiểm tra dữ liệu ===== */
const form = $("#contactForm");
const message = $("#message");
const status = $("#formStatus");

const rules = {
  name: value => {
    if (!value.trim()) return dyn().err.nameEmpty;
    if (value.trim().length < 2) return dyn().err.nameShort;
    return "";
  },
  email: value => {
    if (!value.trim()) return dyn().err.emailEmpty;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return dyn().err.emailBad;
    return "";
  },
  message: value => {
    if (!value.trim()) return dyn().err.msgEmpty;
    if (value.trim().length < 10) return dyn().err.msgShort;
    return "";
  }
};

function validateField(name) {
  const input = form.elements[name];
  const error = rules[name](input.value);
  const field = input.closest(".field");
  $(`#${name}Err`).textContent = error;
  field.classList.toggle("invalid", Boolean(error));
  field.classList.toggle("valid", !error);
  return !error;
}

Object.keys(rules).forEach(name => form.elements[name].addEventListener("blur", () => validateField(name)));
message.addEventListener("input", () => { $("#count").textContent = `${message.value.length}/300`; });

form.addEventListener("submit", e => {
  e.preventDefault();
  const allValid = Object.keys(rules).map(validateField).every(Boolean);
  if (!allValid) {
    status.style.color = "#e5484d";
    status.textContent = dyn().err.fixForm;
    return;
  }
  status.style.color = "#30a46c";
  status.textContent = dyn().thanks(form.elements.name.value.trim());
  form.reset();
  $("#count").textContent = "0/300";
  $$(".field").forEach(f => f.classList.remove("valid", "invalid"));
});

/* ===== 8. Hiện dần khi cuộn (scroll reveal) ===== */
const revealEls = $$(".section .container > *:not(.projects), .card");
revealEls.forEach((el, i) => {
  el.classList.add("reveal");
  if (el.classList.contains("card")) el.style.transitionDelay = `${(i % 3) * 90}ms`;
});
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.classList.add("in");
    revealObserver.unobserve(el);
    // Gỡ class sau khi chạy xong để không ảnh hưởng hiệu ứng hover của thẻ
    setTimeout(() => { el.classList.remove("reveal", "in"); el.style.transitionDelay = ""; }, 900);
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
revealEls.forEach(el => revealObserver.observe(el));

/* ===== 9. Toast thông báo + sao chép email ===== */
const toast = $("#toast");
let toastTimer;
function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}
$("#copyEmail").addEventListener("click", async () => {
  const email = $(".contact__list a[href^='mailto:']").textContent.trim();
  try {
    await navigator.clipboard.writeText(email);
    showToast(dyn().copied);
  } catch {
    const tmp = document.createElement("textarea");   // phương án dự phòng
    tmp.value = email;
    document.body.append(tmp);
    tmp.select();
    const ok = document.execCommand("copy");
    tmp.remove();
    showToast(ok ? dyn().copied : dyn().copyFail);
  }
});

/* ===== 10. Lightbox ảnh dự án (phóng to, trước/sau, đóng) ===== */
const lightbox = $("#lightbox");
const lbImg = $("#lbImg");
const lbCaption = $("#lbCaption");
let lbImages = [], lbIndex = 0, lbKey = "", lbOpener = null;

function renderLightbox() {
  lbImg.src = lbImages[lbIndex];
  lbImg.alt = `${dyn().projects[lbKey].title} (${lbIndex + 1}/${lbImages.length})`;
  lbCaption.textContent = `${dyn().projects[lbKey].title} · ${lbIndex + 1} / ${lbImages.length}`;
  const single = lbImages.length < 2;
  $("#lbPrev").hidden = single;
  $("#lbNext").hidden = single;
}
function openLightbox(btn) {
  lbImages = btn.dataset.images.split(",");
  lbKey = btn.dataset.titleKey;
  lbIndex = 0;
  lbOpener = btn;
  renderLightbox();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";   // khóa cuộn nền
  $("#lbClose").focus();
}
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lbOpener) lbOpener.focus();
}
function stepLightbox(step) {
  lbIndex = (lbIndex + step + lbImages.length) % lbImages.length;   // đi vòng tròn
  renderLightbox();
}
$$(".card__img").forEach(btn => btn.addEventListener("click", () => openLightbox(btn)));
$("#lbClose").addEventListener("click", closeLightbox);
$("#lbPrev").addEventListener("click", () => stepLightbox(-1));
$("#lbNext").addEventListener("click", () => stepLightbox(1));
lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") stepLightbox(-1);
  if (e.key === "ArrowRight") stepLightbox(1);
});

/* ===== 11. Số liệu chạy tăng dần (counter) ===== */
function runCounter(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = Number(el.dataset.decimals || 0);
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = target.toFixed(decimals); return; }
  const duration = 1400, start = performance.now();
  function frame(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);                 // chạy nhanh rồi chậm dần
    el.textContent = (target * eased).toFixed(decimals);
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    runCounter(entry.target);
    counterObserver.unobserve(entry.target);
  });
}, { threshold: 0.6 });
$$(".stat__num").forEach(el => counterObserver.observe(el));

/* ===== 12. Chuyển ngôn ngữ Việt / Anh ===== */
$("#langBtn").addEventListener("click", () => {
  setLanguage(currentLang === "vi" ? "en" : "vi");
  status.textContent = "";
  if (lightbox.classList.contains("open")) renderLightbox();
  ["name", "email", "message"].forEach(n => { if (form.elements[n].closest(".field").classList.contains("invalid")) validateField(n); });
});
setLanguage(currentLang);
