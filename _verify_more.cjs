const fs = require("fs");
const vm = require("vm");
const html = fs.readFileSync(
  "c:/Users/Slash/Desktop/ECOMMERCE/index.html",
  "utf8",
);
const m = html.match(/<script>([\s\S]*)<\/script>/);
const code = m[1].replace(/const (PRODUCT_META|productFiles)/g, "var $1");
const elements = {};
function makeEl(id) {
  const el = {
    id,
    _html: "",
    textContent: "",
    hidden: true,
    onclick: null,
    value: "",
    checked: false,
    style: {},
    classList: {
      add() {},
      remove() {},
      contains() {
        return false;
      },
      toggle() {},
    },
    querySelectorAll() {
      return [];
    },
    querySelector() {
      return makeEl(id + "-q");
    },
    setAttribute() {},
    scrollIntoView() {},
    focus() {},
    contains() {
      return false;
    },
    appendChild() {},
    addEventListener() {},
    remove() {},
  };
  Object.defineProperty(el, "innerHTML", {
    set(v) {
      this._html = v;
    },
    get() {
      return this._html;
    },
  });
  return el;
}
const sandbox = {
  console,
  escapeHTML: (v) => String(v),
  currency: (v) => "$" + v,
  toast: () => {},
  readCurrentUser: () => null,
  readOrders: () => [],
  cart: [],
  location: { hash: "#home", href: "" },
  window: {
    addEventListener() {},
    scrollTo() {},
    matchMedia: () => ({ matches: false, addEventListener() {} }),
  },
  localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
  document: {
    getElementById(id) {
      return (elements[id] = elements[id] || makeEl(id));
    },
    querySelector() {
      return makeEl("q");
    },
    querySelectorAll() {
      return [];
    },
    addEventListener() {},
    createElement() {
      return makeEl("tmp");
    },
    body: makeEl("body"),
  },
};
vm.createContext(sandbox);
try {
  vm.runInContext(code, sandbox);
  console.log("PAGE SCRIPT: ran without errors");
} catch (e) {
  console.error("RUN ERROR:", e.message);
}
elements["menu-toggle"].onclick();
const h = elements["mega-inner"]._html;
console.log("More panel links:", (h.match(/class="mega-link/g) || []).length);
console.log(
  "Columns:",
  (h.match(/class="mega-col(?!\s*mega-quick)/g) || []).length,
);
console.log("Sections present:");
["Quick links", "Shop by category", "Collections", "Account & service"].forEach(
  (s) => console.log("  " + s + ":", h.includes(s)),
);
console.log("Removed sections gone:");
[
  "Shop by need",
  "Shop by fit",
  "Gifts by budget",
  "Premium & luxury",
  "Top picks",
  "Power & charging",
  "Audio & wearables",
  "Quick shortcuts",
  "Home & personal care <ul>",
].forEach((s) => console.log("  " + s + ":", !h.includes(s)));
console.log("AI CTA present:", h.includes("mega-ai-cta"));
