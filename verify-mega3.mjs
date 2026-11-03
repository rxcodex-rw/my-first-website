export default async function run(page) {
  await page.goto("file:///C:/Users/Slash/Desktop/ECOMMERCE/index.html");
  await page.waitForTimeout(1200);
  await page.mouse.move(10, 500);
  await page.waitForTimeout(400);

  // Capture what happens on real mousedown/mouseup
  const logs = [];
  await page.exposeFunction("logEvt", (m) => logs.push(m));
  await page.evaluate(() => {
    ["mousedown", "mouseup", "click", "mouseenter", "mouseleave"].forEach(
      (type) =>
        document
          .getElementById("menu-toggle")
          .addEventListener(type, (e) =>
            window.logEvt(
              type + " hidden=" + document.getElementById("mega-menu").hidden,
            ),
          ),
    );
  });
  const box = await page.locator("#menu-toggle").boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.waitForTimeout(500); // hover fires
  const afterHover = await page.evaluate(
    () => document.getElementById("mega-menu").hidden,
  );
  await page.mouse.down();
  await page.mouse.up();
  await page.waitForTimeout(400);
  const afterClick = await page.evaluate(
    () => document.getElementById("mega-menu").hidden,
  );
  return { logs, afterHover, afterClick };
}
