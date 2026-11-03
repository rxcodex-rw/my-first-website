export default async function run(page) {
  await page.goto("file:///C:/Users/Slash/Desktop/ECOMMERCE/index.html");
  await page.waitForTimeout(1200);
  const r = {};
  const box = await page.locator("#menu-toggle").boundingBox();
  // Move to a neutral point first, then slowly to the button and check state each time
  await page.mouse.move(10, 400);
  await page.waitForTimeout(300);
  await page.mouse.move(box.x + 20, box.y + 8, { steps: 5 });
  await page.waitForTimeout(600);
  r.hiddenAfterHover = await page.evaluate(
    () => document.getElementById("mega-menu").hidden,
  );
  // Does a playwright .click() work at all on this button?
  await page.click("#menu-toggle");
  await page.waitForTimeout(400);
  r.hiddenAfterClick = await page.evaluate(
    () => document.getElementById("mega-menu").hidden,
  );
  return r;
}
