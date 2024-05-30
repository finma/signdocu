import { j as jsxs, a as jsx } from "../ssr.mjs";
import { ToastContainer } from "react-toastify";
function AppLayout({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col sm:justify-center items-center sm:pt-0 bg-gray-100", children: [
    /* @__PURE__ */ jsx("div", { className: "w-full h-[100vh] md:h-auto sm:max-w-md px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg text-gray-500 text-sm", children }),
    /* @__PURE__ */ jsx(ToastContainer, {})
  ] });
}
export {
  AppLayout as A
};
