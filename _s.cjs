const fs = require("fs");
const h = fs.readFileSync(
  "c:/Users/Slash/Desktop/ECOMMERCE/index.html",
  "utf8",
);
const m = h.match(/<script>([\s\S]*)<\/script>/);
fs.writeFileSync("c:/Users/Slash/Desktop/ECOMMERCE/_s.js", m[1]);
