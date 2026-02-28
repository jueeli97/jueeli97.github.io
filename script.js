// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
}

// Reveal-on-scroll animation
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// Project filter chips
const chips = document.querySelectorAll(".chip");
const cards = document.querySelectorAll(".card");

chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");

    const filter = chip.dataset.filter;

    cards.forEach(card => {
      const tags = (card.dataset.tags || "").split(" ");
      const show = (filter === "all") || tags.includes(filter);
      card.style.display = show ? "block" : "none";
    });
  });
});
