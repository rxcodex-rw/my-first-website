export default async function run(page) {
  await page.goto("file:///C:/Users/Slash/Desktop/ECOMMERCE/index.html");
  await page.waitForTimeout(1000);
  const megaHidden = () =>
    page.evaluate(() => document.getElementById("mega-menu").hidden);

  // 1. Hover the "More" button → mega opens
  await page.hover("#menu-toggle");
  await page.waitForTimeout(400);
  const openedOnHover = !(await megaHidden());

  // 2. Move mouse into the mega menu → stays open
  await page.hover("#mega-inner");
  await page.waitForTimeout(500);
  const staysOpenInMenu = !(await megaHidden());

  // 3. Move mouse away → closes
  await page.mouse.move(10, 500);
  await page.waitForTimeout(600);
  const closedOnLeave = await megaHidden();

  // 4. Click still toggles
  await page.click("#menu-toggle");
  await page.waitForTimeout(300);
  const clickOpens = !(await megaHidden());
  await page.click("#menu-toggle");
  await page.waitForTimeout(300);
  const clickCloses = await megaHidden();

  return {
    openedOnHover,
    staysOpenInMenu,
    closedOnLeave,
    clickOpens,
    clickCloses,
  };
}
