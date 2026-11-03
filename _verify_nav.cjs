const fs = require("fs");
const vm = require("vm");
const html = fs.readFileSync(
  "c:/Users/Slash/Desktop/ECOMMERCE/index.html",
  "utf8",
);
// HTML structure
const noBurger =
  !/id="menu-toggle"\s*>\s*☰/.test(html) &&
  !/class="icon-btn menu-toggle"/.test(html);
console.log("Hamburger icon removed:", noBurger);
const noShade = !/id="mega-shade"/.test(html);
console.log("Shade removed:", noShade);
const nav = html.match(/<nav class="nav"[^>]*>([\s\S]*?)<\/nav>/)[1];
console.log(
  "Nav links (incl. dropdowns):",
  (nav.match(/<a /g) || []).length,
  "| dropdowns:",
  (nav.match(/nav-drop"/g) || []).length,
  "| More button:",
  nav.includes('id="menu-toggle"'),
);
// JS run
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
console.log(
  "More ▾ opens panel:",
  !elements["mega-menu"].hidden,
  "| links:",
  (elements["mega-inner"]._html.match(/class="mega-link/g) || []).length,
);
elements["mega-close"].onclick();
console.log("× closes panel:", elements["mega-menu"].hidden);
