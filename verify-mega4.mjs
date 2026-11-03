export default async function run(page) {
  await page.goto("file:///C:/Users/Slash/Desktop/ECOMMERCE/index.html");
  await page.waitForTimeout(1200);
  const results = {};
  // Baseline: can we even click a simple nav link?
  const box = await page.locator("#menu-toggle").boundingBox();
  results.box = box;
  // Check element at that point
  results.elementAtPoint = await page.evaluate(
    ({ x, y }) => {
      const el = document.elementFromPoint(x, y);
      return el ? el.id || el.tagName + "." + el.className : "nothing";
    },
    { x: box.x + box.width / 2, y: box.y + box.height / 2 },
  );
  // List fixed overlays
  results.overlays = await page.evaluate(() =>
    [...document.querySelectorAll("body *")]
      .filter((el) => {
        const s = getComputedStyle(el);
        return (
          s.position === "fixed" &&
          s.visibility !== "hidden" &&
          s.display !== "none"
        );
      })
      .map((el) => ({
        tag: el.tagName,
        id: el.id,
        cls: el.className,
        z: getComputedStyle(el).zIndex,
        pe: getComputedStyle(el).pointerEvents,
      })),
  );
  return results;
}
