const fs = require("fs");
const h = fs.readFileSync(
  "c:/Users/Slash/Desktop/ECOMMERCE/checkout.html",
  "utf8",
);
const ids = [
  "meter-fill",
  "shipping-meter-text",
  "confirm-overlay",
  "confirm-ref",
  "confirm-total",
  "confirm-continue",
  "confetti",
  "card-brand-icons",
  "place-order-button",
  "summary-toggle",
  "payment-summary-toggle",
  "checkout-items",
  "payment-checkout-items",
];
const missing = ids.filter((i) => !h.includes('id="' + i + '"'));
console.log(
  missing.length
    ? "MISSING: " + missing.join(", ")
    : "all JS-referenced IDs present",
);
console.log("aurora:", h.includes('class="aurora"'));
console.log("reveal usages:", (h.match(/class="[^"]*reveal/g) || []).length);
console.log("keyframes:", (h.match(/@keyframes \w+/g) || []).length);
const divO = (h.match(/<div\b/g) || []).length,
  divC = (h.match(/<\/div>/g) || []).length;
console.log(
  "div balance:",
  divO + "/" + divC,
  divO === divC ? "OK" : "MISMATCH",
);
