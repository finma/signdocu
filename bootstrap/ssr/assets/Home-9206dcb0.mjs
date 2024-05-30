import { a as jsx, j as jsxs } from "../ssr.mjs";
import { I as Icon } from "./Icon-ec6848f5.mjs";
import { a as accessMenus, A as AppContentLayout } from "./AppContentLayout-eb7f1462.mjs";
import { S as Section } from "./Section-0e98acee.mjs";
import { Link, Head } from "@inertiajs/react";
import clsx from "clsx";
import { PiSignatureLight } from "react-icons/pi/index.esm.js";
import { B as Button } from "./Button-409c7599.mjs";
import "react/jsx-runtime";
import "react-dom/server";
import "@inertiajs/react/server";
import "./Dropdown-c2fd1bd2.mjs";
import "react";
import "@headlessui/react";
import "react-toastify";
const flickity = "";
function SectionAksesMenu({ auth }) {
  return /* @__PURE__ */ jsx(Section, { title: "Akses Menu", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 md:flex gap-x-7 gap-y-5", children: accessMenus.map((menu, i) => /* @__PURE__ */ jsxs(
    Link,
    {
      href: menu.href,
      className: clsx(
        (auth.user && auth.user.roles[0].name === "Super Admin" && menu.name === "Sign" || auth.user && auth.user.roles[0].name === "Super Admin" && menu.name === "Profil") && "hidden",
        "text-center w-[70px] h-auto"
      ),
      children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "border border-color-secondary rounded-xl flex justify-center items-center mb-2 w-[70px] h-[70px] hover:bg-gray-100", children: menu.icon === "pencil-square" ? /* @__PURE__ */ jsx(PiSignatureLight, { className: "text-[35px] text-color-primary" }) : /* @__PURE__ */ jsx(
          Icon,
          {
            icon: menu.icon,
            className: "text-3xl text-color-primary"
          }
        ) }) }),
        /* @__PURE__ */ jsx("span", { children: menu.name })
      ]
    },
    i
  )) }) });
}
function SectionInformasiTtd({ auth, certificate }) {
  return /* @__PURE__ */ jsx(Section, { title: "Siliwangi Digital Signature", children: auth.user ? certificate ? /* @__PURE__ */ jsx("div", { className: "bg-green-100 p-3 rounded-xl", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsx(
      Icon,
      {
        icon: "check2-circle",
        className: "text-color-primary text-3xl"
      }
    ),
    /* @__PURE__ */ jsxs("span", { children: [
      "Halo ",
      /* @__PURE__ */ jsx("span", { className: "font-semibold", children: auth.user.name }),
      ", Anda sudah memiliki sertifikat dan sudah bisa melakukan tanda tangan secara digital."
    ] })
  ] }) }) : /* @__PURE__ */ jsxs("div", { className: "bg-yellow-100 p-3 rounded-xl", children: [
    /* @__PURE__ */ jsx("span", { children: "Untuk dapat melakukan tanda tangan digital, Anda harus membuat sertifikat terlebih dahulu" }),
    /* @__PURE__ */ jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsx(Link, { href: route("profil.index", {
      tab: "sertifikat"
    }), children: /* @__PURE__ */ jsxs(Button, { size: "sm", children: [
      /* @__PURE__ */ jsx(
        Icon,
        {
          icon: "key",
          me: 2,
          className: "text-white text-lg"
        }
      ),
      "Buat Sertifikat"
    ] }) }) })
  ] }) : /* @__PURE__ */ jsx("div", { className: "bg-red-100 p-3 rounded-xl", children: /* @__PURE__ */ jsxs("span", { children: [
    "Anda harus",
    " ",
    /* @__PURE__ */ jsx(
      Link,
      {
        href: route("login"),
        className: "text-color-primary font-medium hover:underline",
        children: "login"
      }
    ),
    " ",
    "terlebih dahulu untuk melihat section ini"
  ] }) }) });
}
function Home({ auth, title, certificate }) {
  return /* @__PURE__ */ jsxs(AppContentLayout, { active: title, children: [
    /* @__PURE__ */ jsx(Head, { title }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-7 md:gap-5", children: [
      /* @__PURE__ */ jsx(SectionInformasiTtd, { auth, certificate }),
      /* @__PURE__ */ jsx(SectionAksesMenu, { auth })
    ] })
  ] });
}
export {
  Home as default
};
