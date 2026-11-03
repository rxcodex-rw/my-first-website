export default async function run(page) {
  await page.goto("file:///C:/Users/Slash/Desktop/ECOMMERCE/index.html");
  await page.waitForTimeout(1200);
  const r = {};
  const box = await page.locator("#menu-toggle").boundingBox();
  await page.mouse.move(10, 400);
  await page.waitForTimeout(300);
  await page.mouse.move(box.x + 20, box.y + 8, { steps: 5 });
  await page.waitForTimeout(600);
  r.openAfterHover = await page.evaluate(
    () => !document.getElementById("mega-menu").hidden,
  );
  // Move INTO the mega menu
  await page.locator("#mega-inner").hover();
  await page.waitForTimeout(500);
  r.staysOpenInside = await page.evaluate(
    () => !document.getElementById("mega-menu").hidden,
  );
  // Move far away → auto closes
  await page.mouse.move(400, 700, { steps: 8 });
  await page.waitForTimeout(700);
  r.closedAfterLeaving = await page.evaluate(
    () => document.getElementById("mega-menu").hidden,
  );
  // Hover again then click → should close (toggle still works)
  await page.mouse.move(box.x + 20, box.y + 8, { steps: 5 });
  await page.waitForTimeout(500);
  r.reopenedOnHover = await page.evaluate(
    () => !document.getElementById("mega-menu").hidden,
  );
  await page.click("#menu-toggle", { force: true }).catch(() => {});
  await page.waitForTimeout(400);
  r.closedAfterClickWhileHovering = await page.evaluate(
    () => document.getElementById("mega-menu").hidden,
  );
  return r;
}
