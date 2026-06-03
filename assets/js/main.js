const phoneNumber = "919164333175";

function buildWhatsAppText(form) {
  const data = new FormData(form);
  const name = data.get("name") || "Guest";
  const phone = data.get("phone") || "";
  const email = data.get("email") || "Not shared";
  const checkin = data.get("checkin") || "Not selected";
  const checkout = data.get("checkout") || "Not selected";
  const guests = data.get("guests") || "Not selected";
  const message = data.get("message") || "Please share availability and tariff.";

  return [
    "Homestay enquiry for Coorg Green Nest",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Check-in: ${checkin}`,
    `Check-out: ${checkout}`,
    `Guests: ${guests}`,
    `Message: ${message}`,
  ].join("\n");
}

document.querySelectorAll("[data-whatsapp-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = encodeURIComponent(buildWhatsAppText(form));
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank", "noopener");
  });
});

document.querySelectorAll("[data-date-field]").forEach((input) => {
  input.addEventListener("input", () => {
    const digits = input.value.replace(/\D/g, "").slice(0, 8);
    const day = digits.slice(0, 2);
    const month = digits.slice(2, 4);
    const year = digits.slice(4, 8);
    input.value = [day, month, year].filter(Boolean).join("-");
  });
});

document.querySelectorAll("[data-wa-message]").forEach((link) => {
  const message = encodeURIComponent(link.dataset.waMessage);
  link.href = `https://wa.me/${phoneNumber}?text=${message}`;
});

const menuToggle = document.querySelector("[data-menu-toggle]");
const navLinks = document.querySelector("[data-nav-links]");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (window.lucide) {
  window.lucide.createIcons();
}
