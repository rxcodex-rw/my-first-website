export default async function run(page) {
  await page.goto("file:///C:/Users/Slash/Desktop/ECOMMERCE/checkout.html");
  await page.waitForTimeout(1500);
  const r = {};
  r.stripChips = await page.evaluate(
    () => document.querySelectorAll(".payments-strip .pay-chip").length,
  );
  // Fill delivery
  await page.fill('#checkout-form input[name="email"]', "test@example.com");
  await page.fill('#checkout-form input[name="firstName"]', "Test");
  await page.fill('#checkout-form input[name="lastName"]', "User");
  await page.fill('#checkout-form input[name="address"]', "1 Test Street");
  await page.fill('#checkout-form input[name="city"]', "Lagos");
  await page.fill('#checkout-form input[name="zip"]', "100001");
  await page.fill('#checkout-form input[name="phone"]', "08012345678");
  // Add an item to cart via localStorage so totals work, then reload
  await page.evaluate(() =>
    localStorage.setItem(
      "forma-cart",
      JSON.stringify([{ key: "p1", name: "Test", price: 20, qty: 1 }]),
    ),
  );
  await page.reload();
  await page.waitForTimeout(1500);
  await page.fill('#checkout-form input[name="email"]', "test@example.com");
  await page.fill('#checkout-form input[name="firstName"]', "Test");
  await page.fill('#checkout-form input[name="lastName"]', "User");
  await page.fill('#checkout-form input[name="address"]', "1 Test Street");
  await page.fill('#checkout-form input[name="city"]', "Lagos");
  await page.fill('#checkout-form input[name="zip"]', "100001");
  await page.fill('#checkout-form input[name="phone"]', "08012345678");
  await page.click('#checkout-form button[type="submit"], .checkout-submit');
  await page.waitForTimeout(1000);
  r.paymentVisible = await page.evaluate(
    () => document.getElementById("payment-block").style.display !== "none",
  );
  r.brandChips = await page.evaluate(
    () => document.querySelectorAll("#card-brand-icons .pay-chip").length,
  );
  return r;
}
