import { j as jsxs, a as jsx } from "../ssr.mjs";
function DetailDokumenItem({ width = 110, label, value }) {
  return /* @__PURE__ */ jsxs("tr", { className: "align-top", children: [
    /* @__PURE__ */ jsx("td", { width, className: "font-medium", children: label }),
    /* @__PURE__ */ jsx("td", { width: 10, children: ":" }),
    /* @__PURE__ */ jsx("td", { children: value })
  ] });
}
export {
  DetailDokumenItem as D
};
