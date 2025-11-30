// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  // Close nav when clicking a link
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Smooth scroll (basic, accessible)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const href = anchor.getAttribute("href");
    if (!href || href === "#") return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Theme toggle
const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");

function setTheme(mode) {
  if (mode === "day") {
    body.classList.remove("theme-night");
    body.classList.add("theme-day");
  } else {
    body.classList.remove("theme-day");
    body.classList.add("theme-night");
  }
  localStorage.setItem("portfolio-theme", mode);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isNight = body.classList.contains("theme-night");
    setTheme(isNight ? "day" : "night");
  });

  // Load saved theme
  const saved = localStorage.getItem("portfolio-theme");
  if (saved === "day" || saved === "night") {
    setTheme(saved);
  }
}

// Case study accordion
const caseToggles = document.querySelectorAll(".case-toggle");

caseToggles.forEach((btn) => {
  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    const details = btn.nextElementSibling;
    if (!details) return;

    btn.setAttribute("aria-expanded", String(!expanded));
    details.hidden = expanded;
  });
});

// Contact form: copy message to clipboard (demo only)
const contactForm = document.querySelector(".contact-form");
const statusEl = document.querySelector(".form-status");

if (contactForm && statusEl) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get("name") || "";
    const email = formData.get("email") || "";
    const message = formData.get("message") || "";

    const composed = `From: ${name}\nEmail: ${email}\n\n${message}`;
    try {
      await navigator.clipboard.writeText(composed);
      statusEl.textContent =
        "Message copied to clipboard. Paste it into your email client to send.";
    } catch (err) {
      statusEl.textContent =
        "Could not copy automatically. Please select and copy your message manually.";
    }
  });
}
