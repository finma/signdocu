import { j as jsxs, a as jsx, F as Fragment } from "../ssr.mjs";
import { I as InputLabel } from "./InputLabel-9f5c00d8.mjs";
import { M as Modal } from "./Modal-ab0c50c5.mjs";
import { Input } from "antd";
import { B as Button } from "./Button-409c7599.mjs";
import { I as Icon } from "./Icon-ec6848f5.mjs";
import { I as InputError } from "./InputError-fcb315b9.mjs";
import clsx from "clsx";
import { useState, useEffect, useRef } from "react";
import { I as InputFileViewer } from "./InputFileViewer-5fab1fb9.mjs";
import { A as AppLayout } from "./AppLayout-4341c344.mjs";
import { ClockLoader } from "react-spinners";
import { a as SectionTitle, S as Section } from "./Section-0e98acee.mjs";
import { T as TextInput } from "./TextInput-12bf42ab.mjs";
import { m as metaMaskDetect, s as signDocument } from "./SignServices-ef683c9a.mjs";
import { useForm, Head } from "@inertiajs/react";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import { A as AppContentLayout } from "./AppContentLayout-eb7f1462.mjs";
import axios from "axios";
/* empty css                         */import "react/jsx-runtime";
import "react-dom/server";
import "@inertiajs/react/server";
import "@headlessui/react";
import "react-pdf";
import "sweetalert2";
import "./Dropdown-c2fd1bd2.mjs";
import "react-icons/pi/index.esm.js";
function SignButtonModal({ disabled = false, handleModalClose }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-5", children: [
    /* @__PURE__ */ jsxs(
      Button,
      {
        size: "sm",
        variant: "danger",
        className: "w-[150px]",
        onClick: handleModalClose,
        children: [
          /* @__PURE__ */ jsx(Icon, { icon: "x-lg", className: "me-2 text-sm" }),
          "Batal"
        ]
      }
    ),
    /* @__PURE__ */ jsxs(Button, { type: "submit", size: "sm", className: "w-[150px]", disabled, children: [
      /* @__PURE__ */ jsx(Icon, { icon: "pencil-square", className: "me-2 text-sm" }),
      "Tanda Tangan"
    ] })
  ] });
}
function ModalPassphrase({
  modalOpen,
  submit,
  handleModalClose,
  handleChange,
  data,
  errors
}) {
  return /* @__PURE__ */ jsx(Modal, { show: modalOpen, children: /* @__PURE__ */ jsxs("form", { className: "flex flex-col gap-5", onSubmit: submit, children: [
    /* @__PURE__ */ jsx(Modal.Header, { onClick: handleModalClose, children: "Tanda Tangani Dokumen" }),
    /* @__PURE__ */ jsxs(Modal.Body, { className: "flex flex-col gap-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 w-full", children: [
        /* @__PURE__ */ jsx(InputLabel, { required: true, children: "Perihal" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            name: "perihal",
            placeholder: "Masukkan Perihal",
            onChange: handleChange,
            defaultValue: data.perihal,
            className: clsx(
              errors.perihal && "border-red-500",
              "py-2"
            ),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.perihal })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 w-full", children: [
        /* @__PURE__ */ jsx(InputLabel, { required: true, children: "Passphrase" }),
        /* @__PURE__ */ jsx(
          Input.Password,
          {
            name: "passphrase",
            placeholder: "Masukkan Passphrase",
            onChange: handleChange,
            className: "py-2",
            required: true
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(Modal.Footer, { children: /* @__PURE__ */ jsx(
      SignButtonModal,
      {
        disabled: !data.perihal || !data.passphrase || data.passphrase.length < 6,
        handleModalClose
      }
    ) })
  ] }) });
}
function SignButtonNav({ disabled = false, handleModalOpen, file, resetFile }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-5 mb-15", children: [
    /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "danger", className: "w-[150px]", onClick: resetFile, disabled: !file, children: [
      /* @__PURE__ */ jsx(Icon, { icon: "arrow-clockwise", className: "me-2 text-sm" }),
      "Reset File"
    ] }),
    /* @__PURE__ */ jsxs(Button, { size: "sm", className: "w-[150px]", onClick: handleModalOpen, disabled, children: [
      /* @__PURE__ */ jsx(Icon, { icon: "arrow-right", className: "me-2 text-sm" }),
      "Lanjutkan"
    ] })
  ] });
}
function SignHelp() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-yellow-100 p-3 rounded-xl flex lg:flex-col gap-3", children: [
      /* @__PURE__ */ jsx(Icon, { icon: "file-earmark-pdf", className: "text-3xl" }),
      /* @__PURE__ */ jsxs("span", { children: [
        "File yang diizinkan untuk melakukan tanda tangan digital adalah yang berekstensi ",
        /* @__PURE__ */ jsx("strong", { children: ".pdf" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hidden lg:block ", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-center h-auto mt-10 gap-5 md:py-10", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center items-center gap-10 border-4 border-color-primary rounded-full w-[200px] h-[200px] text-[50px] font-bold", children: [
      /* @__PURE__ */ jsx("span", { className: "text-color-primary", children: "Sign" }),
      /* @__PURE__ */ jsx("span", { className: "text-color-secondary", children: "chain" })
    ] }) }) }) })
  ] });
}
function InputFileForm({ file, errors, handleFileChange, disabledSelectFile }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "label",
      {
        htmlFor: "file",
        className: clsx(
          errors.file ? "border-red-500" : "border-color-secondary",
          "border  rounded-3xl flex justify-center items-center h-[550px] cursor-pointer hover:bg-gray-100"
        ),
        children: /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center gap-3", children: errors.file ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            Icon,
            {
              icon: "exclamation-triangle",
              className: "text-[40px] text-red-500"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-red-500 text-base", children: errors.file })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            Icon,
            {
              icon: "file-earmark-pdf",
              className: "text-[40px] text-gray-300"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-gray-300 text-base", children: !disabledSelectFile ? "Pilih Dokumen" : "Browser Anda belum terinstall metamask" })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsx(
      "input",
      {
        id: "file",
        type: "file",
        className: "hidden",
        onChange: handleFileChange,
        disabled: disabledSelectFile
      }
    )
  ] });
}
function SignInputData({
  handleFileChange,
  resetFile,
  errors,
  file,
  filePreview,
  handleModalOpen,
  disabledSelectFile
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5", children: [
    file && filePreview ? /* @__PURE__ */ jsx(
      InputFileViewer,
      {
        file: filePreview ? filePreview : file,
        isPreview: filePreview
      }
    ) : /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
      InputFileForm,
      {
        handleFileChange,
        errors,
        disabledSelectFile
      }
    ) }),
    file ? /* @__PURE__ */ jsx("div", { className: "lg:hidden", children: /* @__PURE__ */ jsx(
      SignButtonNav,
      {
        resetFile,
        handleModalOpen,
        file,
        disabled: !file || errors.file || errors.page || errors.x || errors.y
      }
    ) }) : null
  ] });
}
function SignLoading({ loading = true }) {
  return /* @__PURE__ */ jsx(AppLayout, { children: /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-center gap-5 h-full md:py-10", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 justify-center items-center", children: [
    /* @__PURE__ */ jsx(
      ClockLoader,
      {
        color: "#009B4D",
        loading,
        size: 100,
        "aria-label": "Loading Spinner",
        "data-testid": "loader"
      }
    ),
    /* @__PURE__ */ jsx("span", { className: "text-color-primary text-lg", children: "Signing..." })
  ] }) }) }) });
}
function SignQrUpdateForm({ updateQrCode, qrCode, pageRef, XRef, YRef }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsx(SectionTitle, { title: "Atur Posisi QRCode" }),
    /* @__PURE__ */ jsxs(
      "form",
      {
        onSubmit: updateQrCode,
        className: "grid grid-cols-4 items-end gap-2",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
            /* @__PURE__ */ jsx(InputLabel, { children: "Page" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                type: "number",
                placeholder: "Page",
                defaultValue: qrCode.page,
                ref: pageRef
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
            /* @__PURE__ */ jsx(InputLabel, { children: "Koordinat X" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                type: "number",
                placeholder: "Koordinat X",
                defaultValue: qrCode.x,
                ref: XRef
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
            /* @__PURE__ */ jsx(InputLabel, { children: "Koordinat Y" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                type: "number",
                placeholder: "Koordinat Y",
                defaultValue: qrCode.y,
                ref: YRef
              }
            )
          ] }),
          /* @__PURE__ */ jsx(Button, { size: "sm", type: "submit", children: "Update" })
        ]
      }
    )
  ] });
}
function UseSign(flash, resetFile) {
  const [sign, setSign] = useState(false);
  useState("");
  const [disabledSelectFile, setDisabledSelectFile] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    perihal: "",
    passphrase: "",
    file: null
  });
  const [file, setFile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setData("file", uploadedFile);
  };
  const handleChange = debounce((e) => {
    setData(e.target.name, e.target.value);
  }, 500);
  useEffect(() => {
    metaMaskDetect();
  }, []);
  async function signBlockchain() {
    const web3 = new Web3(window.ethereum);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });
    const account = accounts[0];
    const fileContent = await downloadFile(data.filePreview);
    const documentHash = web3.utils.sha3(fileContent);
    const signature = await signDocument(web3, documentHash, account);
    console.log("raw", documentHash);
    setData({ ...data, blockchain_document_hash: documentHash, blockchain_signature: signature });
  }
  async function downloadFile(url) {
    return fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.arrayBuffer();
    }).then((buffer) => {
      const uint8Array = new Uint8Array(buffer);
      const binaryString = Array.from(uint8Array).map((byte) => String.fromCharCode(byte)).join("");
      return binaryString;
    });
  }
  useEffect(() => {
    if (sign) {
      signBlockchain();
      setSign(false);
    }
  }, [sign]);
  const submit = (e) => {
    e.preventDefault();
    setSign(true);
  };
  useEffect(() => {
    var _a;
    if (((_a = data.blockchain_signature) == null ? void 0 : _a.length) > 0) {
      post(route("sign.handle_sign"), {
        onError: () => {
          handleModalClose();
          toast.error("Gagal, silahkan cek kembali formnya.", {
            theme: "colored"
          });
        },
        preserveState: true,
        preserveScroll: true
      });
      setData("blockchain_signature", null);
    }
  }, [data.blockchain_signature]);
  useEffect(() => {
    if (flash.error) {
      toast.error(flash.error, {
        theme: "colored"
      });
    }
    if (flash.success) {
      handleModalClose();
      reset();
      resetFile();
      toast.success(flash.success, {
        theme: "colored"
      });
    }
  }, [flash]);
  return {
    data,
    setData,
    processing,
    errors,
    reset,
    file,
    setFile,
    handleChange,
    handleFileChange,
    submit,
    modalOpen,
    handleModalOpen,
    handleModalClose,
    disabledSelectFile
  };
}
function Sign({ title, flash }) {
  const [filePreview, setFilePreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const resetFile = () => {
    setFile(null);
    setFilePreview(null);
    setUpdateError({
      file: "",
      page: "",
      x: "",
      y: ""
    });
  };
  const {
    data,
    setData,
    processing,
    errors,
    reset,
    file,
    setFile,
    handleChange,
    handleFileChange,
    submit,
    modalOpen,
    handleModalOpen,
    handleModalClose,
    disabledSelectFile
  } = UseSign(flash, resetFile);
  const pageRef = useRef();
  const XRef = useRef();
  const YRef = useRef();
  const [qrCode, setQrCode] = useState({
    file: null,
    page: 1,
    x: 120,
    y: 242
  });
  const [update, setUpdate] = useState(false);
  const [updateError, setUpdateError] = useState({
    file: "",
    page: "",
    x: "",
    y: ""
  });
  const updateQrCode = (e) => {
    e.preventDefault();
    const pageValue = pageRef.current.value;
    const XValue = XRef.current.value;
    const YValue = YRef.current.value;
    setQrCode({
      page: pageValue,
      x: XValue,
      y: YValue
    });
    setUpdate(true);
  };
  useEffect(() => {
    if (update || file) {
      generateQRCode(file);
    }
  }, [update, file]);
  const generateQRCode = async (file2) => {
    const formData = { ...qrCode, file: file2 };
    setLoading(true);
    try {
      const response = await axios.post(
        route("sign.update_qrcode"),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      if (response.data.success) {
        setUpdate(false);
        setUpdateError({
          file: "",
          page: "",
          x: "",
          y: ""
        });
        setFilePreview(response.data.data.dokumen);
        setData({ ...formData, filePreview: response.data.data.dokumen });
      }
    } catch (error) {
      if (error.response) {
        setUpdateError({
          file: error.response.data.data.file && error.response.data.data.file[0],
          page: error.response.data.data.page && error.response.data.data.page[0],
          x: error.response.data.data.x && error.response.data.data.x[0],
          y: error.response.data.data.y && error.response.data.data.y[0]
        });
      } else {
        console.log(error.message);
      }
    }
    setLoading(false);
  };
  return processing ? /* @__PURE__ */ jsx(SignLoading, {}) : /* @__PURE__ */ jsxs(AppContentLayout, { active: title, title, children: [
    /* @__PURE__ */ jsx(Head, { title }),
    /* @__PURE__ */ jsxs(Section, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:grid grid-cols-2 gap-5", children: [
        file ? !updateError.file ? /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            SignQrUpdateForm,
            {
              updateQrCode,
              qrCode,
              pageRef,
              XRef,
              YRef
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "hidden lg:block mt-5", children: /* @__PURE__ */ jsx(
            SignButtonNav,
            {
              resetFile,
              handleModalOpen,
              file,
              disabled: !file || errors.file || errors.page || errors.x || errors.y
            }
          ) })
        ] }) : /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(SignHelp, {}) }) : /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(SignHelp, {}) }),
        loading ? /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-[300px]", children: /* @__PURE__ */ jsx(
          ClockLoader,
          {
            color: "#009B4D",
            loading,
            size: 150,
            "aria-label": "Loading Spinner",
            "data-testid": "loader"
          }
        ) }) : /* @__PURE__ */ jsx(
          SignInputData,
          {
            handleChange,
            handleFileChange,
            errors: updateError,
            data,
            resetFile,
            file,
            filePreview,
            handleModalOpen,
            disabledSelectFile
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        ModalPassphrase,
        {
          modalOpen,
          handleModalClose,
          submit,
          handleChange,
          data,
          errors
        }
      )
    ] })
  ] });
}
export {
  Sign as default
};
