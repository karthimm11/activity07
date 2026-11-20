const bookingForm = document.getElementById("booking-form");
const matchSelect = document.getElementById("match-select");
const standSelect = document.getElementById("stand-select");
const quantityInput = document.getElementById("ticket-quantity");

const summaryMatch = document.getElementById("summary-match");
const summaryVenue = document.getElementById("summary-venue");
const summaryStand = document.getElementById("summary-stand");
const summaryQuantity = document.getElementById("summary-quantity");
const summaryTotal = document.getElementById("summary-total");
const toast = document.querySelector("#booking-toast");

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2400);
}

function updateBookingSummary(showConfirmation = true) {
  const matchOption = matchSelect.selectedOptions[0];
  const standOption = standSelect.selectedOptions[0];
  const quantity = Number(quantityInput.value);
  const isValidQuantity =
    Number.isInteger(quantity) &&
    quantity >= Number(quantityInput.min) &&
    quantity <= Number(quantityInput.max);

  summaryMatch.textContent = matchOption.textContent;
  summaryVenue.textContent = matchOption.dataset.venue;
  summaryStand.textContent = standOption.textContent.split("·")[0].trim();

  if (!isValidQuantity) {
    summaryQuantity.textContent = "Choose 1–10 tickets";
    summaryTotal.textContent = "—";
    if (showConfirmation) {
      showToast("Choose a quantity between 1 and 10.");
    }
    return;
  }

  summaryQuantity.textContent = `${quantity} ${quantity === 1 ? "ticket" : "tickets"}`;
  summaryTotal.textContent = currency.format(
    Number(standOption.dataset.price) * quantity,
  );

  if (showConfirmation) {
    showToast("Booking summary updated.");
  }
}

matchSelect.addEventListener("change", () => updateBookingSummary());
standSelect.addEventListener("change", () => updateBookingSummary());
quantityInput.addEventListener("input", () => updateBookingSummary(false));
quantityInput.addEventListener("change", () => updateBookingSummary());
bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  updateBookingSummary();
});

updateBookingSummary(false);
