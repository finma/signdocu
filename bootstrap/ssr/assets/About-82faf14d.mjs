import { j as jsxs, a as jsx } from "../ssr.mjs";
import { A as AppContentLayout } from "./AppContentLayout-eb7f1462.mjs";
import { S as Section } from "./Section-0e98acee.mjs";
import { Head } from "@inertiajs/react";
import "react/jsx-runtime";
import "react-dom/server";
import "@inertiajs/react/server";
import "./Dropdown-c2fd1bd2.mjs";
import "react";
import "@headlessui/react";
import "./Icon-ec6848f5.mjs";
import "clsx";
import "react-icons/pi/index.esm.js";
import "react-toastify";
function About({ title }) {
  return /* @__PURE__ */ jsxs(AppContentLayout, { active: title, title, children: [
    /* @__PURE__ */ jsx(Head, { title }),
    /* @__PURE__ */ jsx(Section, { title, children: /* @__PURE__ */ jsxs("div", { className: "w-full md:w-[50%] text-sm mt-5", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-justify mb-2", children: [
        /* @__PURE__ */ jsx("b", { children: "Digital Signature in Blockchain (Signchain)" }),
        " adalah aplikasi layanan sertifikat elektronik dibawah pengelolaan Research Collaboration antara Telkom University dan Universitas Siliwangi. Aplikasi tersebut merupakan hasil riset tahun 2023 yang dilakukan oleh :"
      ] }),
      /* @__PURE__ */ jsxs("ul", { className: "", children: [
        /* @__PURE__ */ jsx("li", { children: "1. Prof. Dr. Ir. H. Irfan Darmawan, S.T., M.T., IPU." }),
        /* @__PURE__ */ jsx("li", { children: "2. Ir. Alam Rahmatulloh, S.T., M.T., MCE., IPM." }),
        /* @__PURE__ */ jsx("li", { children: "3. Rohmat Gunawan, S.T., M.T., MCE." }),
        /* @__PURE__ */ jsx("li", { children: "4. Iqbal Muhammad Fajar Nuralam, S.T." })
      ] })
    ] }) })
  ] });
}
export {
  About as default
};
