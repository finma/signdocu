import { j as jsxs, a as jsx } from "../ssr.mjs";
import { B as Button } from "./Button-409c7599.mjs";
import { D as DetailDokumenItem } from "./DetailDokumenItem-75c079ec.mjs";
import { I as Icon } from "./Icon-ec6848f5.mjs";
import { a as SectionTitle } from "./Section-0e98acee.mjs";
import { a as formatDateString } from "./GlobalFunction-42b33f59.mjs";
import { I as InputFileViewer } from "./InputFileViewer-5fab1fb9.mjs";
function Found({ documents, handleDownload }) {
  var _a, _b, _c;
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:grid lg:grid-cols-2 gap-5", children: [
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
            value: formatDateString(documents.signed_at)
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
            value: (_b = (_a = documents.signer) == null ? void 0 : _a.user) == null ? void 0 : _b.name
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
            value: (_c = documents.signer) == null ? void 0 : _c.lembaga
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
              " Unduh Dokumen"
            ]
          }
        ) }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-5", children: [
      /* @__PURE__ */ jsx(SectionTitle, { title: "Preview Dokumen" }),
      /* @__PURE__ */ jsx(InputFileViewer, { file: documents.dokumen })
    ] })
  ] });
}
export {
  Found as F
};
