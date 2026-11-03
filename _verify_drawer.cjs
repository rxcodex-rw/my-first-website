const fs = require("fs");
const vm = require("vm");
const html = fs.readFileSync(
  "c:/Users/Slash/Desktop/ECOMMERCE/index.html",
  "utf8",
);
const m = html.match(/<script>([\s\S]*)<\/script>/);
let code = m[1].replace(/const (PRODUCT_META|productFiles)/g, "var $1");
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
const mega = makeEl("mega-menu");
mega.hidden = true;
elements["mega-menu"] = mega;
const shade = makeEl("mega-shade");
elements["mega-shade"] = shade;
const toggleBtn = makeEl("menu-toggle");
elements["menu-toggle"] = toggleBtn;
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
vm.runInContext(code, sandbox);
console.log("Initial drawer hidden:", elements["mega-menu"].hidden);
// Simulate clicking the hamburger
if (typeof elements["menu-toggle"].onclick === "function") {
  elements["menu-toggle"].onclick();
  console.log("After ☰ click → drawer hidden:", elements["mega-menu"].hidden);
  console.log("Shade hidden:", elements["mega-shade"].hidden);
  const htmlOut = elements["mega-inner"]._html;
  console.log(
    "Drawer link count:",
    (htmlOut.match(/class="mega-link/g) || []).length,
  );
  console.log("Has quick links:", htmlOut.includes("mega-quick"));
  // Simulate close
  elements["mega-close"].onclick();
  console.log("After × click → drawer hidden:", elements["mega-menu"].hidden);
  console.log("Shade hidden after close:", elements["mega-shade"].hidden);
} else {
  console.log("menu-toggle has no onclick handler!");
}
