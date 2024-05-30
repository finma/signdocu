import { a as jsx } from "../ssr.mjs";
import "react";
import "react/jsx-runtime";
import "react-dom/server";
import "@inertiajs/react";
import "@inertiajs/react/server";
function Index() {
  return /* @__PURE__ */ jsx("div", { children: "Profil" });
}
export {
  Index as default
};
