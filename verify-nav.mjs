export default async function run(page, ui) {
  await page.goto("file:///C:/Users/Slash/Desktop/ECOMMERCE/index.html");
  await page.waitForTimeout(1000);
  // Click "Collections" nav trigger
  await page.click('[data-drop-trigger]:has-text("Collections")');
  await page.waitForTimeout(400);
  const collectionsOpen = await page.evaluate(
    () => document.querySelectorAll(".nav-item.open").length,
  );
  const dropVisible = await page.evaluate(() => {
    const item = document
      .querySelector("[data-drop-trigger]")
      .closest(".nav-item");
    const drop = item.querySelector(".nav-drop");
    return getComputedStyle(drop).visibility;
  });
  // Click again → closes
  await page.click('[data-drop-trigger]:has-text("Collections")');
  await page.waitForTimeout(400);
  const closedAgain = await page.evaluate(
    () => document.querySelectorAll(".nav-item.open").length,
  );
  // Click "Prices" → collections closes, prices opens
  await page.click('[data-drop-trigger]:has-text("Prices")');
  await page.waitForTimeout(400);
  const pricesOpen = await page.evaluate(() =>
    [...document.querySelectorAll(".nav-item.open [data-drop-trigger]")].map(
      (e) => e.textContent.trim(),
    ),
  );
  return { collectionsOpen, dropVisible, closedAgain, pricesOpen };
}
