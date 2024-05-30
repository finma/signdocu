import { a as jsx } from "../ssr.mjs";
import "@inertiajs/react";
function Guest({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100", children: /* @__PURE__ */ jsx("div", { className: "w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg", children }) });
}
export {
  Guest as G
};
