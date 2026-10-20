// Mobile navigation toggle
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close the mobile menu after clicking a link
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Menu category filter
const filterButtons = document.querySelectorAll(".filter");
const menuCards = document.querySelectorAll("#menuCards .card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;
    filterButtons.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");
    menuCards.forEach((card) => {
      const show = category === "all" || card.dataset.category === category;
      card.classList.toggle("hidden", !show);
    });
  });
});

// Booking form validation
const form = document.getElementById("bookingForm");
const dateInput = document.getElementById("date");

// Block past dates
dateInput.min = new Date().toISOString().split("T")[0];

function setError(id, message) {
  document.getElementById(id + "Error").textContent = message;
  document.getElementById(id).classList.toggle("invalid", message !== "");
}

function validateForm() {
  let valid = true;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const guests = Number(form.guests.value);
  const date = form.date.value;

  if (name.length < 2) { setError("name", "Please enter your name."); valid = false; }
  else setError("name", "");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("email", "Please enter a valid email."); valid = false; }
  else setError("email", "");

  if (!Number.isInteger(guests) || guests < 1 || guests > 12) { setError("guests", "Guests must be between 1 and 12."); valid = false; }
  else setError("guests", "");

  if (!date) { setError("date", "Please choose a date."); valid = false; }
  else if (date < dateInput.min) { setError("date", "Date cannot be in the past."); valid = false; }
  else setError("date", "");

  return valid;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const success = document.getElementById("formSuccess");
  success.textContent = "";
  if (validateForm()) {
    success.textContent = `Thanks, ${form.name.value.trim()}! Your table for ${form.guests.value} on ${form.date.value} is requested.`;
    form.reset();
    form.guests.value = 2;
  }
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
