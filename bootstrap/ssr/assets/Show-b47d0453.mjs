import { j as jsxs, a as jsx } from "../ssr.mjs";
import { B as Button } from "./Button-409c7599.mjs";
import { D as DetailDokumenItem } from "./DetailDokumenItem-75c079ec.mjs";
import { I as Icon } from "./Icon-ec6848f5.mjs";
import { S as Section, a as SectionTitle } from "./Section-0e98acee.mjs";
import { I as InputFileViewer } from "./InputFileViewer-5fab1fb9.mjs";
import { U as UseRiwayatShow } from "./UseRiwayatShow-49cda6c4.mjs";
import { A as AppContentLayout } from "./AppContentLayout-eb7f1462.mjs";
import { a as formatDateString } from "./GlobalFunction-42b33f59.mjs";
import { Head } from "@inertiajs/react";
import "react/jsx-runtime";
import "react-dom/server";
import "@inertiajs/react/server";
import "clsx";
import "react";
import "react-pdf";
import "react-toastify";
import "./Dropdown-c2fd1bd2.mjs";
import "@headlessui/react";
import "react-icons/pi/index.esm.js";
function Show({ title, documents, flash }) {
  const { handleDownload } = UseRiwayatShow(flash, documents);
  return /* @__PURE__ */ jsxs(AppContentLayout, { active: "Riwayat", title: "Riwayat Detail", children: [
    /* @__PURE__ */ jsx(Head, { title }),
    /* @__PURE__ */ jsx(Section, { isVerifikasi: true, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:grid lg:grid-cols-2 gap-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx(SectionTitle, { title: "Detail Dokumen" }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-3", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: documents.qrcode,
            alt: documents.perihal,
            className: "w-[100px] border rounded-xl p-2"
          }
        ) }),
        /* @__PURE__ */ jsx("table", { className: "table-auto w-full", cellPadding: 3, children: /* @__PURE__ */ jsxs("tbody", { children: [
          /* @__PURE__ */ jsx(
            DetailDokumenItem,
            {
              label: "Tanggal",
              value: formatDateString(
                documents.signed_at
              )
            }
          ),
          /* @__PURE__ */ jsx(
            DetailDokumenItem,
            {
              label: "Perihal",
              value: documents.perihal
            }
          ),
          /* @__PURE__ */ jsx(
            DetailDokumenItem,
            {
              label: "Penandatangan",
              value: documents.signer.user.name
            }
          ),
          documents.signer.jabatan ? /* @__PURE__ */ jsx(
            DetailDokumenItem,
            {
              label: "Jabatan",
              value: documents.signer.jabatan
            }
          ) : null,
          /* @__PURE__ */ jsx(
            DetailDokumenItem,
            {
              label: "Lembaga/Unit",
              value: documents.signer.lembaga
            }
          ),
          /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 3, children: /* @__PURE__ */ jsxs(
            Button,
            {
              size: "sm",
              onClick: handleDownload,
              className: "mt-2",
              children: [
                /* @__PURE__ */ jsx(Icon, { icon: "download", me: 2 }),
                " ",
                "Unduh Dokumen"
              ]
            }
          ) }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-20 lg:mb-0", children: [
        /* @__PURE__ */ jsx(SectionTitle, { title: "Preview Dokumen" }),
        /* @__PURE__ */ jsx(InputFileViewer, { file: documents.dokumen })
      ] })
    ] }) })
  ] });
}
export {
  Show as default
};
