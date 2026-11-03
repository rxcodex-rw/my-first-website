export default async function run(page) {
  await page.goto("file:///C:/Users/Slash/Desktop/ECOMMERCE/index.html");
  await page.waitForTimeout(1200);
  const r = {};
  const openCount = () =>
    page.evaluate(() => document.querySelectorAll(".nav-item.open").length);
  // Playwright click at Collections link (force to bypass any overlay heuristic)
  const link = page
    .locator("a[data-drop-trigger]", { hasText: "Collections" })
    .first();
  const box = await link.boundingBox();
  r.box = box;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.waitForTimeout(500);
  r.hoverOpens = await openCount();
  // now click without moving mouse (mouse already there)
  await page.mouse.down();
  await page.mouse.up();
  await page.waitForTimeout(400);
  r.afterInPlaceClick = await openCount();
  return r;
}
