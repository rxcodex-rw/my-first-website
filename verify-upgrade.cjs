const fs = require("fs");
const dir = "c:/Users/Slash/Desktop/ECOMMERCE/";
let problems = 0;

for (const f of ["index.html", "checkout.html"]) {
  const html = fs.readFileSync(dir + f, "utf8");
  // 1) Every inline script must parse
  [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].forEach((m, i) => {
    try {
      new Function(m[1]);
      console.log(f, "script", i + 1, "syntax OK");
    } catch (e) {
      problems++;
      console.log(f, "script", i + 1, "SYNTAX ERROR:", e.message);
    }
  });
  // 2) Every getElementById target must exist in the markup
  const script = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
    .map((m) => m[1])
    .join("\n");
  const wanted = new Set(
    [...script.matchAll(/getElementById\("([^"]+)"\)/g)].map((m) => m[1]),
  );
  for (const id of wanted) {
    if (!html.includes(`id="${id}"`)) {
      problems++;
      console.log(f, "MISSING id in markup:", id);
    }
  }
  // 3) Icon stroke weights should be bold (>= 2)
  const strokes = [...html.matchAll(/stroke-width:\s*([\d.]+)/g)].map((m) =>
    Number(m[1]),
  );
  console.log(
    f,
    "icon stroke widths:",
    strokes.length ? strokes.join(", ") : "none",
    strokes.length && Math.min(...strokes) >= 1.9 ? "(bold ✓)" : "",
  );
  // 4) Old thin-stroke remnants
  if (/stroke-width:\s*1\.[0-7]\b/.test(html)) {
    problems++;
    console.log(f, "still has thin 1.x stroke");
  }
  console.log("---");
}
console.log(
  problems === 0 ? "ALL CHECKS PASSED" : problems + " problem(s) found",
);
