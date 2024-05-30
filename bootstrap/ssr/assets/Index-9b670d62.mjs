import { j as jsxs, F as Fragment, a as jsx } from "../ssr.mjs";
import "clsx";
import { B as Button } from "./Button-409c7599.mjs";
import { I as Icon } from "./Icon-ec6848f5.mjs";
import { v as verifySignature } from "./SignServices-ef683c9a.mjs";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { a as SectionTitle, S as Section } from "./Section-0e98acee.mjs";
import { F as Found } from "./Found-eb621b55.mjs";
import { A as AppContentLayout } from "./AppContentLayout-eb7f1462.mjs";
import { Head } from "@inertiajs/react";
/* empty css                         */import "react/jsx-runtime";
import "react-dom/server";
import "@inertiajs/react/server";
import "sweetalert2";
import "./DetailDokumenItem-75c079ec.mjs";
import "./GlobalFunction-42b33f59.mjs";
import "./InputFileViewer-5fab1fb9.mjs";
import "react-pdf";
import "./Dropdown-c2fd1bd2.mjs";
import "@headlessui/react";
import "react-icons/pi/index.esm.js";
const UseFormVerifikasi = (flash) => {
  const [dokumen, setDokumen] = useState("");
  const [loading, setLoading] = useState(false);
  const [dokumenData, setDokumenData] = useState({});
  const [isVerified, setIsVerified] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showDocument, setShowDocument] = useState(false);
  useEffect(() => {
    if (flash.success) {
      toast.success(flash.success, {
        theme: "colored"
      });
    }
  }, [flash]);
  const downloadFile = (data, filename) => {
    const url = data;
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };
  const handleDownload2 = () => {
    const data = dokumenData.dokumen;
    const filename = `${dokumenData.perihal}.pdf`;
    downloadFile(data, filename);
  };
  async function documentVerification(dokumen2) {
    const web3 = new Web3(window.ethereum);
    const documentHash = await calculateFileHash(dokumen2);
    setLoading(true);
    try {
      const { data } = await getDokumenByBlockchainHash(documentHash);
      const signature = data.blockchain_signature;
      const address = data.ethereum_address.address;
      const signerAddress = verifySignature(
        web3,
        documentHash,
        signature
      );
      console.log(data);
      console.log({ signerAddress });
      console.log({ address });
      if (signerAddress.toLowerCase() === address.toLowerCase()) {
        setShowResult(true);
        setIsVerified(true);
        setDokumenData(data);
      } else {
        setShowResult(true);
        setIsVerified(false);
      }
    } catch (error) {
      console.log(error.response.data);
      setShowResult(true);
      setIsVerified(false);
    }
    setLoading(false);
  }
  async function getDokumenByBlockchainHash(documentHash) {
    const { data } = await axios(
      route("api.document.blockchain-hash", documentHash)
    );
    return data;
  }
  function calculateFileHash(file) {
    return new Promise((resolve, reject) => {
      const web3 = new Web3(window.ethereum);
      const reader = new FileReader();
      reader.onload = function(event) {
        const arrayBuffer = event.target.result;
        const uint8Array = new Uint8Array(arrayBuffer);
        const binaryString = Array.from(uint8Array).map((byte) => String.fromCharCode(byte)).join("");
        const hash = web3.utils.sha3(binaryString);
        resolve(hash);
      };
      reader.onerror = function(error) {
        reject(new Error("Error reading file: " + error));
      };
      reader.readAsArrayBuffer(file);
    });
  }
  return {
    dokumen,
    setDokumen,
    dokumenData,
    loading,
    isVerified,
    showResult,
    showDocument,
    setShowDocument,
    documentVerification,
    handleDownload: handleDownload2
  };
};
const DataBlockChainSignature = ({ signedBy, ethAddress, documentHash, signatureHash }) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SectionTitle, { title: "Blockchain Signature" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 -mt-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Status" }),
        /* @__PURE__ */ jsxs("div", { className: "border border-green-500 rounded-lg w-[150px] px-2 py-1 text-green-500 text-center bg-green-500/5", children: [
          /* @__PURE__ */ jsx(Icon, { icon: "check-circle-fill", me: 2 }),
          "Document Valid"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Signed By" }),
        /* @__PURE__ */ jsx("span", { children: signedBy })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Ethereum Address" }),
        /* @__PURE__ */ jsx("span", { className: "break-words", children: ethAddress })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Document Hash" }),
        /* @__PURE__ */ jsx("span", { className: "break-words", children: documentHash })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Signature Hash" }),
        /* @__PURE__ */ jsx("span", { className: "break-words", children: signatureHash })
      ] })
    ] })
  ] });
};
const FormVerifikasi = ({ flash }) => {
  const {
    dokumen,
    setDokumen,
    dokumenData,
    loading,
    isVerified,
    showResult,
    showDocument,
    setShowDocument,
    documentVerification,
    handleDownload: handleDownload2
  } = UseFormVerifikasi(flash);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 justify-end", children: [
      /* @__PURE__ */ jsx("div", { className: "relative w-full", children: /* @__PURE__ */ jsx(
        "input",
        {
          type: "file",
          name: "dokumen",
          onChange: (e) => setDokumen(e.target.files[0]),
          placeholder: "Masukkan Hash Dokumen",
          className: "pl-4 pr-4 py-3 w-full rounded-lg border border-gray-200 bg-gray-50 outline-none focus:border-color-primary",
          required: true
        }
      ) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          size: "sm",
          type: "submit",
          disabled: !dokumen,
          onClick: () => documentVerification(dokumen),
          children: loading ? /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-2", children: [
            /* @__PURE__ */ jsx(ClipLoader, { color: "#fff", size: 15 }),
            /* @__PURE__ */ jsx("span", { children: "Submit" })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Icon, { icon: "send", me: 2, className: "text-sm" }),
            "Submit"
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("hr", { className: "my-5" }),
    showResult ? isVerified ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5", children: [
      /* @__PURE__ */ jsx(
        DataBlockChainSignature,
        {
          signedBy: dokumenData.ethereum_address.user.name,
          ethAddress: dokumenData.ethereum_address.address,
          documentHash: dokumenData.blockchain_document_hash,
          signatureHash: dokumenData.blockchain_signature
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          outline: true,
          size: "sm",
          className: "w-full",
          onClick: () => setShowDocument(!showDocument),
          children: showDocument ? /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { children: "Sembunyikan Detail Dokumen" }),
            /* @__PURE__ */ jsx(Icon, { icon: "chevron-up" })
          ] }) : /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { children: "Munculkan Detail Dokumen" }),
            /* @__PURE__ */ jsx(Icon, { icon: "chevron-down" })
          ] })
        }
      ),
      showDocument ? /* @__PURE__ */ jsx(
        Found,
        {
          documents: dokumenData,
          handleDownload: handleDownload2
        }
      ) : null
    ] }) : /* @__PURE__ */ jsx("div", { className: "border border-color-primary px-5 py-10 rounded-lg bg-color-primary/5", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center items-center gap-5", children: [
      /* @__PURE__ */ jsx(
        Icon,
        {
          icon: "x-circle",
          style: { fontSize: "50px" },
          className: "text-color-primary"
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "text-color-primary font-medium", children: "Dokumen tidak terverifikasi / tidak valid" })
    ] }) }) : null
  ] });
};
const FormVerifikasi$1 = FormVerifikasi;
function Verifikasi({ title, document: document2, filtered, flash }) {
  return /* @__PURE__ */ jsxs(AppContentLayout, { active: title, title, children: [
    /* @__PURE__ */ jsx(Head, { title }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5", children: [
      /* @__PURE__ */ jsx(Section, { title: "Verifikasi Dokumen", children: /* @__PURE__ */ jsx(FormVerifikasi$1, { flash }) }),
      document2 ? /* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsx(
        Found,
        {
          documents: document2,
          handleDownload
        }
      ) }) : null
    ] })
  ] });
}
export {
  Verifikasi as default
};
