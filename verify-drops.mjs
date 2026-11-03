export default async function run(page) {
  await page.goto("file:///C:/Users/Slash/Desktop/ECOMMERCE/index.html");
  await page.waitForTimeout(1200);
  const r = {};
  const openCount = () =>
    page.evaluate(() => document.querySelectorAll(".nav-item.open").length);
  const dropVisible = (id) =>
    page.evaluate((id) => {
      const d = document.getElementById(id);
      return d ? getComputedStyle(d).visibility : "missing";
    }, id);

  // 1. Hover "Collections" → opens
  await page.hover('a[data-drop-trigger]:text-is("Collections")');
  await page.waitForTimeout(400);
  r.collectionsOpenOnHover = (await openCount()) === 1;
  r.collectionsDropVisible = await dropVisible("nav-drop-collections");

  // 2. Move into the dropdown → stays open
  await page.hover("#nav-drop-collections");
  await page.waitForTimeout(500);
  r.staysOpenInsideDrop = (await openCount()) === 1;

  // 3. Hover "Prices" → Collections closes, Prices opens
  await page.hover('a[data-drop-trigger]:text-is("Prices")');
  await page.waitForTimeout(400);
  r.pricesOnly = await page.evaluate(() =>
    [...document.querySelectorAll(".nav-item.open [data-drop-trigger]")].map(
      (e) => e.textContent.trim(),
    ),
  );
  r.pricesDropVisible = await dropVisible("nav-drop-prices");

  // 4. Move away → closes
  await page.mouse.move(400, 700, { steps: 8 });
  await page.waitForTimeout(700);
  r.closedAfterLeaving = (await openCount()) === 0;

  // 5. Click still toggles
  await page.click('a[data-drop-trigger]:text-is("Collections")');
  await page.waitForTimeout(300);
  r.clickOpens = (await openCount()) === 1;
  await page.click('a[data-drop-trigger]:text-is("Collections")');
  await page.waitForTimeout(300);
  r.clickCloses = (await openCount()) === 0;
  return r;
}
