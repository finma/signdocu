import { j as jsxs, a as jsx } from "../ssr.mjs";
import { F as Found } from "./Found-eb621b55.mjs";
import { U as UseRiwayatShow } from "./UseRiwayatShow-49cda6c4.mjs";
import clsx from "clsx";
import { S as Section } from "./Section-0e98acee.mjs";
import { Head } from "@inertiajs/react";
import "react/jsx-runtime";
import "react-dom/server";
import "@inertiajs/react/server";
import "./Button-409c7599.mjs";
import "./Icon-ec6848f5.mjs";
import "./DetailDokumenItem-75c079ec.mjs";
import "./GlobalFunction-42b33f59.mjs";
import "./InputFileViewer-5fab1fb9.mjs";
import "react";
import "react-pdf";
import "react-toastify";
function NotFound() {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center items-center", children: [
    /* @__PURE__ */ jsx("img", { src: "/images/404.svg", alt: "not found" }),
    /* @__PURE__ */ jsx("span", { className: "text-base", children: "Dokumen tidak ditemukan." })
  ] });
}
function AppVerifikasiLayout({ children, found = true }) {
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex flex-col sm:justify-center items-center sm:pt-0 bg-gray-100", children: /* @__PURE__ */ jsxs("div", { className: clsx(!found && "h-[100vh] lg:h-[50vh]", "w-full lg:w-[1000px] lg:my-5 overflow-hidden bg-white shadow-md sm:rounded-lg text-gray-500 text-sm"), children: [
    /* @__PURE__ */ jsx("div", { className: "bg-color-primary flex justify-center items-center h-[50px]", children: /* @__PURE__ */ jsx("span", { className: "text-white text-lg font-medium", children: "Verifikasi Dokumen" }) }),
    /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx("main", { className: "flex flex-col pt-7 lg:pt-0", children }) })
  ] }) });
}
function Show({ title, documents, flash }) {
  const { handleDownload } = UseRiwayatShow(flash, documents);
  return /* @__PURE__ */ jsxs(
    AppVerifikasiLayout,
    {
      active: title,
      title,
      found: documents !== "not found",
      children: [
        /* @__PURE__ */ jsx(Head, { title }),
        /* @__PURE__ */ jsx(Section, { isVerifikasi: true, children: documents !== "not found" ? /* @__PURE__ */ jsx(
          Found,
          {
            documents,
            handleDownload
          }
        ) : /* @__PURE__ */ jsx(NotFound, {}) })
      ]
    }
  );
}
export {
  Show as default
};
