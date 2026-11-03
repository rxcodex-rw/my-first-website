export default async function run(page) {
  await page.goto("file:///C:/Users/Slash/Desktop/ECOMMERCE/index.html");
  await page.waitForTimeout(1000);
  await page.mouse.move(10, 500);
  await page.waitForTimeout(300);

  // Click More without hovering first (fresh pointer)
  await page.click("#menu-toggle");
  await page.waitForTimeout(300);
  const clickOpens = await page.evaluate(
    () => !document.getElementById("mega-menu").hidden,
  );

  // Click again to close
  await page.click("#menu-toggle", { force: true }).catch(() => {});
  await page.waitForTimeout(400);
  const clickCloses = await page.evaluate(
    () => document.getElementById("mega-menu").hidden,
  );

  // Log pointer-events when closed
  const pe = await page.evaluate(
    () => getComputedStyle(document.getElementById("mega-menu")).pointerEvents,
  );
  return { clickOpens, clickCloses, pointerEventsWhenClosed: pe };
}
