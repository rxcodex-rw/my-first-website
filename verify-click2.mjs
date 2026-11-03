export default async function run(page) {
  await page.goto("file:///C:/Users/Slash/Desktop/ECOMMERCE/index.html");
  await page.waitForTimeout(1200);
  const openCount = () =>
    page.evaluate(() => document.querySelectorAll(".nav-item.open").length);
  const r = {};
  // Fresh pointer away from nav, then CLICK Collections
  await page.mouse.move(10, 400);
  await page.waitForTimeout(400);
  await page.mouse.click(760, 76); // approximate Collections position
  await page.waitForTimeout(400);
  r.openAfterRawClick = await openCount();
  // Click again
  await page.mouse.click(760, 76);
  await page.waitForTimeout(400);
  r.afterSecondRawClick = await openCount();
  return r;
}
