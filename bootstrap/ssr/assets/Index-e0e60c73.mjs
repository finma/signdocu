import { j as jsxs, a as jsx, F as Fragment } from "../ssr.mjs";
import { I as Icon } from "./Icon-ec6848f5.mjs";
import { QRCodeSVG } from "qrcode.react";
import { I as InputError } from "./InputError-fcb315b9.mjs";
import { I as InputLabel } from "./InputLabel-9f5c00d8.mjs";
import { B as Button } from "./Button-409c7599.mjs";
import { ClipLoader } from "react-spinners";
import { usePage, useForm, Head } from "@inertiajs/react";
import { toast } from "react-toastify";
import { Input } from "antd";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { f as formatDate } from "./GlobalFunction-42b33f59.mjs";
import { A as AppContentLayout } from "./AppContentLayout-eb7f1462.mjs";
import { S as Section } from "./Section-0e98acee.mjs";
/* empty css                         */import "react/jsx-runtime";
import "react-dom/server";
import "@inertiajs/react/server";
import "./Dropdown-c2fd1bd2.mjs";
import "@headlessui/react";
import "react-icons/pi/index.esm.js";
function ButtonSubmitForm({ reset, processing, disabled = false }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-3 mt-2", children: [
    /* @__PURE__ */ jsxs(Button, { onClick: () => reset(), size: "sm", variant: "danger", children: [
      /* @__PURE__ */ jsx(Icon, { icon: "arrow-clockwise", me: 2, className: "text-sm" }),
      " Reset"
    ] }),
    /* @__PURE__ */ jsx(Button, { type: "submit", size: "sm", disabled, children: processing ? /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-2", children: [
      /* @__PURE__ */ jsx(ClipLoader, { color: "#fff", size: 15 }),
      /* @__PURE__ */ jsx("span", { children: "Simpan" })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Icon, { icon: "save", me: 2, className: "text-sm" }),
      " Simpan"
    ] }) })
  ] });
}
function UseFormSertifikat(hasCertificate) {
  const { props } = usePage();
  const { auth } = props;
  const { data, setData, post, processing, errors, reset } = useForm({
    ubah_passphrase: null,
    lembaga: hasCertificate ? hasCertificate.lembaga : "",
    jabatan: hasCertificate ? hasCertificate.jabatan : "",
    passphrase: "",
    // passphrase_lama: "",
    ulangi_passphrase: ""
  });
  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setData(e.target.name, 1);
    } else {
      setData(e.target.name, null);
    }
  };
  const submit = (e) => {
    e.preventDefault();
    post(route("profil.submit_sertifikat"), {
      onSuccess: () => {
        setData({
          ...data,
          ubah_passphrase: null,
          passphrase: "",
          // passphrase_lama: "",
          ulangi_passphrase: ""
        });
      },
      onError: () => {
        toast.error("Gagal, periksa kembali form isiannya.", {
          theme: "colored"
        });
      }
    });
  };
  return {
    auth,
    handleChange,
    handleCheckboxChange,
    submit,
    data,
    processing,
    errors,
    reset
  };
}
function FormSertifikat({ hasCertificate = false, resetPassphrase = false }) {
  const {
    auth,
    handleChange,
    handleCheckboxChange,
    submit,
    data,
    processing,
    errors,
    reset
  } = UseFormSertifikat(hasCertificate);
  return /* @__PURE__ */ jsxs("form", { className: "flex flex-col gap-3 mt-5", onSubmit: submit, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 w-full", children: [
      /* @__PURE__ */ jsx(InputLabel, { children: "Nama" }),
      /* @__PURE__ */ jsx(Input, { value: auth.user.name, className: "py-2", disabled: true })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 w-full", children: [
      /* @__PURE__ */ jsx(InputLabel, { required: true, children: "Unit/Lembaga" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          name: "lembaga",
          placeholder: "Masukkan Unit/Lembaga",
          onChange: handleChange,
          value: data.lembaga,
          className: clsx(errors.lembaga && "border-red-500", "py-2"),
          required: true
        }
      ),
      /* @__PURE__ */ jsx(InputError, { message: errors.lembaga })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 w-full", children: [
      /* @__PURE__ */ jsx(InputLabel, { children: "Jabatan" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          name: "jabatan",
          placeholder: "Masukkan Jabatan",
          onChange: handleChange,
          value: data.jabatan,
          className: clsx(errors.jabatan && "border-red-500", "py-2")
        }
      ),
      /* @__PURE__ */ jsx(InputError, { message: errors.jabatan })
    ] }),
    hasCertificate ? /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 w-full", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          name: "ubah_passphrase",
          id: "ubah_passphrase",
          className: "w-5 h-5 checked:bg-color-primary",
          checked: data.ubah_passphrase !== null,
          onChange: handleCheckboxChange
        }
      ),
      /* @__PURE__ */ jsx(InputLabel, { htmlFor: "ubah_passphrase", children: "Ubah Passphrase" })
    ] }) }) : null,
    hasCertificate && data.ubah_passphrase ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 w-full", children: [
        /* @__PURE__ */ jsx(InputLabel, { required: true, children: "Passphrase Baru" }),
        /* @__PURE__ */ jsx(
          Input.Password,
          {
            name: "passphrase",
            placeholder: "Masukkan Passphrase Baru",
            onChange: handleChange,
            value: data.passphrase,
            className: clsx(
              errors.passphrase && "border-red-500",
              "py-2"
            ),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.passphrase })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 w-full", children: [
        /* @__PURE__ */ jsx(InputLabel, { required: true, children: "Ulangi Passphrase" }),
        /* @__PURE__ */ jsx(
          Input.Password,
          {
            name: "ulangi_passphrase",
            placeholder: "Ulangi Passphrase",
            onChange: handleChange,
            value: data.ulangi_passphrase,
            className: clsx(
              errors.ulangi_passphrase && "border-red-500",
              "py-2"
            ),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.ulangi_passphrase })
      ] })
    ] }) : !hasCertificate ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 w-full", children: [
        /* @__PURE__ */ jsx(InputLabel, { required: true, children: "Passphrase" }),
        /* @__PURE__ */ jsx(
          Input.Password,
          {
            name: "passphrase",
            placeholder: "Masukkan Passphrase",
            onChange: handleChange,
            value: data.passphrase,
            className: clsx(
              errors.passphrase && "border-red-500",
              "py-2"
            ),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.passphrase })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 w-full", children: [
        /* @__PURE__ */ jsx(InputLabel, { required: true, children: "Ulangi Passphrase" }),
        /* @__PURE__ */ jsx(
          Input.Password,
          {
            name: "ulangi_passphrase",
            placeholder: "Ulangi Passphrase",
            onChange: handleChange,
            value: data.ulangi_passphrase,
            className: clsx(
              errors.ulangi_passphrase && "border-red-500",
              "py-2"
            )
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.ulangi_passphrase })
      ] })
    ] }) : null,
    /* @__PURE__ */ jsx(ButtonSubmitForm, { reset, processing })
  ] });
}
function UseFormFileSertifikat() {
  const { props } = usePage();
  const { auth } = props;
  const { data, setData, post, processing, errors, reset } = useForm({
    file_crt: "",
    file_key: "",
    file_p12: ""
  });
  const [errorClients, setErrorClients] = useState({
    file_crt: "",
    file_key: "",
    file_p12: ""
  });
  const handleChange = (e) => {
    setData(
      e.target.name,
      e.target.type === "file" ? e.target.files[0] : e.target.value
    );
  };
  useEffect(() => {
    if (data.file_crt !== "") {
      const file_crt = data.file_crt.name.split(".").pop();
      if (["crt"].includes(file_crt)) {
        setErrorClients({ ...errorClients, file_crt: "" });
      } else {
        setErrorClients({
          ...errorClients,
          file_crt: "Hanya file berekstensi .crt yang diizinkan."
        });
      }
    }
    if (data.file_p12 !== "") {
      const file_p12 = data.file_p12.name.split(".").pop();
      if (["p12"].includes(file_p12)) {
        setErrorClients({ ...errorClients, file_p12: "" });
      } else {
        setErrorClients({
          ...errorClients,
          file_p12: "Hanya file berekstensi .p12 yang diizinkan."
        });
      }
    }
    if (data.file_key !== "") {
      const file_key = data.file_key.name.split(".").pop();
      if (["key"].includes(file_key)) {
        setErrorClients({ ...errorClients, file_key: "" });
      } else {
        setErrorClients({
          ...errorClients,
          file_key: "Hanya file berekstensi .key yang diizinkan."
        });
      }
    }
  }, [data]);
  console.log(data);
  console.log(errorClients);
  const submit = (e) => {
    e.preventDefault();
    post(route("profil.submit_file_sertifikat"), {
      onSuccess: () => {
        reset();
      },
      onError: () => {
        toast.error("Gagal, periksa kembali form isiannya.", {
          theme: "colored"
        });
      }
    });
  };
  return {
    auth,
    handleChange,
    submit,
    data,
    processing,
    errors,
    reset,
    errorClients
  };
}
function FormFileSertifikat({
  hasCertificate = false,
  resetPassphrase = false
}) {
  const {
    handleChange,
    data,
    submit,
    processing,
    errors,
    reset,
    errorClients
  } = UseFormFileSertifikat();
  const fileCrt = () => {
    if (hasCertificate.file_crt) {
      return /* @__PURE__ */ jsx(
        "a",
        {
          href: `/storage/sertifikat/${hasCertificate.hash}/${hasCertificate.file_crt}`,
          className: "border border-green-500 hover:bg-green-500/15 transition-all duration-300 rounded-md p-2",
          children: /* @__PURE__ */ jsx("span", { className: "text-green-500 font-semibold", children: hasCertificate.file_crt })
        }
      );
    }
  };
  const fileP12 = () => {
    if (hasCertificate.file_p12) {
      return /* @__PURE__ */ jsx(
        "a",
        {
          href: `/storage/sertifikat/${hasCertificate.hash}/${hasCertificate.file_p12}`,
          className: "border border-green-500 hover:bg-green-500/15 transition-all duration-300 rounded-md p-2",
          children: /* @__PURE__ */ jsx("span", { className: "text-green-500 font-semibold", children: hasCertificate.file_p12 })
        }
      );
    }
  };
  const fileKey = () => {
    if (hasCertificate.file_key) {
      return /* @__PURE__ */ jsx(
        "a",
        {
          href: `/storage/sertifikat/${hasCertificate.hash}/${hasCertificate.file_key}`,
          className: "border border-green-500 hover:bg-green-500/15 transition-all duration-300 rounded-md p-2",
          children: /* @__PURE__ */ jsx("span", { className: "text-green-500 font-semibold", children: hasCertificate.file_key })
        }
      );
    }
  };
  return /* @__PURE__ */ jsxs("form", { className: "flex flex-col gap-3 mt-5", onSubmit: submit, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 w-full", children: [
      /* @__PURE__ */ jsx(InputLabel, { required: true, children: "File .crt" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          type: "file",
          name: "file_crt",
          onChange: handleChange,
          className: clsx(
            errorClients.file_crt && "border-red-500",
            "py-2"
          ),
          accept: ".crt",
          required: true
        }
      ),
      errorClients.file_crt || data.file_crt ? /* @__PURE__ */ jsx(InputError, { message: errorClients.file_crt }) : fileCrt()
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 w-full", children: [
      /* @__PURE__ */ jsx(InputLabel, { required: true, children: "File .p12" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          type: "file",
          name: "file_p12",
          onChange: handleChange,
          className: clsx(
            errorClients.file_p12 && "border-red-500",
            "py-2"
          ),
          accept: ".p12",
          required: true
        }
      ),
      errorClients.file_p12 || data.file_p12 ? /* @__PURE__ */ jsx(InputError, { message: errorClients.file_p12 }) : fileP12()
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 w-full", children: [
      /* @__PURE__ */ jsx(InputLabel, { required: true, children: "File .key" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          type: "file",
          name: "file_key",
          onChange: handleChange,
          className: clsx(
            errorClients.file_key && "border-red-500",
            "py-2"
          ),
          accept: ".key",
          required: true
        }
      ),
      errorClients.file_key || data.file_key ? /* @__PURE__ */ jsx(InputError, { message: errorClients.file_key }) : fileKey()
    ] }),
    /* @__PURE__ */ jsx(
      ButtonSubmitForm,
      {
        reset,
        processing,
        disabled: errorClients.file_crt || errorClients.file_p12 || errorClients.file_key || data.file_crt == "" || data.file_p12 == "" || data.file_key == ""
      }
    )
  ] });
}
function DetailSertifikat({ hasCertificate = false, resetPassphrase = false }) {
  const [isActive, setIsActive] = useState("data");
  let verifiedIcon;
  let verifiedColor;
  let verifiedLabel;
  if ((hasCertificate == null ? void 0 : hasCertificate.file_crt) !== null && (hasCertificate == null ? void 0 : hasCertificate.file_key) !== null && (hasCertificate == null ? void 0 : hasCertificate.file_12) !== null) {
    verifiedIcon = "patch-check-fill";
    verifiedColor = "text-green-500";
    verifiedLabel = "Sudah Terverifikasi";
  } else {
    verifiedIcon = "x-circle-fill";
    verifiedColor = "text-red-500";
    verifiedLabel = "Belum Terverifikasi";
  }
  return /* @__PURE__ */ jsx(Fragment, { children: hasCertificate ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center gap-3 mt-5", children: [
      /* @__PURE__ */ jsx("div", { className: "border md:w-[138px] w-[108px] rounded p-2", children: /* @__PURE__ */ jsx(
        QRCodeSVG,
        {
          value: hasCertificate.hash,
          imageSettings: {
            src: hasCertificate.user.avatar ? hasCertificate.user.avatar : `https://ui-avatars.com/api/?name=${hasCertificate.user.name}&background=009B4D&color=fff`,
            x: void 0,
            y: void 0,
            height: 25,
            width: 25,
            excavate: true
          },
          size: 100,
          className: "w-[90px] h-[90px] md:w-[120px] md:h-[120px]"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 group text-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(Icon, { icon: "person" }),
            /* @__PURE__ */ jsx("span", { children: hasCertificate.user.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(Icon, { icon: "briefcase" }),
            /* @__PURE__ */ jsx("span", { children: hasCertificate.jabatan ? hasCertificate.jabatan : "-" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(Icon, { icon: "building" }),
            /* @__PURE__ */ jsx("span", { children: hasCertificate.lembaga })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(
              Icon,
              {
                icon: verifiedIcon,
                className: verifiedColor
              }
            ),
            /* @__PURE__ */ jsxs("span", { className: verifiedColor, children: [
              verifiedLabel,
              " ",
              verifiedLabel === "Sudah Terverifikasi" ? /* @__PURE__ */ jsxs("small", { className: "italic text-yellow-500", children: [
                "(expired :",
                " ",
                formatDate(
                  hasCertificate.expired_at
                ),
                ")"
              ] }) : null
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxs(
            Button,
            {
              size: "sm",
              outline: isActive !== "data",
              onClick: () => setIsActive("data"),
              children: [
                /* @__PURE__ */ jsx(Icon, { icon: "pencil", me: 2 }),
                " Data Sertifikat"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              warning: verifiedLabel === "Belum Terverifikasi",
              size: "sm",
              outline: isActive !== "file",
              onClick: () => setIsActive("file"),
              children: [
                /* @__PURE__ */ jsx(Icon, { icon: "file-earmark", me: 2 }),
                " File Sertifikat"
              ]
            }
          )
        ] }) })
      ] })
    ] }),
    isActive === "data" ? /* @__PURE__ */ jsx(
      FormSertifikat,
      {
        resetPassphrase,
        hasCertificate
      }
    ) : /* @__PURE__ */ jsx(
      FormFileSertifikat,
      {
        resetPassphrase,
        hasCertificate
      }
    )
  ] }) : /* @__PURE__ */ jsx(
    FormSertifikat,
    {
      resetPassphrase,
      hasCertificate
    }
  ) });
}
function UseFormProfil(profil) {
  const [previewAvatar, setPreviewAvatar] = useState("");
  const { data, setData, post, processing, errors, reset } = useForm({
    name: profil.name,
    email: profil.email,
    avatar: profil.avatar
  });
  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };
  const handleAvatarChange = (e) => {
    setData("avatar_update", e.target.files[0]);
    setPreviewAvatar(true);
  };
  const submit = (e) => {
    e.preventDefault();
    post(route("profil.submit_profil"), {
      onSuccess: () => {
        toast.success("Profil berhasil diperbaharui.", {
          theme: "colored"
        });
      },
      onError: () => {
        toast.error("Gagal, periksa kembali form isiannya.", {
          theme: "colored"
        });
      }
    });
  };
  return {
    previewAvatar,
    handleChange,
    handleAvatarChange,
    submit,
    data,
    processing,
    errors,
    reset
  };
}
function FormProfil({ profil }) {
  const {
    previewAvatar,
    handleChange,
    handleAvatarChange,
    submit,
    data,
    processing,
    errors,
    reset
  } = UseFormProfil(profil);
  return /* @__PURE__ */ jsxs("form", { className: "flex flex-col gap-3 mt-5", onSubmit: submit, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center items-center", children: [
      /* @__PURE__ */ jsx(InputError, { message: errors.avatar_update }),
      /* @__PURE__ */ jsx("div", { className: "shadow-lg rounded-xl w-[150px] h-[150px] overflow-hidden", children: previewAvatar ? /* @__PURE__ */ jsx(
        "img",
        {
          src: URL.createObjectURL(data.avatar_update),
          className: "w-full"
        }
      ) : /* @__PURE__ */ jsx(
        "img",
        {
          src: profil.avatar ? profil.avatar : `https://ui-avatars.com/api/?name=${profil.name}&background=009B4D&color=fff`,
          alt: profil.name,
          className: "w-full"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "avatar",
            type: "file",
            className: "hidden",
            name: "avatar",
            onChange: handleAvatarChange,
            accept: "image/*"
          }
        ),
        /* @__PURE__ */ jsx("label", { htmlFor: "avatar", children: /* @__PURE__ */ jsxs("span", { className: "bg-transparent text-color-primary border border-color-primary group hover:bg-color-primary hover:text-white rounded-lg transition-all duration-200 py-2 px-4 cursor-pointer", children: [
          /* @__PURE__ */ jsx(Icon, { icon: "image", me: 2 }),
          "Ubah Avatar"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 w-full", children: [
        /* @__PURE__ */ jsx(InputLabel, { required: true, children: "Nama" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            name: "name",
            placeholder: "Masukkan Nama",
            onChange: handleChange,
            value: data.name,
            className: clsx(
              errors.name && "border-red-500",
              "py-2"
            ),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 w-full", children: [
        /* @__PURE__ */ jsxs(InputLabel, { required: !profil.social_lite, children: [
          "Email",
          " ",
          profil.social_lite ? /* @__PURE__ */ jsx("em", { className: "text-[9px]", children: "(apabila login menggunakan google, email tidak bisa diubah)" }) : null
        ] }),
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "email",
            name: "email",
            placeholder: "Masukkan Email",
            onChange: handleChange,
            value: data.email,
            className: clsx(
              errors.email && "border-red-500",
              "py-2"
            ),
            required: !profil.social_lite,
            disabled: profil.social_lite
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email })
      ] })
    ] }),
    /* @__PURE__ */ jsx(ButtonSubmitForm, { reset, processing })
  ] });
}
const UseFormUbahPassword = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: "",
    password_confirmation: ""
  });
  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };
  const submit = (e) => {
    e.preventDefault();
    post(route("profil.submit_password"), {
      onSuccess: () => {
        toast.success("Password berhasil diubah.", {
          theme: "colored"
        });
        reset();
      },
      onError: () => {
        toast.error("Gagal, periksa kembali form isiannya.", {
          theme: "colored"
        });
      }
    });
  };
  return {
    data,
    processing,
    errors,
    reset,
    handleChange,
    submit
  };
};
function FormUbahPassword() {
  const { data, processing, errors, reset, handleChange, submit } = UseFormUbahPassword();
  return /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "flex flex-col gap-3 mt-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 w-full", children: [
      /* @__PURE__ */ jsx(InputLabel, { required: true, children: "Password" }),
      /* @__PURE__ */ jsx(
        Input.Password,
        {
          name: "password",
          placeholder: "Masukkan Password",
          onChange: handleChange,
          value: data.password,
          className: clsx(
            errors.password && "border-red-500",
            "py-2"
          ),
          required: true
        }
      ),
      /* @__PURE__ */ jsx(InputError, { message: errors.password })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 w-full", children: [
      /* @__PURE__ */ jsx(InputLabel, { required: true, children: "Ulangi Password" }),
      /* @__PURE__ */ jsx(
        Input.Password,
        {
          name: "password_confirmation",
          placeholder: "Ulangi Password",
          onChange: handleChange,
          value: data.password_confirmation,
          className: clsx(
            errors.password_confirmation && "border-red-500",
            "py-2"
          ),
          required: true
        }
      ),
      /* @__PURE__ */ jsx(InputError, { message: errors.password_confirmation })
    ] }),
    /* @__PURE__ */ jsx(ButtonSubmitForm, { reset, processing })
  ] });
}
function TabItem({
  isActive = false,
  hasCertificate = false,
  label,
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      className: clsx(
        className,
        isActive ? "text-white bg-color-primary" : "text-color-primary",
        " px-5 py-2 border border-color-primary rounded-t-lg flex items-center gap-2"
      ),
      ...props,
      children: [
        label,
        !hasCertificate && label === "Sertifikat" ? /* @__PURE__ */ jsx(
          Icon,
          {
            icon: "exclamation-circle",
            className: clsx(isActive ? "text-white" : "text-red-500")
          }
        ) : null
      ]
    }
  );
}
function TopNavigation({ active = "profil", setActiveTab, hasCertificate }) {
  const tabs = [
    {
      label: "Akun",
      slug: "profil"
    },
    {
      label: "Sertifikat",
      slug: "sertifikat"
    },
    {
      label: "Ubah Password",
      slug: "ubah-password"
    }
  ];
  const handleNavigation = (tab) => {
    setActiveTab(tab);
  };
  return /* @__PURE__ */ jsx("div", { className: "flex gap-2 border-b pb-2", children: tabs.map((tab) => /* @__PURE__ */ jsx(
    TabItem,
    {
      isActive: active == tab.slug,
      onClick: () => handleNavigation(tab.slug),
      label: tab.label,
      hasCertificate
    },
    tab.slug
  )) });
}
function Index({ title, tab, auth, certificate, flash }) {
  const [activeTab, setActiveTab] = useState(tab ? tab : "profil");
  useEffect(() => {
    if (flash.success) {
      toast.success(flash.success, {
        theme: "colored"
      });
    }
    if (flash.error) {
      toast.error(flash.error, {
        theme: "colored"
      });
    }
  }, [flash]);
  return /* @__PURE__ */ jsxs(AppContentLayout, { active: title, title, children: [
    /* @__PURE__ */ jsx(Head, { title }),
    /* @__PURE__ */ jsxs(Section, { children: [
      /* @__PURE__ */ jsx(
        TopNavigation,
        {
          active: activeTab,
          setActiveTab,
          hasCertificate: certificate
        }
      ),
      activeTab === "profil" ? /* @__PURE__ */ jsx(FormProfil, { profil: auth.user }) : activeTab === "sertifikat" ? /* @__PURE__ */ jsx(
        DetailSertifikat,
        {
          hasCertificate: certificate,
          resetPassphrase: flash.success !== null
        }
      ) : /* @__PURE__ */ jsx(FormUbahPassword, {})
    ] })
  ] });
}
export {
  Index as default
};
