/* ====== NAME LETTERS BACKGROUND ====== */
const nameContainer = document.querySelector(".name-bg");
const letters = ["I", "L", "I", "A", "S"];
const nameChars = [];
const totalChars = 60;

for (let i = 0; i < totalChars; i++) {
  /* Wrapper handles the floating animation */
  const wrapper = document.createElement("div");
  wrapper.classList.add("name-wrapper");

  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const size = Math.random() * 40 + 14;
  const duration = Math.random() * 6 + 5; /* 5s to 11s */
  const delay = Math.random() * -10; /* Stagger start times */

  wrapper.style.left = `${x}%`;
  wrapper.style.top = `${y}%`;
  wrapper.style.setProperty("--dur", `${duration}s`);
  wrapper.style.setProperty("--del", `${delay}s`);

  /* Inner span handles the scale/glow on hover */
  const span = document.createElement("span");
  span.classList.add("name-char");
  span.textContent = letters[Math.floor(Math.random() * letters.length)];
  span.style.fontSize = `${size}px`;
  span.style.opacity = `${0.04 + Math.random() * 0.12}`;

  wrapper.appendChild(span);
  nameContainer.appendChild(wrapper);
  nameChars.push({ wrapper, span, x, y });
}

/* Track cursor */
let mouseX = -9999;
let mouseY = -9999;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

document.addEventListener("mouseleave", () => {
  mouseX = -9999;
  mouseY = -9999;
});

/* Soft spotlight proximity effect */
function updateNameHover() {
  const radius = 150; /* px area of effect */

  nameChars.forEach((c) => {
    /* Calculate center of the character based on % position */
    const charX = (c.x / 100) * window.innerWidth;
    const charY = (c.y / 100) * window.innerHeight;

    const dx = mouseX - charX;
    const dy = mouseY - charY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < radius) {
      /* Map distance to 0 -> 1 (center to edge) */
      const progress = 1 - dist / radius;
      /* Scale from 1.0 to 1.3 */
      const scale = 1 + progress * 0.3;
      /* Glow from 0 to 15px */
      const glow = progress * 15;

      c.span.style.transform = `scale(${scale})`;
      c.span.style.textShadow = `0 0 ${glow}px rgba(48, 104, 68, 0.6)`;
    } else {
      c.span.style.transform = "scale(1)";
      c.span.style.textShadow = "none";
    }
  });

  requestAnimationFrame(updateNameHover);
}

updateNameHover();

/* ====== SCROLL REVEAL ====== */
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
);
reveals.forEach((el) => observer.observe(el));

/* ====== SKILL BAR ANIMATION ====== */
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll(".skill-bar-fill");
        fills.forEach((fill) => {
          const width = fill.getAttribute("data-width");
          fill.style.width = width + "%";
        });
      }
    });
  },
  { threshold: 0.3 },
);
const skillsSection = document.getElementById("skills");
if (skillsSection) skillObserver.observe(skillsSection);

/* ====== CONTACT FORM ====== */
function contactFormSubmit(event, form) {
  event.preventDefault();
  const button = form.querySelector(".form-submit");
  const originalHtml =
    'Send Message <span class="iconify" data-icon="mdi:send" data-width="16"></span>';
  button.textContent = "Sent! ✓";
  button.disabled = true;
  setTimeout(() => {
    button.disabled = false;
    button.innerHTML = originalHtml;
    form.reset();
    if (window.Iconify && typeof window.Iconify.scan === "function") {
      window.Iconify.scan(button);
    }
  }, 2000);
}

/* ====== NAV SCROLL EFFECT ====== */
const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
  nav.style.borderBottomColor =
    window.scrollY > 50
      ? "rgba(255,255,255,0.08)"
      : "rgba(255,255,255,0.04)";
});

/* ====== ACTIVE NAV LINK ====== */
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const top = section.offsetTop - 100;
    if (scrollY >= top) current = section.getAttribute("id");
  });
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.style.color =
      link.getAttribute("href") === "#" + current ? "#E5E7EB" : "";
  });
});
