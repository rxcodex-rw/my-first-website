const fs = require("fs");
const dir = "c:/Users/Slash/Desktop/ECOMMERCE/";
let problems = 0;

for (const f of ["index.html", "checkout.html"]) {
  const html = fs.readFileSync(dir + f, "utf8");
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  scripts.forEach((m, i) => {
    try {
      new Function(m[1]);
      console.log(f, "script", i + 1, "syntax OK");
    } catch (e) {
      problems++;
      console.log(f, "script", i + 1, "SYNTAX ERROR:", e.message);
    }
  });
  // Dead references that should be gone from index.html now that checkout is external
  if (f === "index.html") {
    const dead = [
      "renderCheckoutSummary",
      "renderPaymentSummary",
      "forma-checkout-details",
      "paymentMethod",
      'id="payment-form"',
      'id="checkout-form"',
      'id="payment-back"',
      'id="card-fields"',
      'id="checkout-items"',
    ];
    for (const bad of dead) {
      if (html.includes(bad)) {
        problems++;
        console.log("index.html still references:", bad);
      }
    }
    // Redirect targets must exist
    if (!html.includes("checkout.html")) {
      problems++;
      console.log("index.html never redirects to checkout.html!");
    }
  }
  console.log("---");
}
console.log(
  problems === 0 ? "ALL CHECKS PASSED" : problems + " problem(s) found",
);
