const fs = require("fs");
const h = fs.readFileSync(
  "c:/Users/Slash/Desktop/ECOMMERCE/index.html",
  "utf8",
);
const tags = ["div", "section", "form", "aside", "blockquote"];
for (const t of tags) {
  const o = (h.match(new RegExp("<" + t + "\\b", "g")) || []).length;
  const c = (h.match(new RegExp("</" + t + ">", "g")) || []).length;
  console.log(t, o + "/" + c, o === c ? "OK" : "MISMATCH");
}
const ids = [
  "dashboard-avatar",
  "dashboard-spend",
  "dashboard-spend-chip",
  "dashboard-order-chip",
  "strength-meter",
  "strength-label",
  "dashboard-orders-list",
  "dashboard-cart-count",
  "dashboard-order-count",
  "dashboard-title",
  "dashboard-welcome",
  "sign-in-form",
  "sign-up-form",
  "dashboard-sign-out",
];
const missing = ids.filter((i) => !h.includes('id="' + i + '"'));
console.log(
  missing.length ? "MISSING: " + missing.join(", ") : "all IDs present",
);
console.log("keyframes:", (h.match(/@keyframes \w+/g) || []).length);
console.log(
  "auth-split:",
  h.includes('class="auth-split"'),
  "| dashboard-hero:",
  h.includes('class="dashboard-hero"'),
);
