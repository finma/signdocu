import { j as jsxs, a as jsx } from "../ssr.mjs";
function InputLabel({ value, className = "", required = false, children, ...props }) {
  return /* @__PURE__ */ jsxs("label", { ...props, className: `block text-xs md:text-sm text-gray-500` + className, children: [
    value ? value : children,
    required && /* @__PURE__ */ jsx("span", { className: "text-red-500 ms-1", children: "*" })
  ] });
}
export {
  InputLabel as I
};
