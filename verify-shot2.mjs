export default async function run(page) {
  await page.goto("file:///C:/Users/Slash/Desktop/ECOMMERCE/checkout.html");
  await page.waitForTimeout(1500);
  await page.evaluate(() => {
    localStorage.setItem(
      "forma-cart",
      JSON.stringify([{ key: "p1", name: "Test", price: 20, qty: 1 }]),
    );
    document.getElementById("payment-block").style.display = "";
    document.querySelector(
      ".checkout-layout:not(#payment-block)",
    ).style.display = "none";
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: "checkout-payment.png" });
  return "done";
}
