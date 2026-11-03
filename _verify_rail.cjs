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
    addEventListener(type, fn) {
      sandbox["on" + type] = fn;
    },
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
for (const id of [
  "nav-drop-categories",
  "nav-drop-collections",
  "nav-drop-prices",
]) {
  const h = (elements[id] || {})._html || "";
  console.log(
    id + ":",
    (h.match(/class="rail-item/g) || []).length,
    "rail items,",
    (h.match(/class="rail-page"/g) || []).length,
    "pages,",
    (h.match(/<img /g) || []).length,
    "images",
  );
}
// Simulate hovering a rail item (needs a working closest impl)
const fakeItem = {
  dataset: { target: "technology" },
  closest(sel) {
    return sel === ".rail" ? { querySelectorAll: () => [] } : null;
  },
};
sandbox.onmouseover && sandbox.onmouseover({ target: fakeItem });
console.log("Hover handler wired:", typeof sandbox.onmouseover === "function");
console.log(
  "JS references rail-page toggling:",
  /classList\.toggle\("active", page\.dataset\.page === target/.test(m[1]),
);
