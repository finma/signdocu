import { j as jsxs, a as jsx } from "../ssr.mjs";
import { A as AppLayout } from "./AppLayout-4341c344.mjs";
import { router, Head } from "@inertiajs/react";
import { useEffect } from "react";
import "react/jsx-runtime";
import "react-dom/server";
import "@inertiajs/react/server";
import "react-toastify";
function SplashScreen() {
  useEffect(() => {
    setTimeout(() => {
      router.get(route("home"));
    }, 2e3);
  }, []);
  return /* @__PURE__ */ jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Siliwangi Digital Signature" }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-center gap-5 h-full md:py-10", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center items-center gap-10 border-4 border-color-primary rounded-full w-[200px] h-[200px] text-[50px] font-bold", children: [
      /* @__PURE__ */ jsx("span", { className: "text-color-primary", children: "Sign" }),
      /* @__PURE__ */ jsx("span", { className: "text-color-secondary", children: "chain" })
    ] }) }) })
  ] });
}
export {
  SplashScreen as default
};
