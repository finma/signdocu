import { a as jsx, j as jsxs } from "../ssr.mjs";
import clsx from "clsx";
import "react";
function SectionTitle({ title }) {
  return /* @__PURE__ */ jsx("h3", { className: "text-base md:text-xl font-semibold mb-5", children: /* @__PURE__ */ jsx("span", { className: "border-b-4 border-color-secondary", children: title }) });
}
function Section({ title, children, isVerifikasi = false, className }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        !isVerifikasi ? "md:bg-gray-50" : "bg-white",
        "px-5 md:py-5 md:rounded-2xl"
      ),
      children: [
        title ? /* @__PURE__ */ jsx(SectionTitle, { title }) : null,
        /* @__PURE__ */ jsx("article", { className: clsx(className, "text-xs"), children })
      ]
    }
  );
}
export {
  Section as S,
  SectionTitle as a
};
